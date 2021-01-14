#!python

# Multi-Color Squre with Turtle 

import turtle
tina = turtle.Turtle()
tina.shape("turtle")

for each_word in ['red', 'green', 'yellow', 'blue']:
    tina.color(each_word)
    tina.forward(100)
    tina.left(90)
