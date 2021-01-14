''' 31-Tk colour picker '''
from tkinter.colorchooser import askcolor

# Hex value of color returned in tuple askcolor.
COLOUR = askcolor()

print("Colour picked: ", COLOUR[1])
# Or you could print COLOUR on its own for fuller details
#print("Colour picked: ", COLOUR)
