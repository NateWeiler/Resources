import pygame

RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
 
screen = pygame.display.set_mode((640, 440))
pygame.display.set_caption("My First Game")

running = True

class Road(object):
    def __init__(self):
        self.state = 1
        self.moving = False

    def draw(self, screen, moving=False):
        if self.state == 1:
            road_file = "data/road1.png"
            if  moving:
                self.moving = True
                self.state = 2
        else:
            road_file = "data/road2.png"
            if moving:
                self.state = 1
        road = pygame.image.load(road_file).convert()
        screen.blit(road,(0,0))

class Car(object):
    LEFT = 180
    MIDDLE = 280
    RIGHT = 370
    def __init__(self, moving=False):
        self.moving = moving
        if not moving:
            self.position = (self.MIDDLE, 360)
        else:
            self.position = (self.MIDDLE, 0)

    def draw(self, screen, raod=None):
        car_file = "data/green_car.png"
        car = pygame.image.load(car_file).convert()
        screen.blit(car,(self.position[0],self.position[1]))
        if self.moving and road.moving:
            if self.position[1] > 360:
                self.position = (self.position[0], 0)
            else:
                self.position = (self.position[0], self.position[1]+1)

    def turn_left(self):
        if self.position[0] == self.RIGHT:
            self.position = (self.MIDDLE, self.position[1])
        elif self.position[0] == self.MIDDLE:
            self.position = (self.LEFT, self.position[1])

    def turn_right(self):
        if self.position[0] == self.LEFT:
            self.position = (self.MIDDLE, self.position[1])
        elif self.position[0] == self.MIDDLE:
            self.position = (self.RIGHT, self.position[1])

road = Road()
road.draw(screen)
my_car = Car()
a_car = Car(moving=True)

moving = False

while running:
    event = pygame.event.poll()
    
    if event.type == pygame.QUIT:
        running = False
    elif event.type == pygame.KEYDOWN: 
        if event.key == pygame.K_LEFT:
            my_car.turn_left()
        elif event.key == pygame.K_RIGHT:
            my_car.turn_right()
        elif event.key == pygame.K_a:
            moving = True

    elif event.type == pygame.KEYUP: 
        if event.key == pygame.K_a:
            moving = False

    road.draw(screen, moving)
    my_car.draw(screen)
    a_car.draw(screen, road)

    pygame.display.flip()
