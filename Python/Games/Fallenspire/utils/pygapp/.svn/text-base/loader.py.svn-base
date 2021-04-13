# loader.py
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

###########
# Imports #
###########

import xml.dom.minidom
import pygame
import os

from level import *
from appearance import *

#############
# Functions #
#############

def get_elements(node):
    lst = []
    for child in node.childNodes:
        if (child.nodeType == node.ELEMENT_NODE):
            lst.append(child)
    return lst

def get_attr(node, name):
    return str(node.attributes[name].value)

def get_value (node):
    return str(node.childNodes[0].nodeValue)

def parse_bool(b):
    return (b[0] == '1' or b[0] == 't' or b[0] == 'T')

def parse_vector(txt, ftype=int, sep=","):
    lst = []
    for arg in txt.split(sep):
        lst.append(ftype(arg.strip()))
    return lst

def parse_color(txt):
    if (not txt): 
        return None
    if (txt[0] == "#"):
        if (len(txt) == 7):
            # Add the alpha channel to fix a bug in pygame 1.8.1
            txt += "FF"
        elif (len(txt) == 4):
            # Expand the color code to the long form (readable by pygame)
            txt = "#" + txt[1]*2 + txt[2]*2 + txt[3]*2 + "FF"
    return pygame.color.Color(txt)

# Returns the transpose of a matrix
def transpose(mat):
    new = []
    for ncol in xrange(len(mat[0])):
        new.append([])
        for nrow in xrange(len(mat)):
            new[-1].append(mat[nrow][ncol])
    return new

###########
# Classes #
###########

class Loader:
    # Cache of loaded appearances
    appearanceCache = None
    # Cache of loaded animations
    animationCache = None
    levelPath = "levels"

    def __init__(this, basepath="."):
        this.basepath = basepath
        # TODO - use a weakvalue dictionary
        this.appearanceCache = {}
        this.animationCache = {}

    def get_document (this, path):
        dom = xml.dom.minidom.parse(
            os.path.join(path, "definition.xml"))
        return dom.documentElement

    def fix_path (this, path):
        if (not path.startswith(this.basepath)):
            path = os.path.join(this.basepath, path)
        return path

    # Returns a new level Node instance. Override this function if you want to
    # use your own class.
    def make_node(this):
        return Node()

    # Returns a new Grid instance. Override this function if you want to use
    # your own class.
    def make_grid(this, level, cells):
        return Grid(level, cells)

    # Returns a new Level instance. Override this function if you want to 
    # use your own class.
    def make_level(this):
        return Level(this)

    def load_image(this, path, scale=1, alpha=True):
        # Try loading the file directly
        try:
            img = pygame.image.load(path)
        except:
            # Look in the media base directory
            try:
                img = pygame.image.load(os.path.join(this.basepath, path))
            except:
                # Look in the images subdirectory
                img = pygame.image.load(
                    os.path.join(this.basepath, "images", path))
        if (alpha):
            img = img.convert_alpha()
        if (scale != 1):
            img = pygame.transform.rotozoom(img, 0, scale)
        return img

    def load_appearance_factory (this, path, fixpath=True, **kwargs):
        if (fixpath):
            path = this.fix_path(os.path.join("appearances", path))
        if (this.appearanceCache.has_key(path)):
            return this.appearanceCache[path]
        node = this.get_document(path)
        app = this.load_appearance_from_node(path, node, **kwargs)
        this.appearanceCache[path] = app
        return app

    def load_appearance_from_node (this, path, node, scale=1):
        app = AppearanceFactory(os.path.basename(path))
        app.loader = this
        app.scale = scale
        for child in node.childNodes:
            if (child.nodeType != node.ELEMENT_NODE):
                continue
            if (child.tagName == "solid"):
                app.isSolid = parse_bool(get_value(child))
            elif (child.tagName == "action"):
                # Create a new action and configure it
                name = str(child.attributes["name"].value)
                try:
                    copy = str(child.attributes["copy"].value)
                except:
                    copy = None
                try: reverse = get_attr(child, "reverse")
                except: reverse = None
                if (copy):
                    # This action is a straight copy of another action
                    action = app.actions[copy]
                elif (reverse):
                    # TODO - fix this
                    if (not app.actions.has_key(reverse)):
                        continue
                    action = ReversedAction(app.actions[reverse])
                else:
                    # Create a new action and configure it
                    src = str(child.attributes["src"].value)
                    action = this.load_action(os.path.join(path, src),
                                              scale=scale)
                app.actions[name] = action
            elif (child.tagName == "depth"):
                app.depth = parse_depth(get_value(child))
            elif (child.tagName == "child"):
                name = get_attr(child, "name")
                src = get_attr(child, "src")
                other = this.load_appearance_factory(os.path.join(path, src))
                app.add_child(name, other)
            elif (child.tagName == "basesize"):
                # Set the base size, and a default offset
                app.baseSize = parse_vector(get_value(child))
            elif (child.tagName == "baseoffset"):
                # Set the base size, and a default offset
                app.baseOffset = parse_vector(get_value(child))
        return app

    def load_action (this, path, **kwargs):
        node = this.get_document(path)
        return this.load_action_from_node(path, node, **kwargs)

    def load_action_from_node (this, path, node, scale=1):
        action = Action()
        # Configure from the XML node
        #duration = 1
        #offset = None
        action.basePath = path
        for child in node.childNodes:
            if (child.nodeType != child.ELEMENT_NODE):
                continue
            if (child.tagName == "event"):
                frame = int(get_attr(child, "frame"))
                name = str(get_attr(child, "name"))
                lst = action.triggers.get(frame, [])
                lst.append(name)
                action.triggers[frame] = lst
            #elif (child.tagName == "duration"):
            #    duration = float(get_value(child))
            elif (child.tagName == "looping"):
                action.looping = parse_bool(get_value(child))
            elif (child.tagName == "loopstart"):
                action.loopStart = int(get_value(child))
            elif (child.tagName == "fps"):
                action.fps = float(get_value(child))
            elif (child.tagName == "animation"):
                src = str(child.attributes["src"].value)
                try:
                    name = get_attr(child, "name")
                except:
                    # Use the source directory as the name
                    name = src
                action.animations[name] = this.load_animation(
                    os.path.join(path, src), scale=scale)
        return action

    def load_animation (this, path, **kwargs):
        if (this.animationCache.has_key(path)):
            return this.animationCache[path]
        try:
            node = this.get_document(path)
        except:
            node = None
        # Cache the animation in case it's needed later
        anim = this.load_animation_from_node(path, node, **kwargs)
        this.animationCache[path] = anim
        return anim

    def load_animation_from_node (this, path, node, duration=1, scale=1):
        if (not node):
            # No definition file - just load all images in the directory
            anim = Animation()
            #anim.duration = duration
            for name in os.listdir(path):
                anim.add_frame(
                    this.load_image(os.path.join(path, name), scale))
            return anim
        # Create a new animation instance, and define it using the XML node
        anim = Animation()
        #anim.duration = duration
        frameSize = None
        for child in node.childNodes:
            if (child.nodeType != child.ELEMENT_NODE):
                continue
            if (child.tagName == "scale"):
                scale = float(get_value(child))
            #elif (child.tagName == "duration"):
            #    anim.duration = float(get_value(child))
            elif (child.tagName == "offset"):
                anim.offset = parse_vector(get_value(child), ftype=float)
            elif (child.tagName == "frame"):
                # Load the frame
                fname = get_attr(child, "src")
                try:
                    (xp, yp) = get_attr(child, "offset").split(",")
                    offset = (float(xp), float(yp))
                except:
                    offset = (0, 0)
                frame = this.load_image(os.path.join(path, fname), scale=scale)
                frameSize = frame.get_size()
                anim.add_frame(frame, offset)
            elif (child.tagName == "frames"):
                # The animation is stored in a single image, with frames 
                # appended one after the other horizontally.
                fname = str(get_attr(child, "src"))
                img = this.load_image(os.path.join(path, fname), scale=scale)
                x = 0
                for other in child.childNodes:
                    if (other.nodeType == other.ELEMENT_NODE and 
                        other.tagName == "frame"):
                        # Extract the frame offset
                        (xp, yp) = parse_vector(get_attr(other, "offset"), 
                                                ftype=float)
                        (w, h) = parse_vector(get_attr(other, "size"),
                                              ftype=int, sep="x")
                        frame = img.subsurface((x, 0, w, h))
                        anim.add_frame(frame, (xp, yp))
                        x += w
                # Split the image into individual frames
                #num = len(offsets)
                #if (num == 0):
                #    num = 1
                #    offsets = ((0,0),)
                #w = img.get_width()/num
                #for n in xrange(num):
                #    frame = img.subsurface((n*w, 0, w, img.get_height()))
                #    anim.add_frame(frame, offsets[n])
            elif (child.tagName == "track"):
                points = []
                for other in child.childNodes:
                    if (other.nodeType == other.ELEMENT_NODE and 
                        other.tagName == "point"):
                        (x, y) = parse_vector(get_attr(other, "offset"),
                                              ftype=float)
                        points.append((x, y))
                name = get_attr(child, "name")
                anim.tracks[name] = points
        return anim

    def load_font(this, fname, size):
        return pygame.font.Font(
            os.path.join(this.basepath, "fonts", fname), size)

    def load_level(this, path):
        dom = xml.dom.minidom.parse(
            os.path.join(this.basepath, this.levelPath, path))
        node = dom.documentElement
        level = this.make_level()
        grids = []
        for child in get_elements(node):
            if (child.tagName == "name"):
                level.name = get_value(child)
            elif (child.tagName == "grid"):
                grid = this.load_grid_from_node(level, child)
                grids.append(grid)
            elif (child.tagName == "tiles"):
                # Load the tiles used in this level
                for other in get_elements(child):
                    if (other.tagName == "tile"):
                        name = get_attr(other, "name")
                        level.tileMapping.append(name)
            elif (child.tagName == "nodes"):
                # Load in the level nodes
                for other in get_elements(child):
                    nd = this.load_level_node(other)
                    level.add_node(nd)
            else:
                # Lookup the function that loads this node. It will parse
                # the XML node and configure the level object accordingly.
                func = getattr(this, "load_level_%s_from_node" % child.tagName)
                func(child, level)
        level.set_grids(grids)
        return level

    def load_level_node(this, node):
        nd = this.make_node()
        nd.name = get_attr(node, "name")
        for child in get_elements(node):
            if (child.tagName == "pos"):
                # Special position property
                nd.pos = parse_vector(get_value(child), ftype=float)
            else:
                nd.properties[str(child.tagName)] = get_value(child)
        return nd

    def load_grid_from_node(this, level, node):
        depth = int(get_attr(node, "depth"))
        # Parse out the rows and columns of the grid
        rows = []
        for line in get_value(node).splitlines():
            values = line.strip().split(" ")
            if (not values or values[0] == ""):
                continue
            rows.append([])
            for value in values:
                # The value in each grid cell is an index into the level's 
                # tile map (not the list of actual tiles). So here we change
                # the tile index into something we can use.
                #name = level.tileMapping[int(value)]
                #tile = level.tileSet.tilesByName[name]
                #value = level.tileSet.tiles.index(tile)

                rows[-1].append(int(value))
        grid = this.make_grid(level, transpose(rows))
        grid.depth = depth
        return grid

