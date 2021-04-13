# balloon.py - Speech balloon object
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
import cairo
import pygame
import math
import numpy
from numpy.linalg import norm

import scene
import utils

#############
# Functions #
#############

# Split up the string into lines in an attempt to fit it inside of an 
# ellipse. The arguments are:
#
# * txt    = the text to format
# * width  = the length (in characters) of the longest line
# * nlines = a guess at the number of lines that will fit
#
# If this function cannot properly fit the text it will return None. You
# don't need to call this function directly - use 'format_text' below.
#
def attempt_wrap_text(txt, width, nlines):
    def calc_ellipse(a, b, y):
        return math.sqrt((a**2) * (1-y**2/b**2))

    pos = 0
    line = 0
    lines = []
    while (pos < len(txt)):
        try:
            x = calc_ellipse(width/2.0, nlines/2.0, line-nlines/2.0)
        except ValueError:
            return None
        nchars = int(round(2*x))

        # Take as many words as we can, up to 'nchars'.
        if (pos+nchars >= len(txt)):
            # Take everything to the end of the string
            last = len(txt)
        else:
            i = txt.rfind(" ", pos, pos+nchars)
            if (i == -1):
                # No spaces left, take the whole substring
                last = pos+nchars
            else:
                # Take the substring
                last = i+1

        if (last > pos):
            lines.append(txt[pos:last])
        pos = last
        line += 1
    return lines

# Formats the given text inside of an ellipse. The 'width' argument is the
# length of the longest line.
def wrap_text(txt, width):
    n = 1
    while 1:
        lines = attempt_wrap_text(txt, width, n)
        if (lines != None):
            return lines
        n += 1

# Renders some text into an elliptical shape
def render_wrapped_text(font, txt, nchars):
    # Now automatically wrap the text so it fits in an ellipse
    lines = wrap_text(txt, nchars)
    # Render each line of text into it's own surface
    surfs = []
    width = 0
    height = 0
    for line in lines:
        surf = font.render(line, True, (0,0,0))
        surfs.append(surf)
        # Keep track of the width and height
        width = max(width, surf.get_width())
        height += surf.get_height()
    # Create a surface large enough to fit all the text
    img = pygame.Surface((width, height)).convert_alpha()
    img.fill((0,0,0,0))
    x = 0
    y = 0
    lastpos = None
    for surf in surfs:
        # Make the line centered in the text box
        x = width/2 - surf.get_width()/2
        img.blit(surf, (x, y))
        lastpos = (x + surf.get_width(), y + surf.get_height()/2)
        y += surf.get_height()
    return (img, lastpos)


###########
# Classes #
###########


class SpeechBalloonImage(object):
    # This controls how wide the spout is (in degrees)
    spoutSpread = 20
    # The fill color of the speech balloon
    bgcolor = (1, 1, 1)
    # The border color
    borderColor = (0, 0, 0)
    # The starting position (tip of the spout)
    start = None
    # The ending position (center of the ellipse)
    end = None
    # The speech balloon surface
    surf = None
    # The offset into the surface of the location of the spout's tip
    tipOffset = None
    # The region occupied by the ball of the speech balloon (offset within
    # the surface).
    ballRect = None
    ballCenter = None
    # The amount of padding to add around the ellipse
    padding = 50

    def __init__(this, (w, h), vec):
        this.ellipseSize = (w + this.padding, h + this.padding)
        this.spoutVec = vec

    def create(this):
        (w, h) = this.ellipseSize

        # Figure out how big to make the surface
        spoutVec = this.spoutVec
        spoutLen = norm(spoutVec)

        ballRect = pygame.Rect(0, 0, 0, 0)
        ballRect.size = (w, h)
        ballRect.center = (0, 0)

        rect = ballRect.union(pygame.Rect((spoutVec, (0, 0))))
        center = numpy.array((-rect.x, -rect.y))
        ballRect.center = center

        # Figure out where the tip of the spout is located
        this.ballRect = ballRect
        this.ballCenter = center
        this.tipOffset = center + spoutVec
        this.render_balloon(rect.size)

    def render_balloon(this, size):
        # Draw with Cairo
        surface = utils.create_cairo_surface(*size)

        cnt = cairo.Context(surface)
        cnt.set_line_width(2)

        def draw_ellipse(angle=None, spread=None):
            # Draw an ellipse for the "ball" part
            cnt.save()
            cnt.translate(*this.ballCenter)
            cnt.scale(*this.ballRect.size)
            if (angle != None):
                cnt.arc(0, 0, 0.49, angle+spread, angle-spread)
            else:
                cnt.arc(0, 0, 0.49, 0, 2*math.pi)
            cnt.restore()
            # Set the fill color
            cnt.set_source_rgb(*this.bgcolor)
            cnt.fill_preserve()
            # Set the border color
            cnt.set_source_rgb(*this.borderColor)
            cnt.stroke()

        # Test if the given point is inside of an ellipse center at (0, 0)
        def inside_ellipse(pt, (w, h)):
            if (pt[0]**2/(w/2.0)**2 + pt[1]**2/(h/2.0)**2 <= 1):
                return True
            return False

        def ellipse_func(angle, (w, h)):
            return numpy.array((w*math.cos(angle)/2, 
                                h*math.sin(angle)/2))

        if (not inside_ellipse(this.tipOffset-this.ballCenter, 
                               this.ballRect.size)):
            # Calculate the angle the tip makes with the center of the ellipse
            dist = this.tipOffset - this.ballCenter
            angle = math.atan2(dist[1]*this.ballRect.w, 
                               dist[0]*this.ballRect.h)

            # Calculate the points where the tip attaches
            spread = math.radians(this.spoutSpread/2)
            pt1 = ellipse_func(angle+spread, this.ballRect.size)
            pt2 = ellipse_func(angle-spread, this.ballRect.size)

            # Render the tip. . Note that we have to shift the points inwards 
            # (towards the center of the balloon) a little bit to avoid 
            # any seams.
            n = 0.96
            cnt.move_to(*(this.ballCenter + pt1*n))
            cnt.line_to(*this.tipOffset)
            cnt.line_to(*(this.ballCenter + pt2*n))
            cnt.set_source_rgb(*this.bgcolor)
            cnt.fill_preserve()
            cnt.stroke()

            # Draw an ellipse for the "ball" part
            draw_ellipse(angle, spread)

            # Now render the tip outline. Again we have to shift the attachment
            # points inward to avoid gaps.
            n = 0.98
            cnt.move_to(*(this.ballCenter + pt1*n))
            cnt.line_to(*this.tipOffset)
            cnt.line_to(*(this.ballCenter + pt2*n))
            cnt.set_source_rgb(*this.borderColor)
            cnt.stroke()

        else:
            draw_ellipse()

        this.surf = utils.cairo_surface_to_pygame(surface)


# The speech balloon object that gets added to the level
class SpeechBalloon(scene.Object):
    # The actual balloon instance
    balloon = None
    # The font to use for rendering text
    font = None
    # Whether to show the blinking cursor
    showCursor = True
    # When the cursor started blinking
    cursorBlinkStart = 0
    # The time between cursor blinks
    cursorBlinkPeriod = 1
    # Where to render the cursor in the surface
    cursorPos = None
    # The cursor surface
    cursorSurf = None
    # The character we are following around
    tracking = None

    def __init__(this, font, cursor):
        scene.Object.__init__(this)
        this.font = font
        this.cursorSurf = cursor
        this.cursorBlinkStart = time.time()

    def set_text(this, txt):
        # Render the text
        (textImage, lastpos) = render_wrapped_text(this.font, txt, 30)
        # Size the balloon to fit the text
        (w, h) = textImage.get_size()
        this.balloon = SpeechBalloonImage((w, h), (80, 80))
        this.balloon.create()
        this.image = this.balloon.surf.copy()
        # Center the text in the balloon
        r = textImage.get_rect()
        r.center = this.balloon.ballRect.center
        this.image.blit(textImage, r)
        this.cursorPos = (lastpos[0] + r.x, lastpos[1] + r.y)

    def update_screen_rect(this):
        # Position the balloon by it's tip
        (xp, yp) = this.balloon.tipOffset
        (x, y) = this.pos
        x -= xp
        y -= yp
        this.rect.topleft = (int(x), int(y))
        this.rect.size = this.balloon.surf.get_size()

    def track_character(this, char):
        dist = 15
        v = dist * this.balloon.tipOffset/norm(this.balloon.tipOffset)
        this.pos = (char.pos[0]-v[0],
                    char.pos[1]-0.8*char.rect.h-v[1])

    def update(this, dt):
        scene.Object.update(this, dt)
        this.track_character(this.tracking)

    def render(this, dest, pos):
        dest.blit(this.image, pos)
        if (this.showCursor):
            # Render the blinking cursor
            #n = (time.time()-this.cursorBlinkStart)/this.cursorBlinkPeriod
            #if (int(n) % 2 == 0):

            surf = this.cursorSurf.copy()
            n = utils.oscillate(50, 255, 2.5)
            utils.adjust_alpha(surf, n)
            r = surf.get_rect()
            r.center = (pos[0] + this.cursorPos[0]+surf.get_width()/2+4,
                        pos[1] + this.cursorPos[1]+2)
            dest.blit(surf, r)

