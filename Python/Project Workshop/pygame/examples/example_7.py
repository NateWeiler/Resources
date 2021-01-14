import pygame

RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
 
screen = pygame.display.set_mode((640, 440))
pygame.display.set_caption("My First Game")

running = True

class Chimp(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def draw(self, screen):
        #the following code loads an image
        image_chimp = pygame.image.load("../data/chimp.bmp")
        #the convert method makes a copy that will render quicker
        #image_chimp = pygame.image.load("../data/chimp.bmp").convert()
        #blitting means rendering an image
        screen.blit(image_chimp,(self.x,self.y))

    def set_location(self, x, y):
        self.x = x
        self.y = y

my_chimp = None


while running:
    event = pygame.event.poll()
    screen.fill(RED)
    
    if my_chimp:
        my_chimp.draw(screen)

    if event.type == pygame.QUIT:
        running = False
    elif event.type == pygame.MOUSEBUTTONDOWN: 
        pos = pygame.mouse.get_pos()
        if my_chimp:
            my_chimp.set_location(pos[0], pos[1])
        else:
            my_chimp = Chimp(pos[0], pos[1])

    pygame.display.flip()
