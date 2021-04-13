#!/usr/bin/env python

import pygame
import os
import site

site.addsitedir(os.path.join(".."))
import pygapp

pygame.init()

display = pygame.display.set_mode((640,480))

def main():
    ldr = pygapp.Loader(".")
    level = ldr.load_level("map.xml")

    # Load the tiles found in this level
    tiles = []
    for name in level.tileMapping:
        tiles.append(ldr.load_image(name+".png"))

    done = False
    while not done:
        # Render the level
        for grid in level.grids:
            x = 0
            for col in grid.tileGrid:
                y = 0
                for cell in col:
                    img = tiles[cell]
                    if (cell != 0):
                        display.blit(img, (x, y))
                    y += img.get_height()
                x += img.get_width()
        pygame.display.flip()

        for event in pygame.event.get():
            if (event.type == pygame.QUIT or
                event.type == pygame.KEYDOWN and
                event.key == pygame.K_ESCAPE):
                done = True
                break
main()

