# loader.py
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

import traceback
import pygame
import os
import xml.dom.minidom
import time
import Image

import utils
import pygapp
from pygapp import parse_vector, get_elements, get_attr, parse_bool, \
    get_value, parse_color
from scene import TileSet, Tile, TileImage, Level, Grid
import layers

###########
# Globals #
###########

# The global Loader instance
gLoader = None

#############
# Functions #
#############

# These are convenience functions for accessing the global gLoader instance
def load_image(*args, **kwargs):
    return gLoader.load_image(*args, **kwargs)

def load_level(name):
    return gLoader.load_level(name)

def load_appearance_factory(name):
    return gLoader.load_appearance_factory(name)

def load_font(name, size):
    return gLoader.load_font(name, size)

def set_base_path(path):
    global gLoader
    gLoader.basepath = path

###########
# Classes #
###########

class Loader(pygapp.Loader):

    def make_grid(this, level, cells):
        return Grid(level, cells)

    def make_level(this):
        return Level(this)

    def load_level_backdrop_from_node(this, node, level):
        image = None
        color = None
        center = None
        gradientStart = None
        gradientEnd = None
        gradientSize = None

        for child in get_elements(node):
            if (child.tagName == "image"):
                image = get_value(child)
            elif (child.tagName == "below-color"):
                color = get_value(child)
            elif (child.tagName == "speed"):
                speed = float(get_value(child))
            elif (child.tagName == "gradient-size"):
                gradientSize = int(get_value(child))
            elif (child.tagName == "gradient-start-color"):
                gradientStart = parse_color(get_value(child))
            elif (child.tagName == "gradient-end-color"):
                gradientEnd = parse_color(get_value(child))
            elif (child.tagName == "center"):
                center = parse_vector(get_value(child), ftype=int)

        layer = layers.BackdropLayer(this.load_image(image), color)
        layer.speed = speed
        layer.center = center
        layer.gradientStartColor = gradientStart
        layer.gradientEndColor = gradientEnd
        layer.gradientSize = gradientSize
        level.backdrop = layer

    def load_level_darkness_from_node(this, node, level):
        level.darkness.set_size(int(get_value(node)))

    # Loads a subset of tiles in the order specified by tileNames
    def load_tiles(this, path, tileNames):
        dom = xml.dom.minidom.parse(this.fix_path(path))
        doc = dom.documentElement
        tileSet = TileSet()
        tileSet.imgSize = parse_vector(doc.attributes["size"].value, int, "x")
        tileSet.pitch = parse_vector(doc.attributes["pitch"].value, int, ",")
        # Calculate the actual tile size (minus the part that goes "into"
        # the screen).
        (w, h) = tileSet.imgSize
        w -= tileSet.pitch[0]
        h -= tileSet.pitch[1]
        tileSet.tileSize = (w, h)
        # Figure out the mapping from tile name to index
        tileIndices = {}
        for n in xrange(len(tileNames)):
            tileIndices[tileNames[n]] = n
        # Compile a list of tiles used by this level
        tiles = []
        for child in doc.childNodes:
            if (child.nodeType != child.ELEMENT_NODE):
                continue
            if (child.tagName == "tile"):
                # See if we really need to load this tile
                if (get_attr(child, "name") in tileIndices):
                    tile = this.load_tile_from_node(child, tileSet)
                    tiles.append(tile)
        # Now sort the tiles in the desired order (given by tileNames)
        def by_pos(t1, t2):
            p1 = tileIndices[t1.name]
            p2 = tileIndices[t2.name]
            return cmp(p1, p2)
        tiles.sort(by_pos)
        for tile in tiles:
            tileSet.add_tile(tile)
        return tileSet

    # Loads a single tile from an XML node
    def load_tile_from_node(this, node, tileSet):
        hasFront = False
        hasFullFront = False
        surf = None
        tile = Tile(tileSet)
        tile.name = get_attr(node, "name")
        tile.isBlank = (tile.name == "nothing")
        for child in node.childNodes:
            if (child.nodeType != child.ELEMENT_NODE):
                continue

            if (child.tagName == "img"):
                tileImg = this.load_tile_image_from_node(
                    child, size=tileSet.imgSize)
                tile.tileImages.append(tileImg)

            elif (child.tagName == "front"):
                hasFront = parse_bool(get_value(child))
            elif (child.tagName == "fullfront"):
                hasFullFront = parse_bool(get_value(child))
            #elif (child.tagName == "below"):
            #    tile.belowSurf = this.load_image_from_node(child, size=size)
            elif (child.tagName == "solid"):
                tile.solid = this.load_image(get_attr(child, "src"))
        if (hasFront):
            tile.create_front_images(hasFullFront)
        return tile

    # TODO - break this into separate functions and fix XML
    #
    # -load_image_from_node
    # -load_tile_image_from_node
    #
    def load_tile_image_from_node(this, node, size=None, alpha=True):
        # Load the image
        img = this.load_image(get_attr(node, "src"), alpha=alpha)
        # Get the optional image offset
        try:
            offset = get_attr(node, "offset")
        except KeyError:
            offset = (0, 0)
        else:
            (x, y) = offset.split(",")
            offset = (int(x), int(y))
        if (size):
            # Crop the image to the right size
            tmp = pygame.Surface(size)
            if (alpha): 
                tmp = tmp.convert_alpha()
                tmp.fill((0,0,0,0))
            tmp.blit(img, offset)
            img = tmp
        tile = TileImage(img)
        # Check if the tile frequency was specified
        try:
            freq = get_attr(node, "frequency")
        except:
            pass
        else:
            tile.frequency = float(freq)
        return tile

# Create a default loader object
gLoader = Loader()

