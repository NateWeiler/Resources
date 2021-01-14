import pygame

from random import randint

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

    def start(self):
        self.moving = True

    def stop(self):
        self.moving = False

    def draw(self, screen):
        if self.state == 1:
            road_file = "data/road1.png"
            if  self.moving:

                self.state = 2
        else:
            road_file = "data/road2.png"
            if self.moving:
                self.state = 1
        road = pygame.image.load(road_file).convert()
        screen.blit(road,(0,0))

class Car(object):
    LEFT = 180
    MIDDLE = 280
    RIGHT = 370
    def __init__(self, road, fixed=True):
        self.fixed = fixed
        self.road = road
        self.crashed = False

        if fixed:
            self.position = (self.MIDDLE, 360)
        else:
            self.position = (self.MIDDLE, 0)

    def crash(self):
        self.crashed = True

    def accelerate(self):
        self.road.start()

    def brake(self):
        self.road.stop()

    def draw(self, screen):
        if not self.crashed:
            car_file = "data/green_car.png"
        else:
            car_file = "data/explode.png"
        car = pygame.image.load(car_file).convert()
        screen.blit(car,(self.position[0],self.position[1]))
        if not self.fixed and self.road.moving:
            if self.position[1] > 360:
                self.position = (self.position[0], 0)
            else:
                self.position = (self.position[0], self.position[1]+1)
        elif not self.fixed and not self.road.moving:
            if self.position[1] < 0:
                self.position = (self.position[0], 380)
            else:
                self.position = (self.position[0], self.position[1]-1)

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


LEFT = 180
MIDDLE = 280
RIGHT = 370

def check_collision(car1, car2):
    if car1.position[0] == car2.position[0]:
        if car1.position[1] == car2.position[1]:
            return True
    return False

road = Road()
road.draw(screen)
my_car = Car(road)
a_car = Car(road, fixed=False)

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
            my_car.accelerate()

    elif event.type == pygame.KEYUP: 
        if event.key == pygame.K_a:
            my_car.brake()
    
    road.draw(screen)
    if check_collision(my_car, a_car):
        my_car.crash()
        a_car.crash()
    my_car.draw(screen)
    
    random_number = randint(0,50)
    if random_number == 0:
        a_car.turn_left()
    elif random_number == 50:
        a_car.turn_right()
    a_car.draw(screen)

    pygame.display.flip()
