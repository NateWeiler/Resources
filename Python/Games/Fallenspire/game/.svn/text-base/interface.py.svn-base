# interface.py - Graphical interface related code
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

import pygame

import os
import loader
import utils
from world import World

import pgu
from pgu import gui

#############
# Constants #
#############

# The maximum height of an item that can fit in a half-sized button
SMALL_ITEM_HEIGHT = 30

###########
# Classes #
###########

class Portrait(gui.Widget):
    class Meter(object):
        name = None
        color = None
        value = 0.7
        # The order in which this meter was added
        order = 0

    # The portrait background image
    back = None
    # The list of meters to render under the character portrait, hashed
    # by meter name.
    meters = None
    # The rendered complete portrait image
    image = None

    def __init__(this, charPath):
        this.back = GameInterface.add_shadow(loader.load_image("portrait.png"))

        this.portrait = loader.load_image(charPath)
        this.meters = {}

        gui.Widget.__init__(this, width=this.back.get_width(),
                            height=this.back.get_height())

    def add_meter(this, name, color):
        m = this.Meter()
        m.name = name
        m.color = pygame.Color(*color)
        m.order = len(this.meters)
        this.meters[name] = m

    def set_value(this, name, value):
        this.meters[name].value = value
        this.image = None

    def update_image(this):
        extra = 0
        this.image = pygame.Surface(
            (this.back.get_width()+2*extra,
             this.back.get_height())).convert_alpha()
        this.image.fill((0,0,0,0))
        # Render the portrait background
        this.image.blit(this.back, (extra, 0))
        # Render the portrait itself
        (pw, ph) = this.portrait.get_size()
        (bw, bh) = this.back.get_size()
        r = this.image.blit(this.portrait, (bw/2-pw/2+extra-1, 6))
        y = r.bottom-1
        # Now draw the meters below the portrait
        h = 9
        def by_order(m1, m2):
            return cmp(m1.order, m2.order)
        for m in sorted(this.meters.values(), by_order):
            dcolor = pygame.Color(m.color.r/2,
                                  m.color.g/2,
                                  m.color.b/2)
            this.image.fill(dcolor, (0, y, this.image.get_width(), h))
            this.image.fill(m.color, 
                            (0, y, int(m.value*this.image.get_width()), h-1))
            pygame.draw.line(this.image, (0,0,0), 
                             (0, y+h), (this.image.get_width(), y+h))
            y += h+1

    def paint(this, dest):
        if (not this.image):
            this.update_image()
        dest.blit(this.image, (0, 0))

    def update(this, dt):
        pass

class ButtonType(object):
    normal = None
    highlight = None
    pressed = None
    itemOffset = None

    def __init__(this, path, offset=(0,0)):
        img = loader.load_image(path)
        this.normal = GameInterface.add_shadow(img)

        img = utils.darken_surf(img, -30)
        this.highlight = GameInterface.add_shadow(img)
        this.pressed = img
        this.size = this.normal.get_size()
        # Create an image mask for blanking out the button
        this.blank = utils.set_color(this.normal, (255,255,255))
        utils.adjust_alpha(this.blank, 255*255)
        this.itemOffset = offset

# Responsible for rendering items found in the player's immediate inventory
class Inventory(gui.Container):
    # The list of items being displayed
    itemList = None
    buttons = None
    # How much extra space to add between buttons
    buttonSpacing = -2

    def __init__(this):
        gui.Container.__init__(this)

        this.itemList = []
        this.widgets = []

        this.normalButton = ButtonType("item-bg.png")
        this.topButton = ButtonType("item-bg-top.png", (0,-2))
        this.bottomButton = ButtonType("item-bg-bottom.png", (0,-2))

        btn = InventoryButton(this, "items/ring2.png", fullSize=False)
        this.add(btn)
        btn.set_button_type(this.topButton)

        btn = InventoryButton(this, "items/ring2.png", fullSize=False)
        this.add(btn)
        btn.set_button_type(this.topButton)

        btn = InventoryButton(this, "items/ruby.png", fullSize=False)
        this.add(btn)

        btn = InventoryButton(this, "items/marble.png", fullSize=False)
        this.add(btn)
        #btn.set_button_type(this.topButton)

        btn = InventoryButton(this, "items/amulet.png")
        this.add(btn)

        btn = InventoryButton(this, "items/knapsack.png")
        this.add(btn)

        btn = InventoryButton(this, "items/compass.png")
        this.add(btn)

        btn = InventoryButton(this, "items/icomarble.png")
        this.add(btn)

        btn = InventoryButton(this, "items/bottle.png")
        this.add(btn)

        this.auto_layout()

    def add(this, btn):
        btn.container = this
        this.widgets.append(btn)

    def auto_layout(this):
        xp = 0
        height = this.normalButton.normal.get_height()
        lastbtn = None
        for btn in this.widgets:
            if (btn.fullSize and 
                lastbtn and lastbtn.buttonType == this.topButton):
                # Skip over the last button
                xp = next_x

            next_x = xp + btn.rect.w + this.buttonSpacing - btn.RIGHT_SPACE
            if (btn.fullSize):
                # This button takes up an entire slot
                btn.rect.x = xp
                btn.rect.y = 0
                xp = next_x
            else:
                # This button takes up a half slot
                if (lastbtn and lastbtn.buttonType == this.topButton):
                    # The last button was a top piece, so add this half
                    # button as a bottom piece.
                    btn.set_button_type(this.bottomButton)
                    btn.rect.x = xp
                    btn.rect.y = height/2
                    xp = next_x
                else:
                    btn.set_button_type(this.topButton)
                    btn.rect.x = xp
                    btn.rect.y = 0

            lastbtn = btn

    def resize(this, width=None, height=None):
        return (700, this.normalButton.normal.get_height())

        #width = 0
        #height = 0
        xp = 0
        for btn in this.widgets:
            btn.rect.x = xp
            btn.rect.y = 0
            xp += btn.rect.w + this.buttonSpacing - btn.RIGHT_SPACE
            #height = max(height, btn.rect.h)
        xp += InventoryButton.RIGHT_SPACE
        return (700, this.normalButton.normal.get_height())

    # Setup the inventory to display the list of items
    def set_items(this, items):
        this.itemList = items


class GenericButton(gui.Widget):
    state = "normal"

    def event(this, ev):
        if (ev.type == gui.const.ENTER):
            this.state = "highlight"
            this.repaint()

        elif (ev.type == gui.const.EXIT):
            this.state = "normal"
            this.repaint()

        elif (ev.type == pygame.MOUSEBUTTONDOWN):
            this.state = "pressed"
            this.repaint()

        elif (ev.type == pygame.MOUSEBUTTONUP):
            if (this.is_hovering()):
                # The mouse is still over the button
                this.state = "highlight"
            else:
                this.state = "normal"
            this.repaint()

        elif ev.type == gui.const.FOCUS:
            this.repaint()

        elif ev.type == gui.const.BLUR:
            this.repaint()

    def paint(this, dest):
        pass

class InventoryButton(GenericButton):
    # The amount of space to add to the left of the item image
    LEFT_SPACE = 20
    # The amount of space to add to the right
    RIGHT_SPACE = 12
    # A reference to the Inventory instance
    inventory = None
    buttonType = None

    def __init__(this, inv, itemPath, fullSize=True):
        GenericButton.__init__(this)
        this.fullSize = fullSize
        this.inventory = inv
        this.itemPath = itemPath
        itemSurf = loader.load_image(itemPath)
        this.itemSurf = utils.add_shadow(itemSurf, (1, 0), alpha=150, blur=4)
        this.set_button_type(inv.normalButton)

    def set_button_type(this, buttonType):
        width = min(this.itemSurf.get_width()+
                    this.LEFT_SPACE+this.RIGHT_SPACE, 
                    buttonType.normal.get_width())
        height = buttonType.normal.get_height()

        this.style.width = width
        this.style.height = height
        this.rect.size = (width, height)

        this.buttonType = buttonType
        this._rect_border = this._rect_content = \
            pygame.Rect((0,0), this.rect.size)

    def paint(this, dest):
        # Use a different background image depending on the button state
        if (this.state == "normal"):
            bg = this.buttonType.normal
        elif (this.state == "highlight"):
            bg = this.buttonType.highlight
        else:
            bg = this.buttonType.pressed

        width = this.style.width
        height = this.style.height
        blank = this.buttonType.blank

        # Blank out the background
        dest.blit(blank, (0, 0), (0, 0, width/2, height))
        dest.blit(blank, (width/2, 0), 
                  (bg.get_width()-width/2, 0, width/2,height))

        if (this.state == "pressed"):
            xp = 2
        else:
            xp = 0

        # Draw the button
        dest.blit(bg, (xp, 0), (0, 0, width/2, height))
        dest.blit(bg, (width/2, 0), 
                  (bg.get_width()-width/2, 0, width/2, height))

        # Now draw the item on top of the button
        r = this.itemSurf.get_rect()
        r.center = (dest.get_width()/2 + (this.LEFT_SPACE-this.RIGHT_SPACE)/2,
                    dest.get_height()/2+3)
        r.move_ip(this.buttonType.itemOffset)
        if (this.state == "pressed"):
            r.x += 2
        dest.blit(this.itemSurf, r)


class DrawingArea(gui.Widget):
    def __init__(this, width, height):
        gui.Widget.__init__(this, width=width, height=height)
        this.imageBuffer = pygame.Surface((width, height))

    def paint(this, dest):
        # Paint whatever has been captured in the buffer
        dest.blit(this.imageBuffer, (0, 0))

    # Call this function to take a snapshot of whatever has been rendered
    # onto the display over this widget.
    def save_background(this):
        disp = pygame.display.get_surface()
        this.imageBuffer.blit(disp, this.get_abs_rect())


class GameInterface(gui.Desktop):
    menuAreaHeight = 100
    gameArea = None
    menuArea = None
    gameAreaWidget = None
    # The game engine
    engine = None
    done = False
    # Whether the last MOUSEMOTION event was in the menu area
    lastMotionInMenuArea = False

    def __init__(this):
        gui.Desktop.__init__(this)
        this.disp = pygame.display.get_surface()

        # Setup the 'game' area where the action takes place
        this.gameAreaWidget = DrawingArea(
            this.disp.get_width(),
            this.disp.get_height()-this.menuAreaHeight)
        # Setup the gui area
        this.menuArea = gui.Container(height=this.menuAreaHeight)

        tbl = gui.Table(height=this.disp.get_height())
        tbl.tr()
        tbl.td(this.gameAreaWidget)
        tbl.tr()
        tbl.td(this.menuArea)

        this.setup_menu()

        this.init(tbl, this.disp)
        this.gameArea = this.gameAreaWidget.get_abs_rect()

    def setup_menu(this):
        tbl = gui.Table(vpadding=5, hpadding=2)
        tbl.tr()

        #dlg = TestDialog()
        #def dialog_cb():
        #    dlg.open()

        #btn = gui.Button("Modal dialog", height=50)
        #btn.connect(gui.CLICK, dialog_cb)

        port = Portrait("wizard.png")
        port.add_meter("magic", (100,150,220))
        port.add_meter("stamina", (190,150,50))
        tbl.td(port)

        inv = Inventory()
        tbl.td(inv)
        this.menuArea.add(tbl, 0, 0)

        return

        # Add a button for pausing / resuming the game clock
        def pause_cb():
            return
            if (this.engine.clock.paused):
                this.engine.resume()
            else:
                this.engine.pause()

        btn = gui.Button("Pause/resume clock", height=50)
        btn.connect(gui.CLICK, pause_cb)
        tbl.td(btn)

        # Add a slider for adjusting the game clock speed
        tbl2 = gui.Table()

        timeLabel = gui.Label("Clock speed")

        tbl2.tr()
        tbl2.td(timeLabel)

        slider = gui.HSlider(value=23,min=0,max=100,size=20,height=16,width=120)

        def update_speed():
            return
            this.engine.clock.set_speed(slider.value/10.0)

        slider.connect(gui.CHANGE, update_speed)

        tbl2.tr()
        tbl2.td(slider)

        tbl.td(tbl2)

        this.menuArea.add(tbl, 0, 0)

    def open(this, dlg, pos=None):
        # Gray out the game area before showing the popup
        rect = this.gameArea
        dark = pygame.Surface(rect.size).convert_alpha()
        dark.fill((0,0,0,150))
        pygame.display.get_surface().blit(dark, rect)
        # Save whatever has been rendered to the 'game area' so we can
        # render it as a static image while the dialog is open.
        this.gameAreaWidget.save_background()
        # Pause the gameplay while the dialog is visible
        running = not(this.engine.clock.paused)
        this.engine.pause()
        gui.Desktop.open(this, dlg, pos)
        while (dlg.is_open()):
            for ev in pygame.event.get():
                this.event(ev)
            rects = this.update()
            if (rects):
                pygame.display.update(rects)
        if (running):
            # Resume gameplay
            this.engine.resume()

    # Turns a screen coordinate into a level position. Assumes the
    # player clicked on something in the 'midground' grid.
    def screen_to_level(this, pos):
        (x, y) = this.world.camera_to_level(pos)
        return (x-this.gameArea.x, y-this.gameArea.y)

    def handle_event(this, event):
        # Handle events
        if (event.type == pygame.QUIT or
            (event.type == pygame.KEYDOWN and
             event.key == pygame.K_ESCAPE)):
            this.done = True
        elif (event.type == pygame.KEYDOWN and
              event.key == pygame.K_1):
            print this.world.clock.get_fps()
        elif (event.type == pygame.KEYDOWN and
              event.key == pygame.K_r):
            # Reload the tile set
            this.level.set_tiles("tiles.xml")
            # Rebuild the tile grids, since the tile images (or their
            # distribution) may have changed.
            for grid in this.level.grids:
                grid.create_tile_image_grid()
        #elif (event.type == pygame.MOUSEBUTTONDOWN and 
        #      this.gameArea.collidepoint(event.pos)):
        #    target = this.screen_to_level(event.pos)
        #    spell = Spell(this.player, target)
        #    this.player.queue_spell(spell)
        #elif (hasattr(event, "pos") and 
        #      this.gameArea.collidepoint(event.pos)):
        #    pass
        else:
            if (event.type != pygame.KEYDOWN):
                this.event(event)

    def mainloop(this):

        this.world = World()
        this.world.setup()
        this.world.set_view_size(this.gameArea.size)

        this.done = False
        while not this.done:
            this.world.update()

            rect = this.gameArea
            this.disp.set_clip(rect)

            #updates = []
            #lst = this.render(this.disp, rect)
            this.world.render(this.gameArea)

            this.disp.set_clip()
            #pygame.display.flip()
            #pygame.display.update(rect)
            updates = [rect,]

            # Handle user input
            for event in pygame.event.get():
                this.handle_event(event)

            # Give pgu a chance to update the display
            lst = this.update()
            if (lst):
                updates += lst
            pygame.display.update(updates)
            #pygame.time.wait(5)

    @staticmethod
    def add_shadow(surf):
        return utils.add_shadow(surf, (2, 0), blur=0)

