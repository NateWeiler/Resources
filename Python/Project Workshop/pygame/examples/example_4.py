import pygame
# try to find the typo
# try drawing a different size rectangle
# have a look in the docs folder, drawing.html

RED = (255, 0, 0)
BLUE = (0, 0, 255)
RED = (0, 255, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
 
screen = pygame.display.set_mode((640, 440))
pygame.display.set_caption("My First Game")

running = True

while running:
    event = pygame.event.poll()
    if event.type == pygame.QUIT:
        running = False
 
    screen.fill(RED)
    
    #The following code draws a white box 40x40 , in 300 from the left, down 200 from the top.
    #pygame.draw.rect(screen, WHITE, (300, 200, 40, 40))
    pygame.display.update()
