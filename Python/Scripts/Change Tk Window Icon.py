'''
52-Change window Icon
   Requires an .ico file in cwd
'''

from tkinter import Tk

# Create a gui window
ROOT = Tk()
ROOT.title('Change Window Icon')
ROOT.geometry('270x90')

# Change the window icon.
# Ensure the .ico file is in same dir
# as this source code is run from.
# Rename red_star.ico to your own icon
ROOT.iconbitmap('red_star.ico')

ROOT.mainloop()
