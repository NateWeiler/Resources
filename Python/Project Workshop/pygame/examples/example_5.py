import pygame
#try drawing more boxes

RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
 
screen = pygame.display.set_mode((640, 440))
pygame.display.set_caption("My First Game")

running = True

#a box class
class Box(object):
    def __init__(self, x, y, height, width, color):
        self.x = x
        self.y = y
        self.height = height
        self.width = width
        self.color = color
    
    def draw(self, screen):
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.height, self.width))

while running:
    event = pygame.event.poll()
    if event.type == pygame.QUIT:
        running = False
 
    screen.fill(RED)
    
    my_box = Box(300, 200, 40, 40, WHITE)
    my_box.draw(screen)

    pygame.display.update()
