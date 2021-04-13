# scene.py
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
import sys
import pygame
import math
import random

from layers import DarknessLayer
import utils
import pygapp
from pygapp.dispatcher import Dispatcher

#############
# Constants #
#############

DIRECTIONS = ("east", "southeast", "south", "southwest", "west",
              "northwest", "north", "northeast")
DEPTH_SCENE_TOP = sys.maxint
DEPTH_SCENE_BOTTOM = -sys.maxint

EXTRA_DEPTH_OFFSET = 5

# The acceleration due to gravity (pixels/s/s)
GRAVITY = 1600

MAX_FALL_SPEED = 600

MAX_SNAP_DIST = 10

###########
# Classes #
###########

class Object (pygame.sprite.Sprite, Dispatcher):
    # The appearance of this object (if any)
    app = None
    # The image currently being displayed
    image = None
    # The position of this object on the screen
    rect = None
    # The position of the object within the grid
    _pos = None
    # The level this object belongs to
    level = None
    # The grid the object belongs to
    grid = None
    name = None
    depth = 0
    # How long the object sticks around before expiring
    expires = -1
    # How long the object has been around
    lifetime = 0
    # When true, render this object as if it were in the "midground" layer
    ignoreSceneDepth = False
    # The velocity of the object
    vel_x = 0
    vel_y = 0
    # Whether this object is subject to gravity
    _gravity = True
    # Whether to draw a glowing border around the rendered object
    drawSelected = False
    # Whether to render this object with a drop shadow
    renderShadow = False
    # The state machine controlling this object (optional)
    stateMachine = None

    def __init__(this, appf=None, image=None):
        pygame.sprite.Sprite.__init__(this)
        if (appf):
            app = appf.create_instance()
            this.app = app
            this.image = app.get_frame()
        if (image):
            this.image = image
        this.rect = pygame.Rect(0,0,0,0)
        this.pos = (0, 0)
        this.rotation = 0

    # Accessor and modifier for pos property
    @apply
    def pos():
        def fget(this):
            return this._pos
        def fset(this, pos):
            this._pos = pos
        return property(fget, fset)

    # Set the object's position in grid coordinates
    @apply
    def gridPos():
        def fset(this, newpos, offset=(0,0)):
            (w, h) = this.level.tileSet.tileSize
            this.pos = (newpos[0]*w+w/2+offset[0], 
                        newpos[1]*h+offset[1])
        def fget(this):
            (w, h) = this.level.tileSet.tileSize
            return (int(this.pos[0])/w, int(this.pos[1])/h)
        return property(fget, fset)

    def is_action_done(this):
        return this.app.is_action_done()

    # Determines if this object is currently supported by the ground
    @property
    def supported(this):
        if (not this.level): return False
        return this.level.get_solid_at((this.pos[0],
                                        this.pos[1]+1))

    @apply
    def gravity():
        def fget(this):
            if (this.stateMachine and hasattr(this.stateMachine, "gravity")):
                return this.stateMachine.gravity
            return this._gravity
        def fset(this, b):
            this._gravity = b
        return property(fget, fset)

    def snap_to_ground(this, maxstep):
        dest = (this.pos[0], this.pos[1]+maxstep)
        ret = this.level.check_path(this.pos, dest)
        if (ret == dest):
            # No ground nearby - don't snap
            return False
        elif (ret != this.pos):
            # Otherwise, we hit the ground and need to change position
            this.pos = ret
            this.dispatch("collision-ground")
        return True

    def set_fsm(this, stateMachine):
        this.stateMachine = stateMachine
        stateMachine.obj = this

    def get_facing(this):
        if (this.app.direction == "east"): 
            return 1
        return -1

    def set_app(this, name):
        appf = this.level.loader.load_appearance_factory(name)
        this.app = appf.create_instance()

    def render_shadow(this, dest, destpos):
        (x, y) = destpos
        # Create the base shadow image. We want it to be based on the
        # character's current image but a little larger (implying a light
        # source from below).
        shadow = utils.set_color(this.image, (0,0,0,150))
        # Enlarge the shadow a bit
        scale = 1.15
        shadow = pygame.transform.scale(
            shadow, (shadow.get_width(), 
                     int(shadow.get_height()*scale)))
        # Blur the shadow a little
        shadow = utils.blur_surf(shadow, 1)
        # The shadow will be rendered to the left of the character's
        # position, since that is how scene depth is rendered - up and
        # to the left.
        dh = shadow.get_height()-this.image.get_height()
        (xp, yp) = (8, dh+3)
        tileSet = this.level.tileSet

        # Now here's the tricky part. We don't want the shadow to be
        # cast on the backdrop image, but only on the background and
        # midground grids. So, those grids are rendered into a separate
        # buffer, then multiply that buffer's alpha channel by the 
        # shadow's alpha channel to appropriately clip the shadow.
        tmp = pygame.Surface(shadow.get_size()).convert_alpha()
        tmp.fill((0,0,0,0))
        (centerx, centery) = this.level.midground.get_centerline_offset()
        centery += EXTRA_DEPTH_OFFSET

        # Render the background as it would appear under the shadow's image
        this.level.background.render(
            tmp, (0, 0),
            tmp.get_rect().move(this.rect.left+centerx-xp, 
                                this.rect.top+centery-yp), skipObjects=True)

        # Do the same for the midground grid.
        this.level.midground.render(
            tmp, (0, 0),
            tmp.get_rect().move(this.rect.left+centerx-xp,
                                this.rect.top+centery-yp), skipObjects=True)

        # Multiply the alpha channels, effectivly clipping the image
        utils.adjust_alpha(shadow, tmp)
        # Now blit the shadow
        dest.blit(shadow, (x-xp, y-yp))

    def render(this, dest, pos):
        if (this.image):
            if (this.drawSelected):
                # Render a glowing border
                color = (int(utils.oscillate(100, 170, 5)), 0, 0)
                utils.render_border(dest, pos, this.image, color)
            if (this.renderShadow):
                this.render_shadow(dest, pos)
            dest.blit(this.image, pos)

    def update (this, dt):
        if (this.stateMachine):
            this.stateMachine.update()
        if (this.app):
            # Update the appearance state (ie animation), and the image
            fnum = int(this.app.frame)
            this.app.step(dt)
            this.image = this.app.get_frame()
            if (this.rotation != 0):
                this.image = pygame.transform.rotozoom(
                    this.image, this.rotation, 1)
            # Handle various appearance-related events (such as footsteps), but
            # we only check this when the frame number changes.
            if (fnum != int(this.app.frame)):
                for name in this.app.get_triggers():
                    this.handle_trigger(name)
        this.update_pos(dt)
        this.update_screen_rect()
        this.lifetime += dt
        if (this.expires >= 0):
            this.expires -= dt
            if (this.expires < 0):
                this.remove_self()

    # Update the region of the grid this object occupies
    def update_screen_rect(this):
        (x, y) = this.pos
        if (this.app):
            (xp, yp) = this.app.get_offset()
            x -= xp
            y -= yp
        elif (this.image):
            x -= this.image.get_width()/2
            y -= this.image.get_height()/2
        this.rect.topleft = (x, y)
        if (this.image):
            this.rect.size = this.image.get_size()

    def handle_trigger(this, name):
        pass

    def get_opposite_dir(this):
        # TODO - fix this for other directions
        if (this.app.direction == "east"):
            return "west"
        return "east"

    def set_pos(this, pos):
        this.pos = pos

    def move(this, pos):
        this.set_pos((this.pos[0]+pos[0],
                      this.pos[1]+pos[1]))

    # Determines if this object has fallen off the bottom of the scene
    def fell_off_bottom(this):
        (w, h) = this.level.tileSet.tileSize
        return (this.pos[1]/h > this.level.midground.height)

    def remove_self(this):
        g = this.grid
        this.grid.remove(this)
        this.dispatch("removed", g)

    def update_pos(this, dt):
        if (not this.level):
            return
        if (this.gravity and not this.supported):
            # Handle gravity. If the ground is only a few pixels away,
            # warp the character onto the ground (looks better when
            # walking down inclines)
            if (not this.snap_to_ground(MAX_SNAP_DIST)):
                # Start falling
                this.vel_y += dt*GRAVITY
                this.vel_y = min(this.vel_y, MAX_FALL_SPEED)

        if (this.vel_x != 0 or this.vel_y != 0):
            # Calculate the new position and make sure there is a clear path
            target = (this.pos[0] + dt*this.vel_x, 
                      this.pos[1] + dt*this.vel_y)
            newpos = this.level.check_path(this.pos, target)
            assert(newpos != None)
            if (newpos != target):
                # Hit an obstacle along the path
                this.pos = newpos
                this.vel_x = 0
                this.vel_y = 0
            this.pos = newpos

    def set_action(this, act, direction=None, **args):
        if (direction):
            this.app.direction = direction
        this.app.set_action(act, **args)

class Creature(Object):
    def __init__(this, appf):
        Object.__init__(this, appf)
        # The appearance factory passed in shows the character animated 
        # facing "west" only (to the left). So here we create the "east"
        # animations by flipping them around.
        actions = {}
        for (name, act) in this.app.factory.actions.items():
            if (name.endswith("East")):
                continue
            # Check if there is a special action that defines what the
            # east facing animation looks like.
            eastAction = this.app.factory.actions.get(name+"East", None)
            if (eastAction):
                act.animations["east"] = eastAction.animations["south"]
            else:
                # Create the "east" animations by flipping the west facing ones
                anim = act.animations["west"].create_flipped()
                act.animations["east"] = anim
            actions[name] = act
        this.app.factory.actions = actions

# An image of a tile
class TileImage:
    # The tile image
    surf = None
    # The front image of the tile
    frontSurf = None
    # How frequently this tile image gets used. To get the probability of
    # occurance take this frequency and divide by the sum of all the other
    # tile image frequencies.
    frequency = 1

    def __init__(this, surf):
        this.surf = surf

    def create_front_image(this, w, h):
        # Grab the subsurface of the tile that is "in front"
        x = this.surf.get_width()-w
        y = this.surf.get_height()-h
        this.frontSurf = this.surf.subsurface((x, y), (w, h))

    # Returns a darkened version of this tile image
    def create_dark_image(this, amount):
        tileImage = TileImage(utils.darken_surf(this.surf, amount))
        if (this.frontSurf):
            tileImage.create_front_image(*this.frontSurf.get_size())
        return tileImage


# A tile rendered in a grid
class Tile:
    # The name of the tile
    name = None
    ## The tile image
    #surf = None
    ## The tile image as seen from below
    #belowSurf = None
    # The image describing the solid region (black pixels)
    solid = None
    ## The front image of the tile
    #frontSurf = None
    # The set of possible images for this tile (TileImage instances)
    tileImages = None
    # The tile set this tile belongs to (TileSet instance)
    tileSet = None
    # Whether this is the blank tile (eg does not get rendered)
    isBlank = False

    def __init__(this, tileSet):
        this.tileImages = []
        this.tileSet = tileSet

    # Creates the "front" surfaces of the various tile images
    def create_front_images(this, full=False):
        if (full):
            # The "full front" extends all the way to the top
            h = this.tileSet.imgSize[1]
        else:
            # Take only a piece of the tile
            h = this.tileSet.tileSize[1]
        for tileImage in this.tileImages:
            tileImage.create_front_image(this.tileSet.tileSize[0], h)

    # Creates a darkened version of this tile
    def create_dark_tile(this, amount):
        tile = Tile(this.tileSet)
        tile.isBlank = this.isBlank
        tile.solid = this.solid
        tile.name = this.name
        for tileImage in this.tileImages:
            tile.tileImages.append(tileImage.create_dark_image(amount))
        return tile

# A collection of grid tiles
class TileSet:
    # The tiles
    tiles = None
    # The same set of tiles hashed by name
    tilesByName = None
    # The width and height of each tile image
    imgSize = None
    # The slope (width and height) of the tile as it moves into the screen
    pitch = 0
    # The size of the front face of a tile
    tileSize = None

    def __init__(this):
        this.tiles = []
        this.tilesByName = {}

    def add_tile(this, tile):
        this.tiles.append(tile)
        this.tilesByName[tile.name] = tile

    # Creates a darkened tile set
    def create_dark_set(this, amount):
        tileSet = TileSet()
        tileSet.imgSize = this.imgSize
        tileSet.pitch = this.pitch
        tileSet.tileSize = this.tileSize
        for tile in this.tiles:
            tileSet.tiles.append(tile.create_dark_tile(amount))
        return tileSet

# A grid of tiles
class Grid(pygapp.Grid):
    # The actual 2D array of tiles (index into the list of tiles)
    tileGrid = None
    # The grid of tile images (TileImage instance). This is what actually
    # gets rendered to the screen.
    imageGrid = None
    # The objects that appear on this grid
    objects = None
    # Whether to render this grid with the darkened tile set
    darkTiles = False
    # Draws grid lines for debug purposes
    drawGridLines = False

    def __init__(this, level, cells):
        pygapp.Grid.__init__(this, level, cells)
        this.objects = pygame.sprite.RenderUpdates()
    
    # Randomly configures up the tile image grid
    def create_tile_image_grid(this):
        # Allocate space for the grid
        this.imageGrid = []
        for x in xrange(this.width):
            this.imageGrid.append([0,]*this.height)
        # Now we want the selection of tile images to be random, but 
        # be based on the level itself. That is, when the same level is
        # selected, the same image choices should be made. Since we don't
        # want each grid in the scene to make the same choices, the depth
        # offset is also added to the seed number.
        state = random.getstate()
        random.seed(hash(this.level.name)+this.depth)
        for x in xrange(this.width):
            for y in xrange(this.height):
                # Make a "weighted choice" based on the frequency of the
                # various images for this tile.
                tile = this.get_tileset().tiles[this.tileGrid[x][y]]
                choices = range(len(tile.tileImages))
                total = sum([img.frequency for img in tile.tileImages])
                freq = [img.frequency/float(total) for img in tile.tileImages]
                this.imageGrid[x][y] = utils.wchoice(choices, freq)
        random.setstate(state)

    # Returns the tile at the given position. This function also returns 
    # the (x, y) offset into the tile.
    def get_tile_at(this, (x, y)):
        x = int(x)
        y = int(y)
        (w, h) = this.level.tileSet.tileSize
        tx = x/w
        ty = y/h
        x = x % w
        y = y % h
        try:
            i = this.tileGrid[tx][ty]
        except IndexError:
            return (None, x, y)
        return (this.level.tileSet.tiles[i], x, y)

    # Render the grid at the given location
    # * front = whether to render the fronts of the tiles separately (allows
    #   for objects to appear behind the tiles).
    def render(this, dest, (x, y), viewpos, front=False, skipObjects=False):
        (pitchx, pitchy) = this.level.tileSet.pitch
        (sizex, sizey) = this.level.tileSet.imgSize
        dest_rect = dest.get_rect()

        #(pw, ph) = this.level.tileSet.pitch
        depthOffsetX = this.depth*(pitchx-6)
        depthOffsetY = this.depth*pitchy
        (centerx, centery) = this.get_centerline_offset()

        # Construct a rectangle that surrounds all visible objects
        # TODO - this is a hack
        if (this.depth > 0):
            visible = viewpos.inflate(
                (2*depthOffsetX, 0)).move((-depthOffsetX, 0))
        else:
            visible = viewpos

        x += depthOffsetX
        y += depthOffsetY

        x -= viewpos.left
        y -= viewpos.top

        # Figure out what portion of the grid to render
        y1 = viewpos.top/this.level.tileSet.tileSize[1]-1
        y2 = viewpos.bottom/this.level.tileSet.tileSize[1]+1
        x1 = viewpos.left/this.level.tileSet.tileSize[0]-1
        x2 = viewpos.right/this.level.tileSet.tileSize[0]+1

        x1 = utils.clamp(x1, 0, this.width-1)
        x2 = utils.clamp(x2, 0, this.width-1)

        tileSet = this.get_tileset()

        # Render the tiles of the grid
        for ty in xrange(y2, y1-1, -1):
            for tx in xrange(x2, x1-1, -1):
                if (ty < 0): 
                    continue
                #(tile, tileImage) = this.get_tile_at_grid(tx, ty)
                # Get the tile and the image associated with the current cell
                ty = min(ty, this.height-1)
                tile = tileSet.tiles[this.tileGrid[tx][ty]]

                if (not tile.isBlank):
                    tileImage = tile.tileImages[this.imageGrid[tx][ty]]
                    xp = x + tx*(sizex-pitchx)
                    yp = y + ty*(sizey-pitchy)
                    dest.blit(tileImage.surf, (xp, yp))

        if (not skipObjects):
            # Now render the objects that occupy this grid, from back to front
            def by_depth(obj1, obj2):
                return cmp(obj1.depth, obj2.depth)
            for obj in sorted(this.objects, by_depth):
                # Skip the object if it's not visible
                #if (not visible.colliderect(obj.rect)):
                #    continue
                xp = obj.rect.x + x + centerx*(1+obj.depth*2)
                yp = obj.rect.y + y + centery*(1+obj.depth*2)+EXTRA_DEPTH_OFFSET
                if (obj.ignoreSceneDepth):
                    xp -= depthOffsetX
                    yp -= depthOffsetY
                obj.render(dest, (xp, yp))
        if (front):
            # Render the front faces of all the tiles
            for ty in xrange(y2, y1-1, -1):
                for tx in xrange(x2, x1-1, -1):
                    if (ty < 0): 
                        continue
                    #(tile, tileImage) = this.get_tile_at_grid(tx, ty)
                    # Get the tile and the image
                    ty = min(ty, this.height-1)
                    tile = tileSet.tiles[this.tileGrid[tx][ty]]

                    if (not tile.isBlank):
                        tileImage = tile.tileImages[this.imageGrid[tx][ty]]
                        frontSurf = tileImage.frontSurf
                        if (frontSurf):
                            (w, h) = frontSurf.get_size()
                            xp = x + tx*(sizex-pitchx)+sizex-w
                            yp = y + ty*(sizey-pitchy)+sizey-h
                            r = dest.blit(frontSurf, (xp, yp))

        if (this.drawGridLines and this.depth == 0):
            # Draw in the grid with lines
            for ty in xrange(y2, y1-1, -1):
                yp = y + ty*(sizey-pitchy)
                pygame.draw.line(dest, (100,100,0), 
                                 (0, yp+pitchy), 
                                 (dest.get_width(), yp+pitchy), 2)
            # Draw the vertical lines
            for tx in xrange(x2, x1-1, -1):
                xp = x + tx*(sizex-pitchx)
                pygame.draw.line(dest, (100,100,0), 
                                 (xp+pitchx, 0), 
                                 (xp+pitchx, dest.get_height()), 2)

    def check_path(this, (x1, y1), (x2, y2), step=1):
        last = (x1, y1)
        pos = (x1, y1)
        (dx, dy) = (x2-x1, y2-y1)
        length = math.sqrt(dx*dx+dy*dy)
        nsteps = length / float(step)
        if (nsteps > 0):
            dx /= nsteps
            dy /= nsteps
        for n in xrange(int(nsteps)):
            if (this.get_solid_at(pos)):
                assert(last)
                return last
            last = pos
            pos = (pos[0]+dx, pos[1]+dy)
        # Now test the end point, because we probably missed it above
        if (this.get_solid_at((x2, y2))):
            return last
        return (x2, y2)

    # Test whether or not the given position is "solid" or not
    def get_solid_at(this, pos):
        # You can imagine the solid map as being described on an image that
        # is a cross section of the level.
        (tile, x, y) = this.get_tile_at(pos)
        if (not tile):
            return False
        col = tile.solid.get_at((x, y))
        return (col[0:3] == (0,0,0))

    # Trace a path along the horizontal until we hit a solid tile
    def trace_path_to_solid(this, start, xdir, max_dist):
        (x, y) = start
        dist = 0
        while dist < max_dist:
            if (this.get_solid_at((x + xdir*dist, y))):
                break
            dist += 10
        return (x + xdir*dist, y)

    def update(this, dt):
        this.objects.update(dt)

    def add(this, obj):
        obj.level = this.level
        obj.grid = this
        this.objects.add(obj)

    def remove(this, obj):
        obj.level = None
        obj.grid = None
        this.objects.remove(obj)

    # Returns the tileset used by this grid
    def get_tileset(this):
        if (this.darkTiles):
            return this.level.darkTileSet
        return this.level.tileSet

    # Returns the pixel offset of the imaginary centerline that runs
    # through the middle (measured "into" the screen) of the grid.
    def get_centerline_offset(this):
        (pitchx, pitchy) = this.level.tileSet.pitch
        return (pitchx/2, pitchy/2)

class Level(pygapp.Level):
    # The tile set to use
    tileSet = None
    # A darkened version of the same tile set
    darkTileSet = None
    # An alpha surface used to darken the scene
    dark = None
    # The background layer
    backdrop = None
    # The layer of dark fog at the top and bottom of the level
    darkness = None
    # The foreground grid of cells
    foreground = None
    # The background grid of cells
    background = None
    # The midground (ie where the player walks) grid of cells
    midground = None

    def __init__(this, loader):
        pygapp.Level.__init__(this, loader)
        this.darkness = DarknessLayer()

    # Adds the object to the desired grid, specified by the depth
    def add_to_grid(this, obj, depth):
        i = this.grids.index(this.midground)
        n = int(round(depth))
        this.grids[i + n].add(obj)
        obj.depth = depth - n
#        print obj.app.factory.name, n, obj.depth

    def set_tiles(this, path):
        tileSet = this.loader.load_tiles(path, this.tileMapping)
        this.tileSet = tileSet
        this.darkTileSet = this.tileSet.create_dark_set(100)

    def render(this, dest, destpos, viewpos):
        # Render the layers
        this.viewpos = viewpos
        if (this.backdrop):
            this.backdrop.render(dest, destpos, viewpos)
        for grid in this.grids:
            front = (grid != this.grids[0])
            grid.render(dest, destpos, viewpos, front=front)
        # Render the top and bottom "shadow"
        if (this.darkness):
            this.darkness.render(dest, destpos, viewpos)

    def get_solid_at(this, pos):
        return this.midground.get_solid_at(pos)

    def check_path(this, src, dest, *args, **kwargs):
        return this.midground.check_path(src, dest, *args, **kwargs)

    def get_tile_at(this, pos):
        return this.midground.get_tile_at(pos)

    def update(this, dt):
        for grid in this.grids:
            grid.update(dt)

    def setup_tile_grids(this):
        for grid in this.grids:
            grid.create_tile_image_grid()

    def set_grids(this, grids):
        pygapp.Level.set_grids(this, grids)
        this.foreground = this.grids[2]
        this.midground = this.grids[1]
        this.background = this.grids[0]
        # The background grid gets rendered using the dark tile set
        this.background.darkTiles = True

