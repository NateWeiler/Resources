# world.py
#
# Copyright (C) 2009, Peter Rogers
#
# This file is part of Fallen Spire.
#
# Fallen Spire is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Fallen Spire is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Fallen Spire.  If not, see <http://www.gnu.org/licenses/>.
#

###########
# Imports #
###########

import pygame

import pgu.timer

import scene
from objects import *
from layers import *
from character import Character
import effects
from pygapp.dispatcher import Dispatcher
from spells import Spell

from creatures import PlayerFSM, BlobFSM, NagaFSM
import loader
import fsglobals

###########
# Classes #
###########

class GameInput(Dispatcher):
    controls = {
        "button1" : pygame.K_a,
        "button2" : pygame.K_s,
        "left" : pygame.K_LEFT,
        "right" : pygame.K_RIGHT,
        "up" : pygame.K_UP,
        "down" : pygame.K_DOWN,
        "jump" : pygame.K_SPACE}

    def __init__(this):
        for name in this.controls.iterkeys():
            setattr(this, name, False)
            setattr(this, name+"_start", False)
            setattr(this, name+"_end", False)

    def update(this):
        keys = pygame.key.get_pressed()
        for (name, key) in this.controls.iteritems():
            nvalue = keys[key]
            if (getattr(this, name)):
                setattr(this, name+"_start", False)
                if (not nvalue):
                    # The button was pressed, and now it released
                    setattr(this, name, False)
                    setattr(this, name+"_end", True)
                    this.dispatch("changed")
                    #this.dispatch(name + "-release")
            else:
                if (nvalue):
                    # Just pressed the button
                    setattr(this, name+"_start", True)
                    setattr(this, name, True)
                    this.dispatch("changed")
                    #this.dispatch(name + "-press")
                setattr(this, name+"_end", False)

# A camera used when rendering the scene
class Camera(object):
    # The position of the camera as a floating point number
    viewx = 0
    viewy = 0
    # The pygame rect that defines the area of the scene to render
    viewpos = None
    # The min and max distance outside of which the camera instantly 
    # snaps to the object position.
    minSnapDistance = 5
    maxSnapDistance = 200

    def __init__(this, size):
        this.viewpos = pygame.Rect((0, 0), size)

    def update_pos(this, obj):
        # Get the 'eye' position
        (xp, yp) = obj.pos
        yp -= 80
        (dx, dy) = (xp-this.viewpos.center[0],
                    yp-this.viewpos.center[1])
        # We snap to the position instantly if we are either too close
        # (and need to avoid the 'boucning' caused by rounding errors)
        # or too far away (taking too long to track).
        if (abs(dx) < this.minSnapDistance or abs(dx) > this.maxSnapDistance):
            this.viewx = xp
        else:
            this.viewx += dx*0.5
        # Do the same for the vertical displacement
        if (abs(dy) < this.minSnapDistance or abs(dy) > this.maxSnapDistance):
            this.viewy = yp
        else:
            this.viewy += dy*0.5
        # Update the pygame rect
        this.viewpos.center = (int(this.viewx), int(this.viewy))

# The entire game world, which is responsible for managing levels, the player
# character, user input, etc.
class World(object):
    # The loader instance
    loader = None
    # The player character
    player = None
    # The currently active level
    level = None
    # The game clock
    clock = None
    # Whether to quit or not
    done = False

    def __init__(this):
        this.disp = pygame.display.get_surface()
        this.camera = Camera(this.disp.get_size())
        this.clock = pgu.timer.Clock()
        this.fadeoutLayer = None
        fsglobals.world = this

    # Set the camera viewing size
    def set_view_size(this, size):
        this.camera.viewpos.size = size

    def setup(this):
        # Test level
        this.level = loader.load_level("entrancelvl.xml")
        this.level.set_tiles("tiles.xml")
        this.level.setup_tile_grids()

        for node in this.level.nodes:
            if (node.name == "scenery"):
                app = loader.load_appearance_factory(node.properties["app"])
                obj = scene.Object(app)
                this.level.add_to_grid(obj, float(node.properties["depth"]))
                obj.gridPos = node.pos

        dust = Dust()
        this.level.background.add(dust)
        dust.gridPos = (13, 18)

        wraith = scene.Object(loader.load_appearance_factory("wraith"))
        this.level.midground.add(wraith)
        wraith.app.set_action("Idle")
        wraith.depth = 0
        wraith.gravity = False
        wraith.gridPos = (20.5, 12.8)
        wraith.starty = wraith.pos[1]

        #st = effects.StoneObject(wraith)
        #st.replace_object()

        obj = scene.Creature(loader.load_appearance_factory("naga"))
        this.level.midground.add(obj)
        #obj.app.set_action("Walk")
        obj.app.direction = "east"
        obj.depth = 0
        #obj.vel_x = 110
        #obj.renderShadow = True
        #obj.gravity = False
        obj.gridPos = (14.5, 12.9)
        obj.set_fsm(NagaFSM())

        #obj = scene.Object(loader.load_appearance_factory("blob"))
        #this.level.midground.add(obj)
        #obj.depth = 0
        #obj.vel_x = 0
        #obj.gridPos = (15.5, 12.8)
        #obj.set_fsm(BlobFSM())

        this.gameInput = GameInput()
        #this.player.connect_input(gameInput)

        # Create the character
        this.player = Character(appf=loader.load_appearance_factory("wizard"))
        this.player.renderShadow = True
        this.level.midground.add(this.player)

        this.player.set_fsm(PlayerFSM(this.gameInput))

        (x, y) = this.level.find_node("player start").pos
        this.player.gridPos = (x, y) #set_grid_pos((x, y))
        #this.player.gridPos = (4,5)

        # Create a basic background
        this.backgroundImg = pygame.Surface(this.disp.get_size()).convert()
        this.backgroundImg.fill((0,0,0))
        #this.disp.blit(bg, (0, 0))
        #pygame.display.flip()

#        mlayer = BackdropLayer(loader.load_image("citybackdrop.png"), (0, 0,0))
#        mlayer.speed = 0.2
#        mlayer.center = (300, 150)
#        mlayer.gradientStartColor = (0,0,0,255)
#        mlayer.gradientEndColor = (60,40,40,255)
#        mlayer.gradientSize = 200
#        level.bgLayer = mlayer

        #b = SpeechBalloon(loader.load_font("centabel.ttf", 16), 
        #                  loader.load_image("cursor_dot.png"))
        #b.set_text("Hello speech balloon! This is something fun to read because it's in a speech balloon.")
        #level.midground.add(b)
        #balloon = b
        #balloon.tracking = char

    def render(this, rect):
        this.disp.blit(this.backgroundImg, rect)
        this.level.render(this.disp, rect.topleft, this.camera.viewpos)

        y = this.disp.get_height()

        #this.playerPortrait.render(
        #    this.disp, 
        #    (10, this.disp.get_height()-this.blankSpace-5))
        #this.playerInventory.render(
        #    this.disp,
        #    (60, this.disp.get_height()-this.blankSpace-5))

    def update(this):
        # Tick tock, mainloop.
        dt = this.clock.tick()
        this.level.update(dt)
        # Have the camera track the player around
        # TODO - check if the display has been resized
        this.camera.update_pos(this.player)
        # Wraith floats around
        #wraith.pos = (wraith.pos[0],
        #              wraith.starty + 10*math.cos(time.time()-startTime))
        # Handle player movement
        this.gameInput.update()

        return
        if (this.player.fell_off_bottom()):
            # Fade out when the player falls out of the scene. Normally
            # this would be a game over but we'll just exit for now.
            if (not this.fadeoutLayer):
                this.fadeoutLayer = FadeoutLayer(150)
            this.fadeoutLayer.render(this.disp, this.camera)
            if (this.fadeoutLayer.alpha == 255):
                this.done = True

    def camera_to_level(this, pos):
        x = this.camera.viewpos.x + pos[0]
        y = this.camera.viewpos.y + pos[1]
        (dx, dy) = this.level.midground.get_centerline_offset()
        return (x-dx, y-dy)

    def get_time(this):
        return this.clock.get_time()

