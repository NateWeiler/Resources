''' 25-Create Tabbed Widget '''
# Code taken from and Slightly modified for PEP8:
# https://www.c-sharpcorner.com/blogs/using-tabbed-widget-in-python-gui-application

import tkinter as tk
from tkinter import ttk

ROOT = tk.Tk()
ROOT.title("TABS")

#Create Tab Control
TAB_CONTROL = ttk.Notebook(ROOT)
#Tab1
TAB1 = ttk.Frame(TAB_CONTROL)
TAB_CONTROL.add(TAB1, text='Tab 1')
#Tab2
TAB2 = ttk.Frame(TAB_CONTROL)
TAB_CONTROL.add(TAB2, text='Tab 2')
TAB_CONTROL.pack(expand=1, fill="both")
#Tab Name Labels
ttk.Label(TAB1, text="This is Tab 1").grid(column=0, row=0, padx=10, pady=10)
ttk.Label(TAB2, text="This is Tab 2").grid(column=0, row=0, padx=10, pady=10)
#Calling Main()
ROOT.mainloop()
