#!/usr/bin/env python
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
import site

site.addsitedir("utils")
import util
from util import *

# Import makeapp functionality (so we can render animated scenery)
import makeapp
makeapp.singleAngle = True
makeapp.postScale = 1

# TODO - magic numbers
VISIBLE = 0x01
INVISIBLE = 0x04
OVERSAMPLE = 0 #5
AUTO_CONNECT_NODES = True

#size = (800,600)
outdir = "output"
baseImageFile = "background"
solidImageFile = "solidmap"

try:
    os.mkdir(outdir)
except:
    pass

class SceneObject:
    castshadow = True
    blenderObj = None
    pos = None
    depth = 0
    scenePos = None
    height = 0
    surf = None
    masksurf = None
    filename = None
    tooltip = None

oldmats = {}

def get_object (name):
    for sobj in allobjects + allother:
        if (sobj.blenderObj.name == name):
            return sobj
    return None

def set_material (obj, mat):
    data = obj.getData()
    if (obj.getType() == "Armature"):
        return
    oldmat = data.getMaterials(-1) + obj.getMaterials(-1)
    if (len(oldmat) == 0):
        return
    if (type(mat) != list and type(mat) != tuple):
        mat = [mat]
    obj.setMaterials(mat)
    data.setMaterials(mat)
    assert(data.getMaterials() == mat)
    data.update()
    return oldmat

def sub_surf(s1, s2, fullrect=False):
    assert(s1.get_size() == s2.get_size())
    (minx, maxx, miny, maxy) = (sys.maxint, -sys.maxint,
                                sys.maxint, -sys.maxint)
    if (fullrect):
        temp = None
    else:
        temp = pygame.Surface(s1.get_size())
        temp.fill((255,0,255))
    for x in xrange(s1.get_width()):
        for y in xrange(s1.get_height()):
            pt = (x, y)
            c1 = s1.get_at(pt)
            c2 = s2.get_at(pt)
            if (c1 != c2):
                if (temp): temp.set_at(pt, c2)
                minx = min(x, minx)
                maxx = max(x, maxx)
                miny = min(y, miny)
                maxy = max(y, maxy)
    if (fullrect):
        surf = s2
    else:
        surf = temp
    temp = surf.subsurface((minx, miny), (maxx-minx, maxy-miny))
    return (temp, (minx, miny))


class Node:
    direction = None
    pos = None
    number = 0
    links = None
    widths = None
    def __init__(this):
        this.links = []
        this.widths = {}
        this.number = Node.number
        Node.number += 1

    def Link (this, other, w):
        this.links.append(other)
        this.widths[other] = w
        other.links.append(this)
        other.widths[this] = w


# An iteration object that can be used to iterate over all points (ie
# pixels) on the given line from start to finish.
# TODO - this should use the midpoint algorithm (faster)
class LineIter:
    def __init__(this, p1, p2, skip=1, offset=0):
        dx = p2[0] - p1[0]
        dy = p2[1] - p1[1]
        mag = math.sqrt(dx**2 + dy**2)
        this.skip = skip
        if (abs(dx) > abs(dy)):
            # The line is closer to horizontal, so we should move along
            # the x-axis and compute the y-value at each point.
            this.moveX = True
            this.dir = sign(p2[0] - p1[0])
        else:
            # Just the opposite (closer to the vertical) so we should
            # move along the y-axis instead.
            this.moveX = False
            this.dir = sign(p2[1] - p1[1])
        this.dx = dx
        this.dy = dy
        this.dir *= skip
        this.p1 = p1
        this.p2 = (int(p2[0]), int(p2[1]))
        this.done = False
        (this.x, this.y) = (int(p1[0] + (dx/mag)*offset),
                            int(p1[1] + (dy/mag)*offset))

    def __iter__(this):
        return this

    # Get the next pixel on the line
    def next(this):
        if (this.done):
            raise StopIteration()
        # Handle both cases
        (x, y) = (this.x, this.y)
        if (this.moveX):
            # Move along the x-axis
            if (this.dir > 0 and this.x+this.dir >= this.p2[0] or
                this.dir < 0 and this.x+this.dir <= this.p2[0]):
                # Return the last point
                this.done = True
                return this.p2
            this.y = ((this.x - this.p1[0])*this.dy)/this.dx + this.p1[1]
            y = this.y
            this.x += this.dir
        else:
            # Move along the y-axis
            if (this.dir > 0 and this.y+this.dir >= this.p2[1] or
                this.dir < 0 and this.y+this.dir <= this.p2[1]):
                # Return the last point
                this.done = True
                return this.p2
            this.x = ((this.y - this.p1[1])*this.dx)/this.dy + this.p1[0]
            x = this.x
            this.y += this.dir
        return (int(x), int(y))

# Returns the maximum width of the straight-line path connecting src to dest
# (or 0 if no path exists).
def check_path(solid, src, dest):
    def check_line(solid, src, dest):
        iter = LineIter(src, dest, skip=4)
        rect = solid.get_rect()
        for pt in iter:
            if (rect.collidepoint(pt)):
                col = solid.get_at(pt)
                if (col[0] == 0 and col[1] == 0 and col[2] == 0):
                    return False
        return True
    dx = dest[0] - src[0]
    dy = dest[1] - src[1]
    # The perpendicular vector
    mag = math.sqrt(dx**2 + dy**2)
    pdx = -dy/mag
    pdy = dx/mag
    maxWidth = 0
    for n in xrange(0, 100, 2): # TODO - magic
        # Check to one side
        p1 = (src[0] + n*pdx, src[1] + n*pdy)
        p2 = (dest[0] + n*pdx, dest[1] + n*pdy)
        if (not check_line(solid, p1, p2)):
            maxWidth = n-1
            break
        # Check to the other side of the line
        p1 = (src[0] - n*pdx, src[1] - n*pdy)
        p2 = (dest[0] - n*pdx, dest[1] - n*pdy)
        if (not check_line(solid, p1, p2)):
            maxWidth = n-1
            break
    return maxWidth
        
def save_img(img, name, alpha=True):
    # Save the image as a BMP, then convert to PNG
    path = os.path.join(outdir, name)
    bmpout = path + ".bmp"
    pngout = path + ".png"
    pygame.image.save(img, bmpout)
    if (alpha):
        extra = "-transparent magenta"
    else:
        extra = ""
    os.system("convert %s %s %s" % (extra, bmpout, pngout))


############
### Main ###
############
scn = Scene.GetCurrent()
context = scn.getRenderingContext()
size = (context.imageSizeX(),
        context.imageSizeY())

# Create a material for making (scenery) objects invisible during rendering
# (note these objects will still cast shadows, which is what we want).
invisible = Material.New()
invisible.rgbCol = [0, 0, 0]
invisible.setAlpha(0.0001)
invisible.mode |= Material.Modes.ZTRANSP
#invisible.mode |= Material.Modes.ONLYSHADOW
invisible.setEmit(0)
invisible.setSpec(0)

# Material for making "other" (ie non-scenery) objects invisible
invisibleOther = Material.New()
invisibleOther.rgbCol = [1, 1, 1]
invisibleOther.setAlpha(0.0001)
invisibleOther.mode |= Material.Modes.ZTRANSP
invisibleOther.mode |= Material.Modes.ONLYSHADOW
invisibleOther.mode &= ~Material.Modes.TRANSPSHADOW
invisibleOther.mode &= ~Material.Modes.SHADOW
invisibleOther.setEmit(0)
invisibleOther.setSpec(0)

invisibleOther = invisible

camera = Object.Get("Camera")

#mat = camera.getMatrix().rotationPart()
#mat.invert()
#vec = MatMultVec(mat, Vector([0,0,-1]))
##vec.z = 0
#vec.normalize()

class SolidMap:
    materials = None
    mapObject = None
    image = None
    def __init__(this):
        this.materials = {}

def find_node(name):
    for node in nodes:
        if (node.blenderObj.name == name):
            return node
    return None

print ""
masks = []
scenery = []
objects = []
allobjects = []
# Everything else, besides scenery and objects
allother = []
nodes = []
solidMap = SolidMap()
for obj in scn.getChildren():
    try:
        prop = obj.getProperty("type")
        value = prop.getData()
    except:
        prop = None
        value = None
    if (value == "node"):
        sobj = Node()
        (x, y) = get_pos(camera, obj.getLocation())
        x = int(x*size[0])
        y = int(y*size[1])
        sobj.pos = (x, y)
        sobj.blenderObj = obj
        try:
            prop = obj.getProperty("direction")
        except:
            prop = None
        if (prop):
            sobj.direction = str(prop.getData())
        sobj.name = obj.getName()
        nodes.append(sobj)
        continue
    elif (value == "item"):
        # Make it invisible for the baseline rendering (ie not there)
        sobj = SceneObject()
        sobj.type = "item"
        sobj.blenderObj = obj
        objects.append(sobj)
    elif (value == "mask"):
        sobj = SceneObject()
        sobj.type = "mask"
        sobj.blenderObj = obj
        try:
            prop = obj.getProperty("tooltip")
        except:
            prop = None
        if (prop):
            sobj.tooltip = str(prop.getData())
        try:
            prop = obj.getProperty("source")
        except:
            prop = None
        if (prop):
            sobj.sourceObj = str(prop.getData())
            sobj.depth = None
        else:
            sobj.sourceObj = None
        # Set the depth
        try:
            prop = obj.getProperty("depth")
        except:
            prop = None
        if (prop):
            sobj.depth = str(prop.getData())
        elif (not sobj.sourceObj):
            sobj.depth = "bottom"
        masks.append(sobj)
    elif (value == "scenery"):
        # Make it transparent, but still casting shadows. Be sure to make
        # a backup copy of the material (since it's being replaced).
        sobj = SceneObject()
        sobj.type = "scenery"
        sobj.blenderObj = obj
        scenery.append(sobj)
        try:
            prop = obj.getProperty("tooltip")
        except:
            prop = None
        if (prop):
            sobj.tooltip = str(prop.getData())
        try:
            prop = obj.getProperty("depth")
        except:
            prop = None
        if (prop):
            sobj.depth = str(prop.getData())
        try:
            prop = obj.getProperty("castshadow")
        except:
            prop = None
        if (prop):
            sobj.castshadow = bool(int(prop.getData()))
        try:
            obj.getProperty("forceosa")
            OVERSAMPLE = 5
        except:
            pass
        # Grab the object's children too
        #sobj.children = []
        #for child in get_children(obj):
        #    sobj.children.append(child)
    elif (value == "solid map"):
        solidMap.mapObject = obj
        # Check for material definitions
        for prop in obj.getAllProperties():
            col = prop.getName()
            if ("," in col):
                # This property specifies a color to game material mapping
                # (eg solid map color 1,1,1 == creaky wood)
                solidMap.materials[col] = str(prop.getData())
        continue
    elif (value == "door"):
        continue
    elif (value == "scene info"):
        try:
            prop = obj.getProperty("shadows")
        except:
            prop = None
        if (prop):
            util.SHADOWS = bool(int(prop.getData()))
        try:
            obj.getProperty("forceosa")
            OVERSAMPLE = 5
        except:
            pass
        try:
            prop = obj.getProperty("autonodes")
        except:
            prop = None
        if (prop):
            AUTO_CONNECT_NODES = bool(int(prop.getData()))
        continue
    else:
        if (obj.getType() == "Mesh"):
            # Add the mesh as a "background" object
            sobj = SceneObject()
            sobj.blenderObj = obj
            allother.append(sobj)
        continue
    # Compute the location, relative to the camera (aligned along the
    # negative z-axis). First we construct the rotation matrix manually,
    # to avoid getting the "scale" part which is returned by rotationPart()
    loc = obj.getLocation()
    (x, y) = get_pos(camera, [loc[0], loc[1], 0])
    sobj.filename = "object%03d" % (len(allobjects)+1)
    # Compute the depth
    if (not sobj.depth):
        sobj.depth = y*size[1]
    allobjects.append(sobj)

for sobj in allother[:]:
    for other in scenery + objects:
        #obj = sobj.blenderObj.getParent()
        #if (obj and obj.name == other.blenderObj.name):
        if (has_ancestor(sobj.blenderObj, other.blenderObj)):
            try: allother.remove(sobj)
            except ValueError,e:
                print "cannot remove", sobj.blenderObj.name

#assert(solidMapObject)

# Make everything invisible, except the object defining the solid map and
# the camera (of course).
for obj in scn.getChildren():
    if (obj.getType() == "Mesh" and obj != solidMap.mapObject):
        obj.Layer = INVISIBLE

if (solidMap.mapObject):
    solidMap.mapObject.Layer = VISIBLE
    # Now render the solid map
    solidMap.image = render_scene(context, solidImageFile, outdir=outdir,
                                  showalpha=False)
    #save_img(solidmap, solidImageFile, alpha=False)

# Make everything visible again
for obj in scn.getChildren():
    obj.Layer = VISIBLE

if (solidMap.mapObject):
    solidMap.mapObject.Layer = INVISIBLE

if (solidMap.image and AUTO_CONNECT_NODES):
    for node in nodes:
        node.offscreen = not(solidMap.image.get_rect().collidepoint(node.pos))
    # Find connections between the nodes
    for n1 in nodes:
        if (n1.offscreen):
            # Special case - link to the closest node
            closest = None
            for n2 in nodes:
                if (n1 == n2): continue
                if (not(closest) or
                    get_dist(n1.pos, n2.pos) < get_dist(n1.pos, closest.pos)):
                    closest = n2
            n1.Link(closest, 1)
            continue
        for n2 in nodes:
            if (n1 == n2 or n1.links.__contains__(n2) or n2.offscreen):
                continue
            w = check_path(solidMap.image, n1.pos, n2.pos)
            if (w > 0):
                n1.Link(n2, w)

for node in nodes:
    for prop in node.blenderObj.getAllProperties():
        if (prop.getName().startswith("adj")):
            other = find_node(str(prop.getData()))
            node.Link(other, 1)

def set_visible(sobj, bg=False):
    if ((sobj in scenery and sobj.castshadow) or bg):
        # Make the "scenery" visible
        set_material(sobj.blenderObj, oldmats[sobj.blenderObj.name])
        for child in get_children(sobj.blenderObj):
            set_material(child, oldmats[child.name])
            child.Layer = VISIBLE
    else:
        # Make the object visible
        sobj.blenderObj.Layer = VISIBLE
        for child in get_children(sobj.blenderObj):
            child.Layer = VISIBLE

def set_invisible(sobj, bg=False):
    if ((sobj in scenery and sobj.castshadow) or bg):
        if (bg):
            invis = invisibleOther
        else:
            invis = invisible
        oldmats[sobj.blenderObj.name] = set_material(
            sobj.blenderObj, invis)
        # Make all of it's children invisible too
        for child in get_children(sobj.blenderObj):
            mat = oldmats[child.name] = set_material(child, invis)
            if (mat and len(mat) > 0):
                if (mat[0].getMode() & Material.Modes["SHADOW"] == 0):
                    # No shadow for this object
                    child.Layer = INVISIBLE
    else:
        # Make the object invisible
        sobj.blenderObj.Layer = INVISIBLE
        for child in get_children(sobj.blenderObj):
            child.Layer = INVISIBLE

def get_child(obj, ftype):
    for child in get_children(obj):
        if (child.getType() == ftype):
            return child
    return None

# Make all objects and scenery invisible
for sobj in allobjects:
    set_invisible(sobj)

render_scene(context, baseImageFile, oversample=OVERSAMPLE,
             outdir=outdir, showalpha=False)
fullBaseImageFile = os.path.join(outdir, baseImageFile + ".png")
#render_scene(context, outdir=outdir, showalpha=False)

# Make all the background objects invisible
for sobj in allother:
    #oldmats[sobj.blenderObj.name] = set_material(sobj.blenderObj, invisible)
    set_invisible(sobj, bg=True)

# Make the takeable objects visible again
for sobj in objects[:]:
    #sobj.blenderObj.Layer = VISIBLE
    set_visible(sobj)
    # Render the "nice" graphic (oversampled)
    (img, sobj.pos) = render_scene(
        context, sobj.filename, oversample=OVERSAMPLE, outdir=outdir)
    set_invisible(sobj)

# Render the masks
for sobj in masks:
    # Make it visible
    set_visible(sobj)
    obj = sobj.blenderObj
    render_scene(
        context, sobj.filename, oversample=OVERSAMPLE, outdir=outdir,
        nocrop=True, shadows=False)
    # Make it invisible again
    set_invisible(sobj)
    # Figure out what we want to apply the mask to - either the background
    # image, or an object in the scene.
    if (sobj.sourceObj):
        # Render the source object
        srcFile = os.path.join(util.tempdir, util.TEMP_FILE)
        srcObj = get_object(sobj.sourceObj)
        set_visible(srcObj, bg=True)
        render_scene(context, None, oversample=OVERSAMPLE)
        set_invisible(srcObj, bg=True)
        func = "Dst_In"
    else:
        srcFile = fullBaseImageFile
        func = "CopyOpacity"
    # Now use the rendered image as a mask for the background. This will
    # produce the actual scene object.
    fname = os.path.join(outdir, sobj.filename + ".png")
    os.system("composite -compose %s %s %s %s" % (
        func, fname, srcFile, fname))
    sobj.pos = auto_crop(fname)

# Render the scenery objects, one at a time
for sobj in scenery:
    # Make it visible and all it's children
    set_visible(sobj)
    obj = sobj.blenderObj
    if (obj.getType() == "Armature"):
        arm = obj
    else:
        arm = get_child(obj, "Armature")
    if (arm):
        # The scenery is animated
        try:
            os.mkdir(os.path.join(outdir, sobj.filename))
        except OSError,e:
            pass
        makeapp.origin = obj.getLocation()
        # Figure out what actions to render
        n = 0
        makeapp.outputAnims = []
        makeapp.actionInfo = {}
        makeapp.oversampleValue = OVERSAMPLE
        while 1:
            if (n == 0): extra = ""
            else: extra = str(n)
            try:
                prop = obj.getProperty("action" + extra)
            except:
                break
            # Add another action
            info = makeapp.ActionInfo()
            info.name = str(prop.getData())
            # Fix the action's name before hashing
            makeapp.actionInfo[info.name] = info
            makeapp.outputAnims.append(info.name)
            # Check for params
            try:
                prop = obj.getProperty("fps")
            except:
                prop = None
            if (prop):
                info.fps = int(prop.getData())
            try:
                prop = obj.getProperty("looping")
            except:
                prop = None
            if (prop):
                info.looping = parse_bool(prop.getData())
                ###
                #makeapp.output_appearance(
                #    obj, os.path.join(outdir, sobj.filename),
                #    arm, solid=None)
                #sys.exit()
            n += 1
        makeapp.output_appearance(
            obj, os.path.join(outdir, sobj.filename),
            arm, solid=None)
        loc = obj.getLocation()
        (x, y) = get_pos(camera, loc) #[loc[0], loc[1], 0])
        x = int(x*size[0])
        y = int(y*size[1])
        sobj.pos = (x, y)
    else:
        # Static scenery
        (img, sobj.pos) = render_scene(
            context, sobj.filename, oversample=OVERSAMPLE, outdir=outdir)
        pass
    # Make it invisible again
    set_invisible(sobj)

# Make the background objects visible again
#for sobj in allother:
#    set_material(sobj.blenderObj, sobj.oldmat)

# Write the scene definition file
out = file(os.path.join(outdir, "definition.xml"), "w")
out.write("<?xml version='1.0' encoding='ISO-8859-1'?>\n")
out.write("<scene>\n")
out.write("   <background src=\"%s\"/>\n" % baseImageFile)
if (solidMap.mapObject):
    out.write("   <solidmap src=\"%s\">\n" % solidImageFile)
    for (col, name) in solidMap.materials.items():
        out.write("      <material name=\"%s\" color=\"%s\"/>\n" % (name, col))
    out.write("   </solidmap>\n")
#out.write("   <camera perspective=\"%0.6f\" height=\"%0.3f\"/>\n" % (
#    perspective, camera.getLocation()[2]))
out.write("   <objects>\n")

for sobj in allobjects:
    if (not sobj.pos):
        # The image is empty - skip this object
        continue
    #save_img(sobj.surf, filename)
    #if (sobj.masksurf):
    #    maskfile = "mask%03d" % n
    #    save_img(sobj.masksurf, maskfile)
    out.write("      <object type=\"%s\">\n" % sobj.type)
    out.write("          <name>%s</name>\n" % sobj.blenderObj.getName())
    out.write("          <image>%s</image>\n" % sobj.filename)
    out.write("          <pos>%d,%d</pos>\n" % sobj.pos)
    out.write("          <depth>%s</depth>\n" % sobj.depth)
    out.write("          <height>%0.3f</height>\n" % sobj.height)
    if (sobj.tooltip):
        out.write("          <tooltip>%s</tooltip>\n" % sobj.tooltip)
    #if (sobj.masksurf):
    #    out.write("          <mask>%s</mask>\n" % maskfile)
    out.write("      </object>\n")

out.write("   </objects>\n")

out.write("   <waypoints>\n")
# Write out the waypoint graph
for node in nodes:
    (x, y) = node.pos
    if (node.direction):
        out.write(
            "\t\t<node name=\"%s\" pos=\"%d,%d\" direction=\"%s\"/>\n" % (
            node.name, x, y, node.direction))
    else:
        out.write("      <node name=\"%s\" pos=\"%d,%d\"/>\n" % (
            node.name, x, y))
for node in nodes:
    for other in node.links:
        out.write("      <connection n1=\"%d\" n2=\"%d\" width=\"%d\"/>\n" % (
            node.number, other.number, node.widths[other]))
out.write("   </waypoints>\n")
out.write("</scene>")
out.close()

sys.exit()

