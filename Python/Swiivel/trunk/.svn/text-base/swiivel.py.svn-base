#! /usr/bin/env python
#

import math
import os.path;
import random;
import sys
import thread
import time

from wmd.Common import *
from wmd.Config import CFG
from wmd.EVDispatcher import EVDispatcher
from wmd.UI.UIManager import UIManager
from wmd.CommandMapper import CommandMapper
from wmd.Pointer import POManager
from wmd.Wiimote.WMManager import WMManager

from wmd.Wiimote.Input import ReportParser, WiimoteState

from Maps import map1

#import basic pygame modules
import pygame
from pygame.locals import *

#see if we can load more than standard BMP
if not pygame.image.get_extended():
    raise SystemExit, "Sorry, extended image module required"


#game constants
SCALE=1.0
SCALE=2.4
MAX_SHOTS      = 5      #most player bullets onscreen
ALIEN_ODDS     = 12000     #chances a new alien appears
BOMB_ODDS      = 10    #chances a new bomb will drop
ALIEN_RELOAD   = 12     #frames between new aliens
WIDTH          = 800 * SCALE;
HEIGHT         = 450 * SCALE;
SCREENRECT     = Rect(0, 0, WIDTH, HEIGHT)
SCORE          = 0
START_NUMBER   = 0

event_dispatcher = None;

players = {};
connected_wiimotes = {};

def load_image(file):
    "loads an image, prepares it for play"
    file = os.path.join('data', file)
    try:
        surface = pygame.image.load(file)
    except pygame.error:
        raise SystemExit, 'Could not load image "%s" %s'%(file, pygame.get_error())
    surface = pygame.transform.scale(surface,
                                     (surface.get_width() * SCALE, surface.get_height() * SCALE));
    return surface.convert()

def load_images(*files):
    imgs = []
    for file in files:
        imgs.append(load_image(file))
    return imgs


class dummysound:
    def play(self): pass

def load_sound(file):
    if not pygame.mixer: return dummysound()
    file = os.path.join('data', file)
    try:
        sound = pygame.mixer.Sound(file)
        return sound
    except pygame.error:
        print 'Warning, unable to load,', file
    return dummysound()



# each type of game object gets an init and an
# update function. the update function is called
# once per frame, and it is when each object should
# change it's current position and state. the Player
# object actually gets a "move" function instead of
# update, since it is passed extra information about
# the keyboard


class Player(pygame.sprite.Sprite):
    speed = 5 * SCALE
    bounce = 24
    gun_offset = -11
    images = []
    shoot_sound = load_sound('car_door.wav')
    shot_speed = 10;
    shot_bounces = 2;
    
    def __init__(self, position, team):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.images[team][0][0]
        self.rect = self.image.get_rect(left=position[0], top=position[1])
        self.reloading = 0
        self.origtop = self.rect.top
        self.cursor = [0,0]
        self.shots = pygame.sprite.Group()
        self.hDirection = self.vDirection = self.firing = 0;
        self.imageStep = 0;
        self.imageSet = 0;
        self.color = team;
        
    def update(self):
        if (self.hDirection != 0):
            if (self.vDirection != 0):
                if (self.vDirection == self.hDirection):
                    newImageSet = 3
                else:
                    newImageSet = 1
            else:
                newImageSet = 2
        elif self.vDirection != 0:
            newImageSet = 0
        else:
            newImageSet = self.imageSet
        myImages = self.images[self.color][newImageSet]

        self.image = myImages[self.imageStep % len(myImages)];
        
        if self.firing and not self.reloading and len(self.shots) < MAX_SHOTS:
            self.shots.add(Shot(self.gunpos(), self.turret_vector(),
                                self.shot_speed, self.shot_bounces, self));
            self.shoot_sound.play()
        elif not self.reloading and newImageSet == self.imageSet:
            dx = self.hDirection*self.speed;
            dy = self.vDirection*self.speed;
            if (dx != 0 or dy != 0):
                self.rect.move_ip(dx, 0);
                if (pygame.sprite.spritecollide(self, self.blocks, 0)):
                    self.rect.move_ip(-dx, 0);
                self.rect.move_ip(0,dy);
                if (pygame.sprite.spritecollide(self, self.blocks, 0)):
                    self.rect.move_ip(0, -dy);
                self.rect = self.rect.clamp(SCREENRECT)
                if (self.hDirection == 0):
                    self.imageStep -= self.vDirection
                else:
                    self.imageStep += self.hDirection
        self.reloading = self.firing
        self.imageSet = newImageSet
        
    def gunpos(self):
        return self.rect.center

    def drawcursor(self, surface):
        return pygame.draw.circle(
                   surface, [255,0,0], self.cursor, 5, 0).union(
               pygame.draw.aaline(
                   surface, [255,0,0], self.gunpos(), self.cursor))

    def turret_vector(self):
        dx = self.cursor[0] - self.rect.centerx;
        dy = self.cursor[1] - self.rect.centery;
        mag = math.sqrt(dx*dx + dy*dy)
        if (mag == 0) : return [0, 0]
        return [dx / mag, dy / mag]

class Block(pygame.sprite.Sprite):
    def __init__(self, coords):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = pygame.Surface([int(coords[2]* SCALE * 40), int(coords[3]* SCALE * 22.5)]);
        self.rect = self.image.fill(0x00aabbcc).move(
            int(coords[0] * SCALE * 40), int(coords[1] * 22.5 * SCALE));

class Alien(pygame.sprite.Sprite):
    speed = 5 * SCALE
    animcycle = 12
    images = []
    def __init__(self):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.images[0]
        self.rect = self.image.get_rect()
        self.facing = random.choice((-1,1)) * Alien.speed
        self.frame = 0
        if self.facing < 0:
            self.rect.right = SCREENRECT.right

    def update(self):
        self.rect.move_ip(self.facing, 0)
        if not SCREENRECT.contains(self.rect):
            self.facing = -self.facing;
            self.rect.top = self.rect.bottom + 1
            self.rect = self.rect.clamp(SCREENRECT)
        self.frame = self.frame + 1
        self.image = self.images[self.frame/self.animcycle%3]
        if not int(random.random() * BOMB_ODDS):
            Shot((self.rect.centerx, self.rect.y + 50),
                 [0, 1],
                 9,
                 0,
                 self);

    def drawcursor(self, surface):
        pass

class Explosion(pygame.sprite.Sprite):
    defaultlife = 12
    animcycle = 3
    images = []
    def __init__(self, actor):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.images[0]
        self.rect = self.image.get_rect(center=actor.rect.center)
        self.life = self.defaultlife

    def update(self):
        self.life = self.life - 1
        self.image = self.images[self.life/self.animcycle%2]
        if self.life <= 0: self.kill()


class Shot(pygame.sprite.Sprite):
    images = []
    immunity_secs = .2
    def __init__(self, pos, direction, speed, bounces, firer):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.speed = speed * SCALE
        self.image = self.images[0]
        self.rect = self.image.get_rect(center=pos)
        self.direction = direction
        self.bounces = bounces;
        self.firer = firer;
        self.cleared_firer = False;
        self.hitting_firer = True;
    def update(self):
        bouncing = False
        self.rect.move_ip(self.speed * self.direction[0], 0);
        if (pygame.sprite.spritecollide(self, self.blocks, 0)):
            self.direction[0] *= -1;
            self.rect.move_ip(self.speed * self.direction[0], 0);
            bouncing = True;
        self.rect.move_ip(0, self.speed * self.direction[1]);
        if (pygame.sprite.spritecollide(self, self.blocks, 0)):
            self.direction[1] *= -1;
            self.rect.move_ip(0, self.speed * self.direction[1]);
            bouncing = True;
        if (bouncing):
            self.bounces -= 1;
            if self.bounces == 0:
                self.kill()
        if (not SCREENRECT.contains(self.rect)):
            self.kill()
        if not self.hitting_firer:
            self.cleared_firer = True
        self.hitting_firer = False
        
    def bounce(self, rect):
        if (self.bounces > 0):
            self.bounces -= 1
            h_overlap = (self.rect.right - rect.left, rect.right - self.rect.left)[self.direction[0] < 0]
            v_overlap = (self.rect.bottom - rect.top, rect.bottom - self.rect.top)[self.direction[1] < 0]
            if (h_overlap >= v_overlap):
                self.direction[1] = -self.direction[1]
            if (h_overlap <= v_overlap):
                self.direction[0] = -self.direction[0]
        else:
            self.kill()
            
    def frag(self, tank):
        if (self.firer == tank) and not self.cleared_firer:
            self.hitting_firer = True
        else: 
            Shot.boom_sound.play()
            Explosion(tank)
            tank.kill()
            self.kill()
            #todo: scorekeeping

            
class Bomb(pygame.sprite.Sprite):
    speed = 9 * SCALE
    images = []
    def __init__(self, alien):
        pygame.sprite.Sprite.__init__(self, self.containers)
        self.image = self.images[0]
        self.rect = self.image.get_rect(midbottom=
                    alien.rect.move(0,50).midbottom)
        self.bounces = 0;
        
    def update(self):
        self.rect.move_ip(0, self.speed)
        if self.rect.bottom >= 470:
            Explosion(self)
            self.kill()


class Score(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.font = pygame.font.Font(None, 20)
        self.font.set_italic(1)
        self.color = Color('white')
        self.lastscore = -1
        self.update()
        self.rect = self.image.get_rect().move(10, 450)

    def update(self):
        if SCORE != self.lastscore:
            self.lastscore = SCORE
            msg = "Score: %d" % SCORE
            self.image = self.font.render(msg, 0, self.color)

def main(winstyle = 0):
    # Initialize pygame
    pygame.init()
    if pygame.mixer and not pygame.mixer.get_init():
        print 'Warning, no sound'
        pygame.mixer = None

    # Set the display mode
    winstyle = 0 # |FULLSCREEN
    bestdepth = pygame.display.mode_ok(SCREENRECT.size, winstyle, 32)
    screen = pygame.display.set_mode(SCREENRECT.size, winstyle, bestdepth)

    #Load images, assign to sprite classes
    #(do this before the classes are used, after screen setup)
    Player.images = [];
    for color in ("red","blue"):
        Player.images.append([]);
        for dir in ("n","ne","e","se"):
            Player.images[-1].append([]);
            for frame in (0, 1, 2):
                Player.images[-1][-1].append(load_image('tracks-%s-%s-%d.gif' % (color, dir, frame)))
    
    img = load_image('explosion1.gif')
    Explosion.images = [img, pygame.transform.flip(img, 1, 1)]
    Alien.images = load_images('alien1.gif', 'alien2.gif', 'alien3.gif')
    Bomb.images = [load_image('bomb.gif')]
    Shot.images = [load_image('pellet.gif')]
    
    #decorate the game window
    icon = pygame.transform.scale(Alien.images[0], (32, 32))
    pygame.display.set_icon(icon)
    pygame.display.set_caption('Pygame Aliens')
    #pygame.mouse.set_visible(0)

    #create the background, tile the bgd image
    bgdtile = load_image('wood_pole_color.png')
    background = pygame.Surface(SCREENRECT.size)
    for x in range(0, SCREENRECT.width, bgdtile.get_width()):
        for y in range(0, SCREENRECT.height, bgdtile.get_height()):
            background.blit(bgdtile, (x, y))
    screen.blit(background, (0,0))
    pygame.display.flip()

    #load the sound effects
    Shot.boom_sound = load_sound('boom.wav')

    if pygame.mixer:
        music = os.path.join('data', 'house_lo.wav')
        pygame.mixer.music.load(music)
        pygame.mixer.music.play(-1)

    # Initialize Game Groups
    tanks = pygame.sprite.Group()
    shots = pygame.sprite.Group()
    blocks = pygame.sprite.Group()
    all = pygame.sprite.RenderUpdates()
    Player.blocks = Shot.blocks = blocks

    #assign default groups to each sprite class
    Player.containers = tanks, all
    Alien.containers = tanks, all
    Shot.containers = shots, all
    Bomb.containers = shots, all
    Block.containers = blocks, all
    Explosion.containers = all
    #Score.containers = all

    # make blocks from map
    for coords in map1['blocks']:
        Block(coords)

    #Create Some Starting Values
    global score
    kills = 0
    # clock = pygame.time.Clock()
    # NB: it seems that clock.tick does not let other threads run?
    #initialize our starting sprites
    global SCORE
    

    #if pygame.font:
        #all.add(Score())

    # local (non-wiimote) player thread
    p = Player(next_start(), 0);
    players[0] = p;
    thread.start_new_thread(player_loop, (p,));

    while True:

        #Check for game end
        for event in pygame.event.get():
            if (event.type == QUIT or 
                (event.type == KEYDOWN and event.key == K_ESCAPE)):
                    print "Shutting down...";
                    event_dispatcher.send( EV_SHUTDOWN, '' )
                    time.sleep(1);
                    return 

        # clear/erase the last drawn sprites
        #all.clear(screen, background)
        screen.blit(background, (0,0))

        #update all the sprites
        all.update()


        # Create new alien
        if not int(random.random() * ALIEN_ODDS):
            Alien()

        shotcols = pygame.sprite.groupcollide(shots, shots, 0, 0);
        for shot in shotcols.keys():
            if (len(shotcols[shot]) > 1):
                for shot2 in shotcols[shot]:
                    shot2.kill();

        frags = pygame.sprite.groupcollide(shots, tanks, 0, 0);
        for shot in frags.keys():
             for fragged in frags[shot]:
                 shot.frag(fragged);

        #draw the scene
        dirty = all.draw(screen);
        for tank in tanks:
            dirty.append(tank.drawcursor(screen));
        pygame.display.update(SCREENRECT)
        
        #cap the framerate
        #clock.tick(40)
        time.sleep(0.025);

    if pygame.mixer:
        pygame.mixer.music.fadeout(1000)
    pygame.time.wait(1000)

def wiimote_loop(ev, cf):
    ev.subscribe(ABS_POS, ev_abs_pos);
    ev.subscribe(WM_BT, ev_wm_bt);

    while(True):
        btaddr = sys.stdin.readline().rstrip();
        if (not btaddr):
            for addr in cf['KNOWN_WIIMOTES']:
                if ((not addr in connected_wiimotes) or
                    (not connected_wiimotes[addr].running)):
                     btaddr = addr;
                     break;
             
        if (btaddr):
          print "Connecting to " + btaddr;
          cf['MY_WIIMOTE_ADDR'] = btaddr
          wm = WMManager( cf, ev ) # Handles the Wiimote; connects to it, manages wiimote state and mode, parses wiimote reports
          po = POManager( cf, ev, wm.id ) # Handles the pointer, receives WM_IR, sends out ABS_POS absolute position reports

          try:
              if wm.connect() and wm.setup():
                  thread.start_new_thread(wm.main_loop, ())
                  players[wm.id] = Player(next_start(), wm.id % 2 );
                  connected_wiimotes[btaddr] = wm; 
          except Exception, reason:
              # continue the thread
              print "Exception: " + str(reason);

# Keyboard/mouse monitor for a local (non-wiimote) player
def player_loop(player):
    while True:
        player.cursor = pygame.mouse.get_pos();
        keystate = pygame.key.get_pressed();
        player.hDirection = keystate[K_RIGHT] - keystate[K_LEFT]
        player.vDirection = keystate[K_DOWN] - keystate[K_UP]
        player.firing = keystate[K_SPACE]
        if (player.firing and
            not player.groups()):
            # respawn
            players[0] = player = Player(next_start(), 0);

        #cap the framerate
        #pygame.time.Clock().tick(40);
        time.sleep(0.025);


# handler for absolute cursor events
def ev_abs_pos(pos, id):
    if not (id in players):
        return;
    p = players[id];
    if (p):
        p.cursor[0] = pos[0] * WIDTH;
        p.cursor[1] = pos[1] * HEIGHT;

# handler for button events
def ev_wm_bt(event, id):
    if not (id in players):
        return;
    p = players[id];
    if (p):
        down = (event[1] == 'DOWN');
        #stupid python, having no ternary expression
        magnitude = 0;
        if (down):
            magnitude = 1;
        if (event[0] == 'D'):
            p.vDirection = magnitude;
        elif (event[0] == 'U'):
            p.vDirection = -1 * magnitude;
        elif (event[0] == 'L'):
            p.hDirection = -1 * magnitude;
        elif (event[0] == 'R'):
            p.hDirection = 1 * magnitude
        elif (event[0] == 'A' or event[0] == 'B'):
            p.firing = down;
        elif (event[0] == 'B'):
            pass #todo: mines
    if (not p.groups() and event[0] == 'A' and event[1] == 'UP'):
        # respawn
        players[id] = Player(next_start(), id % 2);

def next_start():
    global START_NUMBER
    START_NUMBER += 1
    list = map1['starts'];
    coords = list[START_NUMBER % len(list)];
    return (int(coords[0] * WIDTH/20.0), int(coords[1] * HEIGHT/20.0));

        
#call the "main" function if running this script
if __name__ == '__main__':
    # kick off the thread to search for wiimotes
    cf = CFG
    event_dispatcher = EVDispatcher( cf );
    thread.start_new_thread(wiimote_loop, (event_dispatcher, cf));
    # main game loop
    main()

