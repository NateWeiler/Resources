"""
Python code snippets vol 36:
180-Non lambda multi callback
stevepython.wordpress.com

source:
https://stackoverflow.com/questions/16074486/python-tkinter-button-callback/16074917#16074917
"""
from tkinter import Button, LEFT, Tk

root = Tk()

def myfunction(event):
    """Button callback."""
    print(buttons[event.widget])

buttons = {}
for i in range(7):
    btn = Button(root, text='button' + str(i))
    buttons[btn] = i # Save button, index as key-value pair
    btn.bind('<Button-1>', myfunction)

    btn.grid(column=(0+i),row=0)  # Grid version.
    #btn.pack(side=LEFT)          # Pack version.

root.mainloop()
