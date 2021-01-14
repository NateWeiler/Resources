#! /usr/bin/env python

#try changing the colour to blue
 
import pygame
 
screen = pygame.display.set_mode((640, 400))

running = True

# This is the event loop for my first game
while running:
    event = pygame.event.poll()
    if event.type == pygame.QUIT:
        running = False

    #Fill the screen with a colour 
    screen.fill((255, 0, 0))
    #The line above will not be displayed until you redraw the screen
    #pygame.display.update()
