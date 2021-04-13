# level.py
#
# Copyright (C) 2009, Peter Rogers
#
# This file is part of pygapp.
#
# This program is free software: you can redistribute it and/or modify
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
# Classes #
###########

# A node in the level, used to represent some object in the level
class Node(object):
    # The grid position of the node
    pos = None
    # The list of properties defined by the node
    properties = None

    def __init__(this):
        this.properties = {}

class Level(object):
    # The nodes in this level
    nodes = None
    # This is a list of map tiles used in this level
    tileMapping = None
    # The loader instance
    loader = None
    # The descriptive name of the level
    name = None
    # The list of grids
    grids = None

    def __init__(this, loader):
        this.loader = loader
        this.nodes = []
        this.tileMapping = []

    def add_node(this, node):
        this.nodes.append(node)

    def find_node(this, name):
        for node in this.nodes:
            if (node.name == name):
                return node
        return None

    # Sets the three level grids based on the given images
    def set_grids(this, lst):
        def by_depth(g1, g2):
            return cmp(g1.depth, g2.depth)
        this.grids = sorted(lst, by_depth)

        for grid in this.grids:
            assert(grid.width == this.grids[0].width and
                   grid.height == this.grids[0].height)

class Grid(object):
    # The level this grid belongs to
    level = None
    # The depth of the grid, relative to the "midground"
    depth = 0
    # The width and height of the grid
    width = 0
    height = 0

    def __init__(this, level, cells):
        this.level = level
        this.tileGrid = cells
        this.width = len(this.tileGrid)
        this.height = len(this.tileGrid[0])
