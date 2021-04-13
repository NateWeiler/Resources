# objects.py
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

import numpy
import pygame
import math
import time
import random

import utils
import scene
from pygapp import appearance


class DustParticle(appearance.AppearanceFactory):
    def __init__(this, brush, nframes=18, color=(150,150,150)):
        appearance.AppearanceFactory.__init__(this, "dust")
        # Assign the brush a color
        brush = utils.set_color(brush, color)
        # Create the frames of the animation
        anim = appearance.Animation()
        for count in xrange(nframes):
            # Figure out the alpha and size of the dust particle
            n = float(count)/(nframes)
            scale = 2.0 + 2.5*n
            alpha = math.sin(n*math.pi)
            img = pygame.transform.rotozoom(brush, 0, scale)
            utils.adjust_alpha(img, int(255*alpha))
            anim.add_frame(img, (0.5, 0.5))
        # Wrap that animation in an action object
        action = appearance.Action()
        action.add_animation("south", anim)
        action.looping = False
        action.fps = 10
        # Now add it as the default action
        this.add_action("Idle", action)

class Dust(scene.Object):
    # The dust appearance factory (used to make dust particles)
    dustApp = None
    # Maximum number of dust particles at any given time
    maxParticles = 10
    # The list of emitted dust particles
    particles = None
    # ...
    nextTime = 0
    # The delay between emitting particles
    emitterPeriod = 0.2
    # How long particles should last
    particleLifetime = 1
    # The emission velocity X-range
    emitVelX = (0, 20)
    # The emission velocity Y-range
    emitVelY = (-100, -100)

    def __init__(this):
        scene.Object.__init__(this)

    def update(this, dt):
        if (not this.dustApp):
            # Create an animation for a single dust particle
            brush = this.level.loader.load_image("brush.png")
            this.dustApp = DustParticle(brush)
            this.particles = []
        n = 0
        while n < len(this.particles):
            if (not this.particles[n].level):
                del this.particles[n]
            else:
                n += 1
        if (len(this.particles) < this.maxParticles and 
            time.time() > this.nextTime):
            # Add another dust particle
            obj = Brush(this.dustApp, this.particleLifetime)
            this.level.background.add(obj)
            (x, y) = this.pos
            obj.vel_x = random.uniform(*this.emitVelX)
            obj.vel_y = random.uniform(*this.emitVelY)
            obj.pos = (x, y)
            this.particles.append(obj)
            this.nextTime = time.time() + this.emitterPeriod

class Brush(scene.Object):
    def __init__(this, appf, duration):
        scene.Object.__init__(this, appf=appf)
        this.start = time.time()
        nframes = len(this.app.get_anim().frames)
        this.app.get_action().fps = nframes/float(duration)

    def update(this, dt):
        scene.Object.update(this, dt)
        if (this.app.is_action_done()):
            this.remove_self()
        return

        def interp(start, end, tm, start_tm, end_tm):
            if (tm < start_tm): return start
            elif (tm > end_tm): return end
            # Linear interpolation
            m = (end-start)/float(end_tm-start_tm)
            return m*(tm-start_tm) + start

        end = 3.0
        tm = time.time()-this.start
        #surf = pygame.Surface(this.original.get_size()).convert_alpha()
        #surf.fill((255,0,0))
        surf = this.original.copy()

        if (tm < end/2):
            fact = interp(0, 0.5, tm, 0, end/2)
        else:
            fact = interp(0.5, 0, tm, end/2, end)

        alpha = pygame.surfarray.pixels_alpha(surf)
        pygame.surfarray.pixels_alpha(surf)[:] = (alpha*fact).astype("uint8")

        this.image = surf
        this.image = pygame.transform.rotozoom(surf, 0, tm+0.5)
        scene.Object.update(this, dt)
        if (tm > end):
            this.remove_self()

class EnergyCollector(scene.Object):
    def __init__(this, maxpoints=30, radius=20):
        scene.Object.__init__(this)
        this.points = []
        this.maxpoints = maxpoints
        this.radius = radius
        this.orbImage = None

    def update(this, dt):
        if (not this.orbImage):
            this.orbImage = this.level.loader.load_image(
                "orb.png").convert_alpha()
        scene.Object.update(this, dt)
        while (len(this.points) < this.maxpoints):
            angle = random.uniform(0, 360)
            rad = random.uniform(0.9*this.radius, 1.1*this.radius)
            pt = (rad*math.cos(angle),
                  rad*math.sin(angle))
            this.points.append(pt)
        n = 0
        newpoints = []
        for (x, y) in this.points:
            rate = 1+min(5, 3*this.lifetime)
            x -= rate*x*dt
            y -= rate*y*dt
            if (abs(x) > 2):
                newpoints.append((x, y))
        this.points = newpoints

    def render(this, dest, (x, y)):
        for pt in this.points:
            dist = math.sqrt(pt[0]**2+pt[1]**2)
            n = max(0, 1-dist/this.radius)
            img = utils.adjust_alpha(this.orbImage, 255*n)
            dest.blit(img, (x + int(pt[0]) - 2, 
                            y + int(pt[1]) - 2))
        dest.blit(this.orbImage, (x-2, y-2))

class Fireball(scene.Object):
    def __init__(this):
        scene.Object.__init__(this)

    def update(this, dt):
        if (not this.app):
            this.set_app("fireball")
        scene.Object.update(this, dt)

