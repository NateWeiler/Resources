# 39-Right Click Menu For Tkinter

from tkinter import Tk, Menu, Frame

# create a Window
ROOT = Tk()
ROOT.title('Right Click Menu')
FRAME0 = Frame(ROOT, width=250, height=250, bg="green")
FRAME0.grid()

def paste():
    '''called when Paste selected from right click menu'''
    print("Paste selected")

def copy():
    '''called when Copy selected from right click menu'''
    print("Copy selected")

def popup(event):
    '''On right click display popup menu at mouse position'''
    MENU.post(event.x_root, event.y_root)

# bind mouse right click to frame
FRAME0.bind("<Button-3>", popup)

# create the popup menu
MENU = Menu(ROOT, tearoff=0)
MENU.add_command(label="Paste", command=paste)
MENU.add_command(label="Copy", command=copy)

ROOT.mainloop()
