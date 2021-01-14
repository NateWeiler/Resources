import pygame
#try changing the screen size
#try printing out all the events to see what is going on in the background

#Initialize a window or screen for display width * height 
screen = pygame.display.set_mode((640, 400))

#create a boolean variable that indicates if we should continue or quit
running = True

#loop until running is False 
while running:
    #poll the event queue for an event
    event = pygame.event.poll()
    #check what type of event has happened
    #clicking the X causes a quit event
    if event.type == pygame.QUIT:
        running = False
 

