import pygame

#try changing the title of the screen
 
screen = pygame.display.set_mode((640, 400))
pygame.display.set_caption("My First Game")

running = True

while running:
    event = pygame.event.poll()
    if event.type == pygame.QUIT:
        running = False
    else:
        print event
 
    screen.fill((255, 0, 0))
    pygame.display.update()
