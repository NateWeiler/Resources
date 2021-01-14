#!python

# Interactive Turtle 

import turtle
from custom_module import random_color

# Here we make a Turtle named tina:
tina = turtle.Turtle()
# Next we give her the turtle shape:
tina.shape("turtle")
# Give her a random color
tina.color(random_color())
# She won't do anything else unless we tell her to.

# Here we make a Screen named screen:
screen = turtle.Screen()

# Let's define a function we want to run when the screen is clicked:
def screen_is_clicked(x,y):
  print "The screen has been clicked"

# Let's tell the screen to run our function when clicked:
screen.onclick(screen_is_clicked)

# Now we make sure our Screen is listening for clicks:
screen.listen()
