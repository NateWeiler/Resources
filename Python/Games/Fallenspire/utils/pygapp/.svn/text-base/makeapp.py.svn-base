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
import traceback
import sys
import os
import math
import site

# Find the script's base directory so we can add it to the site path
try:
    i = sys.argv.index("-P")
except:
    print "cannot find script base directory"
    sys.exit(1)

# The path to the script is found after the "-P" flag
site.addsitedir(os.path.dirname(sys.argv[i+1]))
from util import *

class GlobalSettings:
    oversampleValue = 0
    origin = (0, 0, 0)
    singleAngle = True

settings = GlobalSettings()

# TODO - move the rest of these into GlobalSettings
baseSize = (0, 0)
baseOffset = "0,0"
depth = None
scale = 1
outdir = "output"
borderSize = 2
# Render an animation into a single file, or one frame per file
singleFile = True

# TODO - this is a hack
VISIBLE_LAYER = 0x01
SOLID_LAYER = 0x02
TEMP_LAYER = 0x04

scn = Scene.GetCurrent()
context = scn.getRenderingContext()

size = (context.imageSizeX() * scale,
        context.imageSizeY() * scale)
aspect = float(context.imageSizeX()) / context.imageSizeY()

context.imageSizeX(int(size[0]))
context.imageSizeY(int(size[1]))

camera = None

# The blender "Empty" objects to track over each animation
tracking = []

class Trigger:
    frame = 0
    name = None

class ActionInfo:
    singleAngle = False
    loopstart = 0
    # The 'fixed' action name
    name = None
    ## The action's real name
    #actionName = None
    fps = 15
    speed = 0
    looping = False
    child = None
    reverse = None
    triggers = None
    def __init__(this, name=None):
        this.name = name
        this.triggers = []

#outputAnims = Armature.NLA.GetActions().keys()

dirAngles = {
    "north" : 135,
    "west" : 225,
    "east" : 45,
    "south" : 315,
    "southeast" : 0,
    "southwest" : 270,
    "northwest" : 180,
    "northeast" : 90,
    }

def get_offset(img, (x1, y1, x2, y2), pos=None):
    if (not pos): pos = settings.origin
    global camera
    (xp, yp) = get_pos(camera, pos)
    xp *= img.get_width()
    yp *= img.get_height()
    xp = (xp - x1) / float(x2 - x1)
    yp = (yp - y1) / float(y2 - y1)
    return (xp, yp)

def write_anim(duration, basedir):
    # Render the animation, and find a bounding box that encapsulates all
    # the frames.
    files = render_anim(context, duration, oversample=settings.oversampleValue)
    # Compute the new image origin (aka offset) based on the clip rectangle
    img = pygame.image.load(files[0])
    #print "OFFSET ==", (xp, yp), basedir
    #sys.exit()
    # Start writing the definition file
    path = os.path.join(basedir, "definition.xml")
    out = file(path, "w")
    out.write("<?xml version='1.0' encoding='ISO-8859-1'?>\n")
    out.write("<animation>\n")

    # We need to do this before cropping the images
    for track in tracking:
        out.write("\t<track name=\"%s\">\n" % track.getName())
        n = 1
        for fname in files:
            # Calculate the position of the object in worldspace
            context.currentFrame(n)
            n += 1
            mat = track.getMatrix()
            pos = Vector((0,0,0,1))*mat
            # Calculate the offset into the image
            rect = get_bounding_box_from_files((fname,), border=borderSize)
            (x, y) = get_offset(img, rect)
            (xp, yp) = get_offset(img, rect, pos=pos)
            # Write it out
            out.write('\t\t<point offset="%0.3f,%0.3f"/>\n' % (xp-x, yp-y))
        out.write("\t</track>\n")
    context.currentFrame(1)

    if (singleFile):
        # Append the frames into a single image
        out.write("   <frames src=\"frames.png\">\n")
        for fname in files:
            rect = get_bounding_box_from_files((fname,), border=borderSize)
            (xp, yp) = get_offset(img, rect)
            out.write("     <frame size=\"%dx%d\" offset=\"%0.3f,%0.3f\"/>\n"%(
                    rect[2]-rect[0], rect[3]-rect[1], xp, yp))
            crop_image(fname, fname, rect)
        new = os.path.join(basedir, "frames.png")
        append_images(files, new)
        out.write("   </frames>\n")
    else:
        # Each frame gets it's own image. Crop the images, saving them to the
        # right directory
        for fname in files:
            rect = get_bounding_box_from_files((fname,), border=borderSize)
            (xp, yp) = get_offset(img, rect)
            out.write("  <frame src=\"%s\" offset=\"%0.3f,%0.3f\"/>\n" % 
                      (os.path.basename(fname), xp, yp))
            new = os.path.join(basedir, os.path.basename(fname))
            crop_image(fname, new, rect)

    out.write("</animation>\n")
    out.close()

def write_action(baseObj, outdir, duration, info):
    # Write the definition file
    name = fix_action_name(info.name)
    path = os.path.join(outdir, name, "definition.xml")
    out = file(path, "w")
    out.write("<?xml version='1.0' encoding='ISO-8859-1'?>\n")
    out.write("<action>\n")
    # Render the animations now
    done = False
    (a, b, startAngle) = baseObj.getEuler()
    for (dname, angle) in dirAngles.items():
        if (info.singleAngle or settings.singleAngle):
            done = True
            dname = "south"
            angle = 0
        basedir = os.path.join(outdir, name, dname)
        try:
            os.mkdir(basedir)
        except:
            pass
        if (not settings.singleAngle):
            baseObj.setEuler((a, b, startAngle+math.radians(angle)))
        # Write out the animation
        write_anim(duration, basedir)
        if (done):
            break
    for dname in dirAngles.iterkeys():
        # TODO - this is tacky
        if (done):
            out.write("  <animation name=\"%s\" src=\"south\"/>\n" % dname)
        else:
            out.write("  <animation src=\"%s\"/>\n" % dname)
    out.write("  <fps>%0.3f</fps>\n" % info.fps)
    out.write("  <looping>%s</looping>\n" % str(info.looping))
    if (info.loopstart != 0):
        out.write("  <loopstart>%d</loopstart>\n" % info.loopstart)
    for tr in info.triggers:
        out.write("  <event frame=\"%s\" name=\"%s\"/>\n" % (
            tr.frame, tr.name))
    out.write("</action>\n")
    out.close()
    # Reset the starting angle
    baseObj.setEuler((a,b,startAngle))


def output_appearance(baseObj, outdir, obj, solid=None):
#    global outputAnims
    # Compute the base size of the object (in pixels)
    args = baseObj.getBoundBox()
    #(minpos, (dx, dy, dz)) = get_bound_box(baseObj)
    #print minpos, (dx, dy, dz)
    #sys.exit()
    if (args):
        (dx, dy, dz) = ((args[0]-args[4]).length,
                        (args[1]-args[2]).length,
                        (args[0]-args[1]).length)
        sizex = context.imageSizeX() * dx/camera.getData().scale
        sizey = context.imageSizeX() * dy/camera.getData().scale
        baseSize = (int(sizex), int(sizey))
        # Also compute the center of the object within that bounding box
        # (the base offset).
        pos = Vector(obj.getLocation())
        baseOffset = (sizex*(pos-args[0])[0]/dx,
                      sizey*(pos-args[0])[1]/dy)
    else:
        baseSize = (0, 0)
        baseOffset = (0, 0)
    # Write the definition file
    out = file(os.path.join(outdir, "definition.xml"), "w")
    out.write("<?xml version='1.0' encoding='ISO-8859-1'?>\n")
    out.write("<appearance>\n")
#    count = len(actionInfo.keys()) #len(outputAnims)
#    actions = Armature.NLA.GetActions()
#    for info in actionInfo.itervalues():
#        if (info.child):
#            assert(actions.has_key(info.name))
#            count -= 1
#    if (count <= 0 or obj.getType() == "Mesh"):
#        # Create a standard Idle action
#        name = "Idle"
#        try:
#            os.mkdir(os.path.join(outdir, name))
#        except:
#            pass
#        out.write("  <action name=\"%s\" src=\"%s\"/>\n" % (name, name))
#        # Write out the action definition file
#        info = ActionInfo()
#        info.name = "Idle"
#        info.looping = False
#        actionInfo[info.name] = info
#        write_action(baseObj, outdir, 1, info)
#        outputAnims = []
#    for name in outputAnims:
#        if (not actions.has_key(name)):
#            print "skipping action", name
#            continue
#        info = actionInfo.get(name)
    for info in actionInfo.values():
        name = info.name
        if (info and info.child and info.child != obj):
            continue
        try:
            assert(obj.type == "Armature")
            action = Armature.NLA.GetActions()[name]
        except:
            if (name != "Idle"):
                raise Exception("no such blender action as %s" % name)
            duration = 1
        else:
            # Look at each channel of the action, and try to figure out how long
            # the action lasts.
            duration = 1
            action.setActive(obj)
            for ipo in action.getAllChannelIpos().itervalues():
                # Look at each individual curve
                for curve in ipo.getCurves():
                    # Now the points that makeup a single curve
                    for points in curve.getPoints():
                        duration = max(duration, points.pt[0])
        # Figure out the "real" name of the action
        name = fix_action_name(name)
        if (info and info.looping):
            # Cyclical animations should skip the last frame, because it's
            # equivalent to the first.
            duration -= 1
        try:
            os.mkdir(os.path.join(outdir, name))
        except:
            pass
        out.write("  <action name=\"%s\" src=\"%s\"/>\n" % (name, name))
        # Write out the action definition file
        write_action(baseObj, outdir, duration, info)
    for info in actionInfo.itervalues():
        if (info.reverse):
            out.write("  <action name=\"%s\" reverse=\"%s\"/>\n" %
                      (info.name, info.reverse))
    if (obj == baseObj):
        # Output references to the child appearances
        for other in childMeshes:
            out.write("  <child name='%s' src='%s'/>\n" % (other.getName(),
                                                           other.getName()))
    if (depth):
        out.write("  <depth>%s</depth>\n" % depth)
    out.write("  <basesize>%d,%d</basesize>\n" % baseSize)
    out.write("  <baseoffset>%d,%d</baseoffset>\n" % baseOffset)
    out.write("</appearance>\n")
    out.close()


def parse_buf(lines):
    if (not lines):
        return
    # Extract some information about the animations and such
    count = 0
    while (count < len(lines) and lines[count] != ""):
        if (":" in lines[count]):
            # Handle special cases
            (key, value) = lines[count].split(":")
            value = value.strip()
            if (key == "autodepth"):
                pass
            elif (key == "osa"):
                settings.oversampleValue = int(value)
            elif (key == "depth"):
                depth = str(value)
            elif (key == "child"):
                childMeshes.append(Object.Get(value))
            elif (key == "single"):
                settings.singleAngle = parse_bool(value)
            count += 1
            continue
        # Grab the action name
        info = ActionInfo()
        info.actionName = lines[count]
        info.name = fix_action_name(info.actionName)
        count += 1
        # Read the params
        while (lines[count] != "" and lines[count][0] == '\t'):
            line = lines[count].strip()
            (key, value) = line.split(":")
            value = value.strip()
            if (key == "fps"):
                info.fps = float(value)
            elif (key == "speed"):
                info.speed = float(value)
            elif (key == "looping"):
                info.looping = parse_bool(value)
                #(value[0] == 't' or value[0] == 'T' or
                #                value[0] == '1')
            elif (key == "loopstart"):
                info.loopstart = int(value)-1
            elif (key == "child"):
                # This action only applies to a child mesh
                info.child = Object.Get(value)
            elif (key == "reverse"):
                info.reverse = value
            elif (key == "event"):
                t = Trigger()
                (t.frame, t.name) = value.split(",")
                info.triggers.append(t)
            elif (key == "single"):
                info.singleAngle = parse_bool(value)
            count += 1
        if (not info.name.startswith("_")):
            actionInfo[info.name] = info
#    # Make sure every action has an ActionInfo associated with it
#    for name in outputAnims:
#        if (not actionInfo.has_key(name)):
#            info = ActionInfo()
#            info.actionName = name
#            info.name = fix_action_name(name)
#            actionInfo[name] = info

actionInfo = {}
childMeshes = []

########################## MAIN ##########################
def main():
    global camera

    try: os.mkdir(outdir)
    except: pass

    try:
        buf = Text.Get("def")
    except:
        buf = ["single: True", 
               "Idle",
               ""]
    else:
        buf = buf.asLines()

    parse_buf(buf)

    # Process the script's command-line argument
    # TODO - this is kind of a hack which can be cleaned up somewhat
    # by using blender 2.45
    curr = None
    for arg in sys.argv:
        try:
            (name, value) = arg.split("=")
            if (name.startswith("--")): name = name[2:]
        except:
            continue
        if (name == "object"):
            # Select an object
            curr = Object.Get(value)
        elif (name == "rot"):
            # Rotate the selected object
            (rx, ry, rz) = value.split(",")
            curr.setEuler(
                [math.radians(float(rx)),
                 math.radians(float(ry)),
                 math.radians(float(rz))])
        elif (name == "pos"):
            # Position the selected object
            (x, y, z) = value.split(",")
            curr.setLocation([float(x), float(y), float(z)])
        elif (name == "pad"):
            # Specify how much padding to add to the rendered images
            borderSize = int(value)
        elif (name == "energy"):
            curr.getData().setEnergy(float(value))
        elif (name == "osa"):
            settings.oversampleValue = int(value)
        elif (name == "camera"):
            #scn.setCurrentCamera(camera)
            camera = Object.Get(value)
            scn.objects.camera = camera
    if (not camera):
        camera = Object.Get("Camera")

    # Grab the geometry that defines the solid map
    try:
        solid = Object.Get("Solid")
    except:
        solid = None

    try:
        baseObj = Object.Get("Object")
    except:
        baseObj = None
    try:
        obj = Object.Get("Armature")
    except:
        obj = None
    assert(baseObj or obj)
    if (not baseObj):
        baseObj = obj
    if (not obj):
        obj = baseObj

    for tmp in scn.objects:
        if (tmp.getType() == "Empty"):
            tracking.append(tmp)

    Blender.Window.ViewLayer([VISIBLE_LAYER])
    output_appearance(baseObj, outdir, obj, solid=solid)

    # Move the lights over to render the child meshes
    for obj in scn.objects:
        if (obj.getType() == "Lamp"):
            obj.Layer = TEMP_LAYER

    Blender.Window.ViewLayer([3])
    for obj in childMeshes:
        obj.Layer = TEMP_LAYER
        basedir = os.path.join(outdir, obj.getName())
        try: os.mkdir(basedir)
        except: pass
        output_appearance(baseObj, basedir, obj)
        obj.Layer = VISIBLE_LAYER
        print obj.getName()

if (__name__ == "__main__"):
    try:
        main()
    except SystemExit:
        pass
    except:
        traceback.print_exc()
        sys.exit(1)
    sys.exit()

