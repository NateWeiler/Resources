import pygame

#only alternate the road images when the user is pressing the accelerator
#the bmp image does not support transparency, find another one in the data folder which does 

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

    def draw(self, screen):
        if self.state == 1:
            road_file = "data/road1.png"
            self.state = 2
        else:
            road_file = "data/road2.png"
            self.state = 1        
        road = pygame.image.load(road_file).convert()
        screen.blit(road,(0,0))

class Car(object):
    LEFT = 180
    MIDDLE = 280
    RIGHT = 370
    def __init__(self, moving=False):
        self.position = (self.MIDDLE, 360)

    def draw(self, screen):
        car_file = "data/green_car.bmp"
        car = pygame.image.load(car_file).convert()
        screen.blit(car,(self.position[0],self.position[1]))

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
my_car = Car()

clock = pygame.time.Clock()

while running:
    #20 frames per second to slow the screen change down
    clock.tick(20)
    event = pygame.event.poll()
    screen.fill(RED)

    road.draw(screen)    
    my_car.draw(screen)

    if event.type == pygame.QUIT:
        running = False
    elif event.type == pygame.KEYDOWN: 
        if event.key == pygame.K_LEFT:
            my_car.turn_left()
        elif event.key == pygame.K_RIGHT:
            my_car.turn_right()

    pygame.display.update()
