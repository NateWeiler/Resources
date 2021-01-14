#
# This was modified on the the day of the workshop to share with others.
#
import pygame

#implement the car's draw and turn_left methods
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
    def __init__(self, x, y):
     #self.position = (x, y)
        self.x = x
        self.y = y

    def draw(self, screen, car_type=1, moving=False):
        if car_type == 1:
            car = "data/green_car.png"
        else:
            car ="data/silver_car.bmp"
        car = pygame.image.load(car).convert()
        if moving:
            self.y = self.y - 5
        screen.blit(car,(self.x, self.y))

    def turn_left(self):
         print("this is self position {}").format(self.x)
         if self.x == self.RIGHT:
             self.x = self.MIDDLE
         elif self.x == self.MIDDLE:
            self.x = self.LEFT

    def turn_right(self):
        if self.x == self.LEFT:
            self.x = self.MIDDLE
        elif self.x == self.MIDDLE:
            self.x = self.RIGHT

road = Road()
my_car = Car(280,360)
yr_car = Car(280,200)

clock = pygame.time.Clock()

while running:
    #20 frames per second to slow the screen change down
    clock.tick(20)
    event = pygame.event.poll()
    screen.fill(RED)

    road.draw(screen)
    my_car.draw(screen)
    yr_car.draw(screen, 2, moving = True)

    if event.type == pygame.QUIT:
        running = False
    elif event.type == pygame.KEYDOWN:
        if event.key == pygame.K_LEFT:
            print("this is key left")
            my_car.turn_left()
        elif event.key == pygame.K_RIGHT:
            my_car.turn_right()

    pygame.display.update()