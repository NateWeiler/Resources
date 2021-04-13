#!/usr/bin/env python
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
import random
import os
import sys
import math

try:
    path = os.path.split(__file__)[0]
    if (path != ""):
        os.chdir(path)
except:
    pass

# Manually add the path to pygapp
#sys.path.insert(0, os.path.join("..", "utils"))
import site
site.addsitedir(os.path.join("..", "utils"))

import pygapp

sys.path.insert(0, os.path.join("..", "..", "pgu"))

import pgu

import time
import utils
import scene
import loader
#from balloon import SpeechBalloon
#from world import World
from interface import GameInterface

###########
# Classes #
###########

def main():
    # Setup the screen
    pygame.init()
    display = pygame.display.set_mode((800,600))
    pygame.display.set_caption("Fallen Spire")

    loader.set_base_path(os.path.join("..", "media"))

    display.fill((0,0,0))

    if (0):
        display.fill((255,255,255))
        img = loader.load_image(os.path.join("items", "compass.png"))
        img = utils.set_color(img, (0,0,0))
        utils.adjust_alpha(img, 170)

        img = utils.blur_surf(img)
        display.blit(img, (0, 0))

        img = loader.load_image(os.path.join("items", "compass.png"))
        display.blit(img, (1, 2))

        pygame.display.flip()
        while 1:
            ev = pygame.event.wait()
            if (ev.type == pygame.KEYDOWN): break
        return

    game = GameInterface()
    game.mainloop()


if (__name__ == "__main__"):
    main()

