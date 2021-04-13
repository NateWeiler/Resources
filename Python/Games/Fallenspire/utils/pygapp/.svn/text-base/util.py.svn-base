# util.py
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

import pygame
import Blender
from Blender import *
from Blender.Scene import Render
from Blender.Mathutils import *
import sys
import os
import math
from PIL import Image

tempdir = "/tmp/"
SHADOWS = True
TEMP_FILE = "0001.png"

# Convert a camera position to screen coordinates
def convert_to_screen_pos(camera, pos):
    (x, y, z) = pos
    scn = Scene.GetCurrent()
    context = scn.getRenderingContext()
    size = (context.imageSizeX(),
            context.imageSizeY())
    correction = (float(size[0])/size[1])
    if (camera.getData().getType() == 0):
        # Perspective projection
        perspective = 32.0 / camera.getData().lens
        mid = 0.5
        xp = mid - x / (z * perspective)
        yp = mid + correction * y / (z * perspective)
    else:
        # Ortho projection
        camscale = camera.getData().scale
        xp = 0.5 + x / camscale
        yp = 0.5 - correction * y / camscale
    return (xp, yp)

def get_pos(camera, loc):
    #global camera
    (rotx, roty, rotz) = camera.getEuler()
    matx = RotationMatrix(math.degrees(rotx), 3, 'x')
    maty = RotationMatrix(math.degrees(roty), 3, 'y')
    matz = RotationMatrix(math.degrees(rotz), 3, 'z')
    mat = matx * maty * matz
    campos = camera.getLocation()
    #loc = MatMultVec(mat, Vector([loc[0]-campos[0],
    #                              loc[1]-campos[1],
    #                              loc[2]-campos[2]]))
    loc = mat * Vector([loc[0]-campos[0],
                        loc[1]-campos[1],
                        loc[2]-campos[2]])
    return convert_to_screen_pos(camera, loc)


##def render_scene(context, filename=None, oversample=0,
##                 outdir=None, nocrop=False, shadows=True, showalpha=True):
##    # Configure the rendering context
##    context.enableExtensions(True)
##    context.setRenderPath(tempdir)
##    context.setImageType(Render.PNG)
##    #context.framesPerSec(15)
##    context.startFrame(1)
##    context.endFrame(1)
##    context.enableKey()
##    # Rendering options
##    context.enableRayTracing(True)
##    #if (shadows):
##    #    context.enableShadow(SHADOWS)
##    #if (oversample > 0):
##    #    context.enableOversampling(True)
##    #    context.setOversamplingLevel(oversample)
##    #else:
##    #    context.enableOversampling(False)
##    # Enable/disable alpha rendering
##    if (showalpha):
##        context.enableRGBAColor()
##    else:
##        context.enableRGBColor()
##    context.renderAnim()
##
##    tmpfile = tempdir + TEMP_FILE
##    pos = (0, 0)
##    if (filename):
##        filename = os.path.join(outdir, filename) + ".png"
##        # Save to a specific file
##        os.system("convert %s %s" % (tmpfile, filename))
##        if (showalpha and not nocrop):
##            # Also autocrop the image
##            pos = auto_crop(filename)
##            return (pygame.image.load(filename), pos)
##    else:
##        filename = tmpfile
##    return pygame.image.load(filename)


def render_scene(context, filename=None, oversample=-1, showalpha=False,
                 outdir=None, nocrop=False, shadows=True):
    # Configure the rendering context
    context.enableExtensions(True)
    context.setRenderPath(TEMPDIR)
    context.setImageType(Render.PNG)
    #context.framesPerSec(15)
    context.startFrame(1)
    context.endFrame(1)
    context.enableKey()
    # Rendering options
    context.enableRayTracing(True)
    # Save the old oversampling options, so we can restore them later
    oldOSA = context.oversampling
    oldOSALevel = context.OSALevel
    if (shadows):
        context.enableShadow(SHADOWS)
    if (oversample > 0):
        context.enableOversampling(True)
        context.setOversamplingLevel(oversample)
    elif (oversample == 0):
        context.enableOversampling(False)
    # Enable/disable alpha rendering
    if (showalpha):
        context.enableRGBAColor()
    else:
        context.enableRGBColor()
    context.renderAnim()
    # Now restore OSA level
    context.enableOversampling(oldOSA)
    context.setOversamplingLevel(oldOSALevel)
    tmpfile = TEMPDIR + TEMP_FILE
    pos = (0, 0)
    if (filename):
        filename = os.path.join(outdir, filename) + ".png"
        # Save to a specific file
        #os.system("convert %s %s" % (tmpfile, filename))
        shutil.copy(tmpfile, filename)
        if (showalpha and not(nocrop)):
            # Also autocrop the image
            pos = auto_crop(filename)
            return (Image.open(filename), pos)
    else:
        filename = tmpfile
    return Image.open(filename)


def render_anim(context, duration, oversample=0):
    # Configure the rendering context
    context.enableExtensions(1)
    context.setRenderPath(tempdir)
    context.setImageType(Render.PNG)
    context.enableRGBAColor()
    #context.framesPerSec(15)
    context.startFrame(1)
    duration = max(1, int(duration))
    context.endFrame(duration)
    # Rendering options
    context.enableRayTracing(True)
    #context.enableShadow(SHADOWS)
    if (oversample > 0):
        context.enableOversampling(True)
        context.setOversamplingLevel(oversample)
    else:
        context.enableOversampling(False)
    context.renderAnim()
    # Return the list of frames
    files = []
    for n in xrange(int(duration)):
        name = "%04d.png" % (n+1)
        old = tempdir + name
        #new = os.path.join(basedir, name)
        #os.rename(old, new)
        files.append(old)
    return files


def read_irisbuf(path):
    bytes = []
    for n in xrange(4):
        fd = os.popen("sgitopnm -channel %d %s 2> /dev/null" % (4+n, path))
        # Read the header
        magic = fd.readline()
        size = fd.readline().strip().split(" ")
        psize = fd.readline()
        # Read the data
        data = fd.read()
        bytes.append(data)
    fd.close()
    depth = []
    mindepth = 2**32
    maxdepth = 0
    average = 0
    (w, h) = (int(size[0]), int(size[1]))
    n = 0
    for y in xrange(h):
        row = []
        for x in xrange(w):
            (a, b, c, d) = (long(ord(bytes[0][n])),
                            long(ord(bytes[1][n])),
                            long(ord(bytes[2][n])),
                            long(ord(bytes[3][n])))
            value = (d << 24) | (c << 16) | (b << 8) | a
            row.append(value)
            maxdepth = max(maxdepth, value)
            mindepth = min(mindepth, value)
            average += value
            n += 1
        depth.append(row)
    spread = float(maxdepth-mindepth)
    for y in xrange(h):
        for x in xrange(w):
            # Normalize the depth a bit (easier to work with)
            depth[y][x] = 100 * (depth[y][x] - mindepth) / spread
    return depth


def auto_crop(filename):
    img = Image.open(filename)
    x1 = y1 = sys.maxint
    x2 = y2 = -sys.maxint
    pixels = img.load()
    # Update the bounding box
    for x in xrange(img.size[0]):
        for y in xrange(img.size[1]):
            if (img.getpixel((x, y))[3] != 0):
                x1 = min(x1, x)
                x2 = max(x2, x)
                y1 = min(y1, y)
                y2 = max(y2, y)
    crop_image(filename, filename, (x1, y1, x2, y2))
    return (x1, y1)

# rect == (x1, y1, x2, y2)
def crop_image(fname, destname, rect):
    img = Image.open(fname)
    img = img.crop(rect)
    img.save(destname)

def append_images(files, outfile):
    total = None
    for fname in files:
        img = Image.open(fname)
        if (total):
            total = total.crop((0, 0, 
                                total.size[0]+img.size[0], 
                                max(total.size[1], img.size[1])))
            total.paste(img, (total.size[0]-img.size[0], 0))
        else:
            total = img
    total.save(outfile)

def sign(x):
    if (x < 0): return -1
    elif (x > 0): return 1
    return 0


def get_bounding_box_from_files(files, border=10):
    x1 = y1 = sys.maxint
    x2 = y2 = -sys.maxint
    for fname in files:
        # Update the bounding box
        img = pygame.image.load(fname)
        for x in xrange(img.get_width()):
            for y in xrange(img.get_height()):
                if (img.get_at((x, y))[3] != 0):
                    x1 = min(x1, x)
                    x2 = max(x2, x)
                    y1 = min(y1, y)
                    y2 = max(y2, y)
    x1 = max(x1-border, 0)
    x2 = min(x2+border, img.get_width())
    y1 = max(y1-border, 0)
    y2 = min(y2+border, img.get_height())
    return (x1, y1, x2, y2)


def get_children(obj):
    slist = []
    for other in Blender.Object.Get():
        if (has_ancestor(other, obj)):
            slist.append(other)
    return slist

def has_ancestor(obj1, obj2):
    if (obj1 == obj2):
        return False
    temp = obj1
    while (temp):
        if (temp == obj2):
            return True
        temp = temp.getParent()
    return False

def get_dist (p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

def parse_bool (b):
    return (b[0] == '1' or b[0] == 't' or b[0] == 'T')

def fix_action_name(name):
    i = name.rfind("_")
    if (i != -1):
        name = name[0:i]
    return name

