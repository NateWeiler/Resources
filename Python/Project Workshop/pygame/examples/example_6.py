import pygame
# try removing the box when the user types 'c'

RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
 
screen = pygame.display.set_mode((640, 440))
pygame.display.set_caption("My First Game")

running = True

class Box(object):
    def __init__(self, x, y, height, width, color):
        self.x = x
        self.y = y
        self.height = height
        self.width = width
        self.color = color
    
    def draw(self, screen):
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.height, self.width))

my_box = None

while running:
    event = pygame.event.poll()
    screen.fill(RED)

    if my_box:
        my_box.draw(screen)

    if event.type == pygame.QUIT:
        running = False
    elif event.type == pygame.MOUSEBUTTONDOWN:
        #get the mouse position
        position = pygame.mouse.get_pos()

        my_box = Box(position[0], position[1], 40, 40, WHITE)
    elif event.type == pygame.KEYDOWN:
        if event.key == pygame.K_c:
            pass # do nothing

    pygame.display.update()
