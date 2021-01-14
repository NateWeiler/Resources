'''
100-Tk GUI Vertical Scale
Tested on Python V3.6 on Windows 7 and Linux Mint 19.1.

original code here:
http://www.java2s.com/Code/Python/GUI-Tk/BoundScaleactionwithacanvas.htm
'''
from tkinter import Tk, Canvas, Scale, VERTICAL


def setHeight(canvas, heightStr):
    height = 21
    height = height + 21
    y2 = height - 30
    print(heightStr)#holds current scale pointer
    if y2 < 21:
        y2 = 21

root = Tk()
root.title('Scale')

canvas = Canvas(root, width=65, height=50, bd=0, highlightthickness=0)
scale = Scale(root,
              orient=VERTICAL,
              length=284,
              from_=0,
              to=250,
              tickinterval=25,
              command=lambda h, c=canvas:setHeight(c,h))

scale.grid(row=0, column=0, sticky='NE')

#starting point on scale
scale.set(125)


root.mainloop()
