''' 20-Center Root Tk Window on Screen '''

from tkinter import Tk

ROOT = Tk()

# Gets the requested values of the height and widht.
WINDOWWIDTH = ROOT.winfo_reqwidth()
WINDOWHEIGHT = ROOT.winfo_reqheight()
print("Width", WINDOWWIDTH, "Height", WINDOWHEIGHT)

# Gets both half the screen width/height and window width/height
POSITIONRIGHT = int(ROOT.winfo_screenwidth()/2 - WINDOWWIDTH/2)
POSITIONDOWN = int(ROOT.winfo_screenheight()/2 - WINDOWHEIGHT/2)

# Positions the window in the center of the page.
ROOT.geometry("+{}+{}".format(POSITIONRIGHT, POSITIONDOWN))
