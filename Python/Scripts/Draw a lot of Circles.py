#!python

# Turtle Draws a lot of Circles

import turtle
import random

tina = turtle.Turtle()
tina.shape("turtle")

circles = random.randrange(10, 20)
colors = ["red", "blue", "yellow", "orange", "green", "purple"]

for c in range(circles):
  x = random.randrange(-175, 175)
  y = random.randrange(-175, 175)
  size = random.randrange(25, 50)
  color = random.choice(colors)
  tina.color(color)
  tina.penup()
  tina.goto(x, y)
  tina.color(color)
  tina.pendown()
  tina.begin_fill()
  tina.circle(size)
  tina.end_fill()
