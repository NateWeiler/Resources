# makelevel.py
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

import Blender
from Blender import *
from Blender.Scene import Render
from Blender.Mathutils import *

import traceback
import sys
import os
import math

#############
# Constants #
#############

LEVEL_LAYER = 0x01
TILES_LAYER = 0x02

OUTDIR = "output"
OUTFILE = "level.xml"

#############
# Functions #
#############

# Read some parameters from the named text buffer
def read_buf_params(name):
    try:
        buf = Text.Get(name)
    except:
        return {}
    lst = {}
    for line in buf.asLines():
        # Strip out comments
        try:
            i = line.index("#")
        except ValueError:
            pass
        else:
            line = line[0:i].strip()
        try:
            i = line.index(":")
        except ValueError:
            pass
        else:
            key = line[0:i]
            value = line[i+1:]
            lst[key.strip()] = value.strip()
    return lst

# Write out the list of parameters as an XML node
def write_params(fd, lst, tag):
    if (lst):
        fd.write("\t<%s>\n" % tag)
        for (key, value) in lst.items():
            fd.write("\t\t<%s>%s</%s>\n" % (key, lst[key], key))
        fd.write("\t</%s>\n" % tag)

def build_node(obj):
    try:
        name = obj.getProperty("name").getData()
    except:
        return None
    (row, col, depth) = blender_to_scene_pos(obj)

    node = Node()
    node.name = name
    node.depth = depth
    node.pos = (col, row)
    for prop in obj.getAllProperties():
        if (prop.name != "name"):
            node.properties[prop.name] = prop.getData()
    return node

def blender_to_scene_pos(obj):
    (x, y, z) = obj.getLocation()
    depth = -y/Settings.spacingY
    row = z/Settings.spacingZ
    col = (x-Settings.spacingYX*depth)/Settings.spacingX
    return (row, col, depth)

###########
# Classes #
###########

class Settings(object):
    spacingX = 1.0
    spacingY = 1.5
    spacingZ = 1.0
    spacingYX = 0.5

class TileType(object):
    name = None
    dataBlockName = None

class Tile(object):
    tileType = None
    row = 0
    col = 0

class Node(object):
    pos = None
    name = None
    properties = None

    def __init__(this):
        this.properties = {}

########
# Main #
########

def main():
    # Find the tile templates
    scn = Scene.GetCurrent()
    tileTypes = []
    tileTypesByName = {}
    # Add the "nothing" tile type
    nothing = TileType()
    nothing.name = "nothing"
    tileTypes.append(nothing)

    # Read in the level parameters
    levelParams = {}
    params = read_buf_params("def")
    for (key, value) in params.items():
        if (key.startswith("spacing-")):
            # This is actually a grid spacing parameter
            if (key == "spacing-x"):
                Settings.spacingX = float(value)
            elif (key == "spacing-y"):
                Settings.spacingY = float(value)
            elif (key == "spacing-z"):
                Settings.spacingZ = float(value)
            elif (key == "spacing-yx"):
                Settings.spacingYX = float(value)
            else:
                raise Exception("Invalid grid spacing parameter: %s" % key)
        else:
            levelParams[key] = value

    # Now find all the tiles in this level
    for obj in scn.objects:
        if (obj.Layer & TILES_LAYER):
            tileType = TileType()
            tileType.name = obj.name
            tileType.dataBlockName = obj.getData().name
            tileTypes.append(tileType)

    # Store the tile types by name for faster lookup
    for tileType in tileTypes:
        tileTypesByName[tileType.dataBlockName] = tileType

    minCol = minRow = sys.maxint
    maxCol = maxRow = -sys.maxint
    tilesByDepth = {}
    nodes = []
    for obj in scn.objects:
        if (not obj.Layer & LEVEL_LAYER):
            continue

        # Try to interpret the object as a "data node"
        node = build_node(obj)
        if (node):
            nodes.append(node)

        elif (obj.getData()):
            # Figure out the tile type (based on the datablock name)
            try:
                tileType = tileTypesByName[obj.getData().name]
            except KeyError:
                # Not actually a tile object
                continue
            # Calculate the grid location of this tile
            (row, col, depth) = blender_to_scene_pos(obj)
            row = int(round(row))
            col = int(round(col))
            depth = int(round(depth))
            # ...
            if (not depth in tilesByDepth):
                tilesByDepth[depth] = []
            # Save the tile for output later
            tile = Tile()
            tile.tileType = tileType
            tile.row = row
            tile.col = col
            tilesByDepth[depth].append(tile)
            minCol = min(minCol, col)
            maxCol = max(maxCol, col)
            minRow = min(minRow, row)
            maxRow = max(maxRow, row)

    rows = maxRow-minRow+1
    cols = maxCol-minCol+1

    # Make sure the output directory exists
    try:
        os.mkdir(OUTDIR)
    except:
        pass

    fd = open(os.path.join(OUTDIR, OUTFILE), "w")
    fd.write("<?xml version='1.0' encoding='ISO-8859-1'?>\n")
    fd.write("<level>\n")

    for (key, value) in levelParams.items():
        fd.write("\t<%s>%s</%s>\n" % (key, value, key))

    # Write out the backdrop parameters
    write_params(fd, read_buf_params("backdrop"), "backdrop")

    # Write out the tiles used in this level
    fd.write("\t<tiles>\n")
    for tileType in tileTypes:
        fd.write("\t\t<tile name=\"%s\"/>\n" % tileType.name)
    fd.write("\t</tiles>\n")

    # Write out the data nodes too
    fd.write("\t<nodes>\n")
    for node in nodes:
        fd.write("\t\t<node name=\"%s\">\n" % node.name)
        fd.write("\t\t\t<pos>%0.2f, %0.2f</pos>\n" % (
                node.pos[0]-minCol, rows-(node.pos[1]-minRow)-1))
        fd.write("\t\t\t<depth>%0.2f</depth>\n" % node.depth)
        for (key, value) in node.properties.items():
            fd.write("\t\t\t<%s>%s</%s>\n" % (key, value, key))
        fd.write("\t\t</node>\n")
    fd.write("\t</nodes>\n")

    # Write out the grids
    for depth in sorted(tilesByDepth.keys()):
        grid = []
        for row in xrange(rows):
            grid.append([0]*cols)

        fd.write("\t<grid depth=\"%d\">\n" % depth)
        # Place each tile in the grid
        for tile in tilesByDepth[depth]:
            row = tile.row-minRow
            col = tile.col-minCol
            assert(row >= 0 and col >= 0)
            grid[row][col] = tileTypes.index(tile.tileType)

        for row in reversed(xrange(rows)):
            fd.write("\t")
            for col in xrange(cols):
                fd.write("%d " % grid[row][col])
            fd.write("\n")
        fd.write("\t</grid>\n")
    fd.write("</level>\n")

if (__name__ == "__main__"):
    try:
        main()
    except:
        traceback.print_exc()
        sys.exit(1)

    sys.exit(0)

