# layers.py
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

import pygame
import time

import utils

###########
# Classes #
###########

# Renders an area of "darkness" around the camera's view
class DarknessLayer(object):
    # The piece rendered at the top of the screen
    topSurf = None
    # The piece rendered at the bottom
    btmSurf = None
    # The size of the curtain
    size = 50
    # The starting color of the gradient (top of the screen)
    startColor = (0, 0, 0, 255)
    # The ending color of the gradient
    endColor = (0, 0, 0, 0)
#    # The amount of space to skip above the top curtain
#    borderSpaceTop = 0
#    # The amount of space to skip below the bottom curtain
#    borderSpaceBottom = 0

    def __init__(this):
        pass
        #this.borderSpaceTop = topSpace
        #this.borderSpaceBottom = btmSpace

    # Sets the size of the "curtain of darkness"
    def set_size(this, size):
        if (this.size != size):
            # Note the size and force a repaint on the curtains
            this.size = size
            this.topSurf = None
            this.btmSurf = None

    def render(this, dest, destpos, viewpos):
        if (not this.topSurf or 
            dest.get_width() != this.topSurf.get_width()):
            # Render the top and bottom curtains
            this.topSurf = utils.gradient(
                this.startColor, this.endColor, 
                (dest.get_width(), this.size))
            this.btmSurf = pygame.transform.flip(this.topSurf, False, True)
        # Now render the creepy top and bottom 'shadow'
        dest.blit(this.topSurf, (0, destpos[1]))
        dest.blit(
            this.btmSurf, 
            (0, destpos[1]+viewpos.h-this.size))
#            (0, dest.get_height()-this.size-this.borderSpaceBottom))

# Renders a backdrop image with an optional gradient below it
class BackdropLayer(object):
    # The backdrop image
    backdrop = None
    # The color rendered below the backdrop
    belowColor = None
    # The speed at which the backdrop moves across the screen, relative
    # to the speed at which the foreground moves.
    speed = 1
    # The (foreground) location at which the backdrop image can be seen
    # centered in the view.
    center = None
    # The starting color of the gradient (just below the backdrop)
    gradientStartColor = None
    # The ending gradient color (bottom of the screen)
    gradientEndColor = None
    # The size of the gradient to render
    gradientSize = -1

    def __init__(this, img, col):
        this.backdrop = img
        this.belowColor = col
        this.gradient = None

    def render(this, dest, destpos, viewpos):
        if (not this.gradient and this.gradientSize != -1):
            # Initialise the sky gradient now
            this.gradient = utils.gradient(
                this.gradientStartColor, this.gradientEndColor, 
                (dest.get_width(), this.gradientSize))
        # Figure out where to render the backdrop on the screen
        (x, y) = (this.center[0]-viewpos.x*this.speed, 
                  this.center[1]-viewpos.y*this.speed)
        # Render the sky first, then the backdrop over top, then finally
        # the ground under it.
        r = dest.blit(this.gradient, (0, y+this.backdrop.get_height()))
        dest.fill(this.gradientEndColor, 
                  (0, r.bottom, dest.get_width(),
                   dest.get_height()-r.bottom))
        dest.blit(this.backdrop, (x, y))
        #display.fill(this.belowColor, (0, r.bottom, display.get_width(), 
        #                               display.get_height()-r.bottom))


class FadeoutLayer(object):
    # When the fade out started
    startTime = 0
    # How fast the fadeout happens (in pixel values per second)
    speed = 0
    # The current alpha value (from 0 to 255)
    alpha = 0
    # The cached surface
    surf = None

    def __init__(this, speed):
        this.startTime = time.time()
        this.speed = speed

    def render(this, display, viewpos):
        if (not this.surf):
            this.surf = pygame.Surface(display.get_size()).convert_alpha()
        this.alpha = int((time.time()-this.startTime) * this.speed)
        this.alpha = min(this.alpha, 255)
        this.surf.fill((0, 0, 0, this.alpha))
        display.blit(this.surf, (0, 0))

