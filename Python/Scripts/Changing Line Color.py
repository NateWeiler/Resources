import turtle 

painter = turtle.Turtle()

painter.pencolor("red")

for i in range(50):
    painter.forward(50)
    painter.left(123) # Let's go counterclockwise this time 
    
painter.pencolor("turquoise")
for i in range(50):
    painter.forward(100)
    painter.left(123)
    
painter.pencolor("green")
for i in range(50):
    painter.forward(100)
    painter.left(123)
    
painter.pencolor("purple")
for i in range(50):
    painter.forward(100)
    painter.left(123)
    
painter.pencolor("yellow")
for i in range(50):
    painter.forward(100)
    painter.left(123)
    
turtle.done()
