'''03-Get user selected directory'''

from tkinter import filedialog, Tk

root=Tk()
# Remove naff window
root.withdraw()

FOLDER_SELECTED = filedialog.askdirectory()

print("The folder you selected is: ", FOLDER_SELECTED)
