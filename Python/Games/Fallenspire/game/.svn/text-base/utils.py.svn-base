# utils.py
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

import cairo
import array
import random
import numpy
import pygame
import math
import time
import Image
import numpy

# Force pygame to use numpy since that's what we are using here
pygame.surfarray.use_arraytype("numpy")

def sign(x):
    return cmp(x, 0)


# Darken the image by the given amount
def darken_surf(img, amount):
    alpha = pygame.surfarray.pixels_alpha(img)
    rgbarray = pygame.surfarray.array3d(img)
    src = numpy.array(rgbarray)
    dest = numpy.zeros(rgbarray.shape)
    # Use the cross-fade technique (found in pygame documentation) to 
    # darken the image.
    dest[:] = (0, 0, 0)
    diff = (dest - src) * (amount/255.0)
    new = src + diff.astype("uint8")
    newsurf = pygame.surfarray.make_surface(new).convert_alpha()
    try:
        pygame.surfarray.pixels_alpha(newsurf)[:] = alpha
    except:
        print numpy.__version__
        print pygame.display.get_surface()
        print img, newsurf
        print numpy.size(pygame.surfarray.pixels_alpha(newsurf)[:]), \
            numpy.size(alpha)
        raise Exception()
    return newsurf


# Multiply the image alpha channel by the given amount (0 to 255). This 
# function changes the image in place.
def adjust_alpha(img, amount):
    if (type(amount) == int and amount == 255):
        # Nothing to do
        return
    if (isinstance(amount, pygame.Surface)):
        # Extract the alpha channel from the given surface
        amount = pygame.surfarray.pixels_alpha(amount)

    alpha = pygame.surfarray.pixels_alpha(img)
    alpha = (alpha*(amount/255.0))
    alpha = numpy.clip(alpha, 0, 255)
    pygame.surfarray.pixels_alpha(img)[:] = alpha.astype("uint8")
    #newsurf = img.copy()
    #pygame.surfarray.pixels_alpha(newsurf)[:] = alpha
    #return newsurf

# Returns a surface filled with the given color, but having the same
# alpha channel as the given image.
def set_color(img, color):
    newsurf = pygame.Surface(img.get_size()).convert_alpha()
    newsurf.fill(color)
    alpha = pygame.surfarray.pixels_alpha(img)
    pygame.surfarray.pixels_alpha(newsurf)[:] = alpha
    if (len(color) == 4):
        adjust_alpha(newsurf, color[-1])
    return newsurf

## 
#def get_alpha_mask(surf):

# Use the image to sweep a border around itself
def sweep_border(surf, border):
    (w, h) = surf.get_size()
    newsurf = pygame.Surface((w+2*border, h+2*border)).convert_alpha()
    newsurf.fill((0,0,0,0))
    if (border <= 2):
        step = 90
    elif (border <= 6):
        step = 45
    else:
        step = 10
    for angle in xrange(0,360,step):
        (x, y) = (border*math.cos(math.radians(angle)),
                  border*math.sin(math.radians(angle)))
        newsurf.blit(surf, (border+x, border+y))
    return newsurf

def oscillate(a, b, rate):
    n = math.cos(time.time()*rate)
    return a + (b-a)*(n+1)/2

## Load a GIF animation and return it as a series of surfaces
#def load_gif_anim(fd, mode="P"):
#    img = Image.open(fd)
#    lst = []
#    n = 0
#    while True:
#        try:
#            img.seek(n)
#        except EOFError:
#            break
#        data = img.tostring("raw", mode)
#        surf = pygame.image.frombuffer(data, img.size, mode)
#        lst.append(surf)
#        n += 1
#    return lst

def make_grid(width, height):
    grid = []
    for x in xrange(width):
        grid.append([])
        for y in xrange(height):
            grid[-1].append(0)
    return grid

# Returns the value clamped on the internal a-b
def clamp(n, a, b):
    return max(min(n, b), a)

# Returns a surface with a rendered gradient from 'col1' to 'col2' along
# the vertical axis.
def gradient(col1, col2, (w, h)):
    surf = pygame.Surface((w, h)).convert_alpha()
    rate = (float(col2[0]-col1[0])/h,
            float(col2[1]-col1[1])/h,
            float(col2[2]-col1[2])/h,
            float(col2[3]-col1[3])/h)
    for y in xrange(h):
        (r, g, b, alpha) = (min(max(col1[0] + (rate[0]*y), 0), 255),
                            min(max(col1[1] + (rate[1]*y), 0), 255),
                            min(max(col1[2] + (rate[2]*y), 0), 255),
                            min(max(col1[3] + (rate[3]*y), 0), 255))
        col = (int(r), int(g), int(b), int(alpha))
        pygame.draw.line(surf, col, (0, y), (w, y))
    if (col1[-1] == 255 and col2[-1] == 255):
        # The alpha channel doesn't change, so there's no need to return
        # an alpha surface.
        return surf.convert()
    return surf

# Saves the frames of an animation into a single image
def save_frames(anim, outpath):
    try:
        os.mkdir(outpath)
    except:
        pass
    # Find a bounding box to hold all frames
    xmin = ymin = sys.maxint
    xmax = ymax = -sys.maxint
    for count in xrange(len(anim.frames)):
        frame = anim.frames[count]
        (wp, hp) = frame.get_size()
        (xp, yp) = anim.offsets[count]
        xp = int(xp*wp)
        yp = int(yp*hp)
        xmin = min(xmin, -xp)
        ymin = min(ymin, -yp)
        xmax = max(xmax, wp-xp)
        ymax = max(ymax, hp-yp)
    w = xmax-xmin
    h = ymax-ymin
    for count in xrange(len(anim.frames)):
        frame = anim.frames[count]
        surf = pygame.Surface((w, h))
        surf.fill((0,0,0))
        (wp, hp) = frame.get_size()
        (xp, yp) = anim.offsets[count]
        xp = int(xp*wp)
        yp = int(yp*hp)
        surf.blit(frame, (-xmin-xp, -ymin-yp))
        path = os.path.join(outpath, "frame%02d.bmp" % (count+1))
        pygame.image.save(surf, path)

# Randomly chooses an element given the frequency of occurance of 
# each element.
def wchoice(lst, freq):
    assert(len(lst) == len(freq))
    r = random.random()
    total = 0
    for n in xrange(len(lst)):
        total += freq[n]
        if (r < total):
            return lst[n]

# Performs a skew transformation of an image, along the X axis, by the
# given amount (in pixels).
def skew(img, amount):
    newsurf = pygame.Surface((img.get_width()+abs(amount), 
                              img.get_height())).convert_alpha()
    newsurf.fill((0,0,0,0))
    slope = float(amount)/img.get_height()
    x = 0
    for y in xrange(img.get_height()):
        newsurf.blit(img.subsurface((0, y, img.get_width(), 1)), (int(x), y))
        x += slope
    return newsurf

# Also skews the given surface, but produces a much nicer result
def smooth_skew(img, amount):
    scale = 2.0
    img = pygame.transform.rotozoom(img, 0, scale)
    img = skew(img, 30*scale)
    img = pygame.transform.rotozoom(img, 0, 1/scale)
    return img

def soften_surf(orig, n=1):
    rgbarray = pygame.surfarray.pixels_alpha(orig).astype("int")
    surf = numpy.array(rgbarray)
    surf[n:,:]  += rgbarray[:-n,:]*8
    surf[:-n,:] += rgbarray[n:,:]*8
    surf[:,n:]  += rgbarray[:,:-n]*8
    surf[:,:-n] += rgbarray[:,n:]*8
    surf /= 33
    #surf = pygame.surfarray.make_surface(surf).convert_alpha()
    pygame.surfarray.pixels_alpha(orig)[:] = surf
    return orig

# Creates a surface to rendering with cairo
def create_cairo_surface(w, h):
    data = array.array('c', chr(0)*w*h*4)
    stride = w * 4
    surface = cairo.ImageSurface.create_for_data(
        data, cairo.FORMAT_ARGB32, w, h, stride)
    return surface

# Turns the cairo surface into a pygame surface
def cairo_surface_to_pygame(surface):
    return pygame.image.frombuffer(
        str(surface.get_data()),
        (surface.get_width(), surface.get_height()), "RGBA")

def desaturate_surf(surf):
    alpha = pygame.surfarray.pixels_alpha(surf)
    rgbarray = pygame.surfarray.array3d(surf)
    r = rgbarray[:,:,0]/255.0
    g = rgbarray[:,:,1]/255.0
    b = rgbarray[:,:,2]/255.0
    # Calculate the perceived intensity of the color
    gray = ((0.3*r + 0.59*g + 0.11*b)*255).astype("uint8")
    rgbarray[:,:,0] = gray
    rgbarray[:,:,1] = gray
    rgbarray[:,:,2] = gray
    newsurf = pygame.surfarray.make_surface(rgbarray).convert_alpha()
    pygame.surfarray.pixels_alpha(newsurf)[:] = alpha
    return newsurf

def render_border(dest, destpos, img, color, size=2):
    img = sweep_border(set_color(img, color), size)
    dest.blit(img, (destpos[0]-size, 
                    destpos[1]-size))
    return img

# Adds an empty border around the given surface
def pad_surf(surf, size):
    (w, h) = surf.get_size()
    newsurf = pygame.Surface((w+size[0], h+size[1])).convert_alpha()
    newsurf.fill((0,0,0,0))
    #r = surf.get_rect()
    #r.center = newsurf.get_rect().center
    newsurf.blit(surf, (size[0]/2, size[1]/2))
    return newsurf

def blur_surf(surf, amount=5):
    for n in xrange(amount):
        surf = soften_surf(surf, n=2)
    return surf

# Renders a nice shadow for the given image
def add_shadow(surf, offset, alpha=240, blur=5):
    shadow = set_color(surf, (0,0,0))
    adjust_alpha(shadow, alpha)
    shadow = blur_surf(pad_surf(shadow, (blur,blur)), amount=blur)
    dest = pygame.Surface((
            max(shadow.get_width(), surf.get_width())+abs(offset[0]), 
            max(shadow.get_height(), surf.get_height())+abs(offset[1])))
    dest = dest.convert_alpha()
    dest.fill((0,0,0,0))

    if (offset[0] > 0):
        xp = offset[0]
    else:
        xp = 0
    if (offset[1] > 0):
        yp = offset[1]
    else:
        yp = 0

    dest.blit(shadow, (xp, yp))
    dest.blit(surf, (dest.get_width()-xp-shadow.get_width(),
                     dest.get_height()-yp-shadow.get_height()))

    return dest
