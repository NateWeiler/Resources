# effects.py
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

import random
import time
import math
import pygame

import scene
import utils

#############
# Functions #
#############

###########
# Classes #
###########

# A cluster of lightning bolts
class Lightning(scene.Object):
    def __init__(this, start, end, nbolts, openend=False, spread=20):
        scene.Object.__init__(this)
        this.start = start
        this.end = end
        this.bolts = None
        this.nbolts = nbolts
        this.openend = openend
        this.spread = spread

    def update(this, dt):
        if (this.bolts == None):
            # Add the individual lightning bolts
            this.bolts = []
            for n in xrange(this.nbolts):
                bolt = LightningBolt(this.start, this.end, this.openend)
                this.bolts.append(bolt)
                this.grid.add(bolt)
        for bolt in this.bolts:
            bolt.start = this.start
            bolt.end = this.end
            if (this.expires >= 0):
                n = (1+math.exp(-40*this.expires+5))
            else:
                n = 1
            bolt.spread = this.spread/n
        scene.Object.update(this, dt)

    def remove_self(this):
        if (this.bolts):
            for bolt in this.bolts:
                bolt.remove_self()
        scene.Object.remove_self(this)

# A single bolt of lightning
class LightningBolt(scene.Object):
    # When to next update the points
    nextUpdate = -1
    spread = 20
    ignoreSceneDepth = True

    def __init__(this, start, end, openend=False):
        scene.Object.__init__(this)
        this.start = start
        this.end = end
        this.openend = openend
        this.points = []
        # Find a rectangle that will roughly surround the lightning bolt
        this.rect = pygame.Rect(this.start, (1, 1)).union((this.end, (1, 1)))
        this.pos = this.rect.topleft

    def update(this, dt):
        scene.Object.update(this, dt)
        if (time.time() < this.nextUpdate):
            # Still waiting to update the points
            return
        dx = float(this.end[0]-this.start[0])
        dy = float(this.end[1]-this.start[1])
        npoints = int(math.sqrt(dx*dx+dy*dy)/40)+2
        dx /= npoints
        dy /= npoints
        #(x, y) = this.start
        x = this.start[0] - this.rect.x
        y = this.start[1] - this.rect.y
        this.points = [(x, y)]
        for n in xrange(npoints):
            x += dx
            y += dy
            xp = x+random.normalvariate(0, this.spread/2)
            yp = y+random.normalvariate(0, this.spread/2)
            #xp += random.uniform(-this.spread, this.spread)
            #yp += random.uniform(-this.spread, this.spread)
            this.points.append((xp, yp))
        if (this.openend):
            x += random.uniform(-this.spread, this.spread)
            y += random.uniform(-this.spread, this.spread)
        this.points.append((x, y))
        this.nextUpdate = time.time()+0.04

    def render(this, dest, (x, y)):
        if (len(this.points) == 0):
            # Lightning not ready yet
            return
        lst = []
        for pt in this.points:
            xp = x + int(pt[0])
            yp = y + int(pt[1])
            lst.append((xp, yp))
        size = random.choice((1, 2, 1))
        if (random.random() < 0.25):
            col = (200,200,255)
        else:
            col = (255,255,255)
        if (random.random() < 0.5):
            pygame.draw.lines(dest, (100,100,200), False, lst, 3)
        pygame.draw.lines(dest, col, False, lst, size)


# A stone version of an object (appears desaturated and unmoving)
class StoneObject(scene.Object):
    # The original object
    original = None
    # The offset when rendering the image
    imageOffset = None

    def __init__(this, original):
        scene.Object.__init__(this)
        this.original = original
        this.image = utils.desaturate_surf(original.app.get_frame())
        this.imageOffset = original.app.get_offset()

    def render(this, dest, pos):
        dest.blit(this.image, (
                pos[0] + this.image.get_width()/2 - this.imageOffset[0],
                pos[1] + this.image.get_height()/2 - this.imageOffset[1]))

    # Removes the 'original' object from the map, replacing it with 
    # this stone version.
    def replace_object(this):
        this.pos = this.original.pos
        this.original.grid.add(this)
        this.original.remove_self()
        
