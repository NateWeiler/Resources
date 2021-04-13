# character.py
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

import time
import pygame

import effects
import scene
import utils
import fsm

###########
# Classes #
###########

class Stat(object):
    value = 0
    maxValue = 0

    def __init__(this, value, maxValue):
        this.value = value
        this.maxValue = maxValue

# The player character class
class Character(scene.Creature):
    # The items currently held by the player
    inventory = None
    # The player's current stamina
    stamina = None
    # The current magic power
    magic = None

    def __init__(this, appf):
        # Load some sounds for footsteps
        this.footstepSounds = []
        #if (pygame.mixer.get_init()):
        #    for n in xrange(6):
        #        snd = pygame.mixer.Sound(
        #            os.path.join("sounds", "tilestep%d.wav" % (n+1)))
        #    this.footstepSounds.append(snd)
        scene.Creature.__init__(this, appf)
        this.app.direction = "east"
        this.inventory = []

        this.magic = Stat(50,60)
        this.stamina = Stat(100,180)

        ###
        item = Item()
        item.imageFile = "amulet"
        this.inventory.append(item)

        item = Item()
        item.imageFile = "ring"
        this.inventory.append(item)

        item = Item()
        item.imageFile = "knapsack"
        this.inventory.append(item)
        ###

    # Checks to see if there is a usable ladder nearby, going upwards
    def get_nearby_down_ladder(this):
        xdir = this.get_facing()
        (w, h) = this.level.tileSet.tileSize
        (tile, xoff, yoff) = this.level.get_tile_at((this.pos[0]-xdir*w, 
                                                     this.pos[1]+h))
        if (tile and 
            ((tile.name == "ladder" and xoff < w/1.5 and xdir == 1) or 
             (tile.name == "ladderw" and xoff > w/2.5 and xdir == -1))):
            return True
        return False

    # Check for a nearby ladder going down
    def get_nearby_up_ladder(this):
        xdir = this.get_facing()
        (tile, xoff, yoff) = this.level.get_tile_at(this.pos)
        w = this.level.tileSet.tileSize[0]
        if (tile and 
            (tile.name == "ladder" and xoff > w/2.5 and xdir == 1) or 
            (tile.name == "ladderw" and xoff < w/1.5) and xdir == -1):
            return True
        return False

    def handle_trigger(this, name):
        if (name == "step"):
            # Footstep - either running or walking
            if (len(this.footstepSounds) > 0):
                random.choice(this.footstepSounds).play()

    def queue_spell(this, spell):
        this.stateMachine.queue_spell(spell)


# An item that can be found by the player, held, used, etc.
class Item(object):
    # The image to use when displaying the item
    imageFile = None
    # The name of the item
    name = None

