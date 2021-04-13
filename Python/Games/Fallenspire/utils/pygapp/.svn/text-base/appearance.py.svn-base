# appearance.py
#
# Copyright (C) 2007, Peter Rogers
#
# This file is part of pygapp.
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation; either version 2.1 of the License, or (at
# your option) any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
# License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with this program; if not, write to the Free Software Foundation,
# Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
#

###########
# Imports #
###########

import pygame
from dispatcher import Dispatcher

###########
# Classes #
###########

# An appearance of a character. This is a set of actions that together makeup
# the general "appearance" of a character.
class Appearance(Dispatcher):
    # The factory that produced this appearance
    factory = None
    # The current action being played
    action = None
    # The direction the appearance is facing (ie north, south, etc)
    direction = None
    # The current frame (of the current action)
    frame = 0
    # Which way the frames animate (forwards=1, backwards=-1, stop=0)
    frameDir = 1
    # Whether the action has been finished or not
    actionDone = False
    # The name of the appearance factory to use
    factoryName = None
    # The speed factor
    speed = 1
    # The scale to use when loading animations and such
    scale = 1

    def __init__(this, factory):
        this.factory = factory
        this.action = "Idle"
        this.direction = "south"

    def __getstate__(this):
        return {"action" : this.action,
                "direction" : this.direction,
                "frame" : this.frame,
                "frameDir" : this.frameDir,
                "speed" : this.speed,
                "factoryName" : this.factoryName}

    def set_factory (this, appf):
        if (type(appf) == str):
            # Name of the factory
            this.factoryName = appf
            this.factory = None
        else:
            # It's an actual factory instance
            this.factory = appf
            if (appf.name):
                this.factoryName = appf.name

    def has_action (this, name):
        if (not this.factory):
            return False
        return this.factory.actions.has_key(name)

    def step (this, dt):
        if (not this.factory):
            return
        act = this.factory.actions[this.action]
        anim = act.animations[this.direction]
        nframes = len(anim.frames)
        this.frame += dt*act.fps*this.speed*this.frameDir
        # TODO - this code isn't accurate
        if (act.bouncing):
            # Animation "bounces" back and forth (looping is implied)
            if (this.frame >= nframes):
                this.frameDir *= -1
                this.frame = nframes-1
                #this.frame = (nframes-1) - (this.frame-nframes)
            elif (this.frame < act.loopStart):
                this.frameDir *= -1
                this.frame = act.loopStart
                #this.frame = act.loopStart + (act.loopStart-this.frame)+1
            this.actionDone = False
        elif (act.looping and nframes > 1):
            # Handle looping animations
            if (this.frame >= nframes):
                #this.frame -= (nframes-act.loopStart)
                this.frame = act.loopStart
            elif (this.frame < act.loopStart):
                #this.frame += (nframes-act.loopStart)
                this.frame = nframes-1
            this.actionDone = False
        else:
            # Non-looping animation
            #this.frame = min(this.frame, nframes-1)
            #this.frame = max(this.frame, 0)
            oldDone = this.actionDone
            if (this.frame > nframes-1):
                this.actionDone = True
                this.frame = nframes-1
            elif (this.frame < 0):
                this.actionDone = True
                this.frame = 0
            
            if (not oldDone and this.actionDone):
                # Emit a signal indicating the action is finished (emitted
                # only once).
                this.dispatch("action-done")

    def set_action (this, action, frameDir=1, speed=1):
        if (this.action != action or this.frameDir != frameDir):
            this.action = action
            this.actionDone = False
            this.speed = speed

            this.frameDir = frameDir
            if (frameDir == 1):
                this.set_first_frame()
            else:
                this.set_last_frame()
            this.dispatch("action-start")

        #if (this.action != name):
        #    # Start the action
        #    this.action = name
        #    this.frame = 0
        #    this.actionDone = False
        #this.frameDir = frameDir
        #if (frameDir == -1):
        #    this.set_last_frame()

    def get_action (this, name=None):
        if (not name):
            name = this.action
        return this.factory.actions[name]

    def get_anim (this):
        return this.factory.actions[this.action].animations[this.direction]

    def get_movement_speed (this):
        return this.factory.actions[this.action].movementSpeed*this.speed

##     def GetFrameNumber (this):
##         act = this.GetAction()
##         anim = act.animations[this.direction]
##         nframes = len(anim.frames)
##         if (act.looping):
##             # Check if it's (possibly) looped yet
##             if (this.frame > act.loopStart):
##                 n = act.loopStart + int(this.frame - act.loopStart) % \
##                     (nframes - act.loopStart)
##             else:
##                 if (this.frame < 0):
##                     # TODO - this isn't correct
##                     n = nframes-1
##                 else:
##                     n = this.frame
##         elif (this.frameDir == 1):
##             # Forwards
##             n = max(min(int(this.frame), nframes-1), 0)
##         else:
##             # Backwards
##             n = max(int(this.frame), 0) % nframes
##         return int(n)

    #def GetFrameNumber (this):
    #    return int(this.frame)

    def get_frame (this):
        assert(this.action)
        assert(this.direction)
        act = this.get_action()
        anim = act.animations[this.direction]
        try:
            return anim.frames[int(this.frame)]
        except IndexError,e:
            print this.factoryName, this.action, this.frame, \
                  len(anim.frames), this.frameDir
            raise e

    def get_offset (this):
        anim = this.factory.actions[this.action].animations[this.direction]
        frame = anim.frames[int(this.frame)]
        (xp, yp) = anim.offsets[int(this.frame)]
        (x, y) = anim.offset
        x += xp
        y += yp
        return (x * frame.get_width(), y * frame.get_height())

#    def get_base_size (this):
#        return this.factory.baseSize

#    def get_radius (this):
#        (w, h) = this.GetBaseSize()
#        # TODO - hacked
#        return 0.8*math.sqrt((w/2)**2+(h/2)**2)

    def is_action_done (this):
        #action = this.factory.actions[this.action]
        #if (action.looping):
        #    return False
        #dname = this.direction
        #if (this.frameDir == -1):
        #    # Backwards
        #    return (this.frame <= 0)
        #return (this.frame >= len(action.animations[dname].frames)-1)
        return this.actionDone

    def is_looping (this):
        return this.factory.actions[this.action].looping

    # Jumps to the last frame (only works for non-looping actions)
    def set_last_frame (this):
        act = this.get_action()
        if (not act.looping):
            this.frame = len(this.get_anim().frames)-1

    # Jumps to the first frame (ie #0)
    def set_first_frame (this, action=None):
        this.frame = 0
        if (action):
            this.action = action

    def is_reversed (this):
        return (this.frameDir == -1)

    def get_triggers (this):
        act = this.get_action()
        return act.triggers.get(int(this.frame), ())

    def get_track_pos(this, name):
        anim = this.get_anim()
        frame = anim.frames[int(this.frame)]
        (x, y) = anim.tracks[name][int(this.frame)]
        return (int(x*frame.get_width()), 
                int(y*frame.get_height()))


# Contains all of the static information for a given appearance
class AppearanceFactory:
    ###########
    # Private #
    ###########
    # The set of actions supported by this appearance
    actions = None
    # The factory name
    name = None
    # The loader instance
    loader = None
#    # The size of the "base" of the animation. This is typically the region
#    # (in rows and cols) of the animation considered to be "solid"
#    baseSize = (1, 1)
#    # The position of the base relative to the "center" of the animation
#    baseOffset = (0, 0)
    # If the appearance is "solid" or not (ie occupies space)
    isSolid = True

    ##########
    # Public #
    ##########
    def __init__(this, name):
        this.actions = {}
        this.name = name

    def add_action(this, name, action):
        this.actions[name] = action

    def create_instance (this):
        return Appearance(this)

    def get_standard_frame (this):
        return this.actions["Idle"].animations["southeast"].frames[0]

    def get_max_width (this):
        maxw = 0
        for dname in DIRECTIONS:
            w = this.actions["Idle"].animations[dname].frames[0].get_width()
            maxw = max(maxw, w)
        return maxw


# A class representing a simple framed animation
class Animation:
    # The frames of the animation (pygame surfaces)
    frames = None
    # The offsets for each frame
    offsets = None
    # Named points over the image
    tracks = None
    ## The length of the whole animation
    #duration = 0
    # An offset into the image indicating the location of the origin
    offset = (0, 0)

    def __init__(this):
        this.frames = []
        this.offsets = []
        this.tracks = {}

    def add_frame (this, frame, offset=(0,0)):
        this.frames.append(frame)
        this.offsets.append(offset)
        #this.duration = len(this.frames)/15.0

    def create_flipped (this):
        anim = Animation()
        for frame in this.frames:
            anim.frames.append(pygame.transform.flip(frame, True, False))
        for (xp, yp) in this.offsets:
            anim.offsets.append((1-xp, yp))
        for (name, pts) in this.tracks.items():
            lst = []
            for (xp, yp) in pts:
                lst.append((-xp, yp))
            anim.tracks[name] = lst
        #anim.offset = (1-this.offset[0], this.offset[1])
        #anim.duration = this.duration
        return anim


# An action is basically an animation that supports event triggers.
class Action:
    # One animation for each direction that this action may be viewed from
    # (hashed by direction name).
    animations = None
    # Event triggers associated with different frames of the animation
    triggers = None
    # If this action should loop or not
    looping = True
    bouncing = False
    # Where the loop starts (if this action loops)
    loopStart = 0
    # Movement speed (for animations that move)
    movementSpeed = 35
    # The framerate
    fps = 15

    def __init__(this):
        this.animations = {}
        this.triggers = {}

    def add_animation(this, direction, anim):
        this.animations[direction] = anim

