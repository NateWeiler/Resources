'''
   54-Awesome GUI Date Picker

   Modified (shambleized)from example code at:
   https://github.com/j4321/tkcalendar#documentation

   You may need to "pip install tkcalendar"

   Steve Shambles, feb 16th 2019.
   https://stevepython.wordpress.com
'''

import tkinter as tk
from tkinter import ttk
from tkcalendar import Calendar

ROOT = tk.Tk()
ROOT.withdraw()# hide naff extra window
ROOT.title('Please choose a date')

def pick_date_dialog():
    '''Display GUI date picker dialog,
       print date selected when OK clicked'''

    def print_sel():
        selected_date = (cal.get_date())
        print(selected_date)

    top = tk.Toplevel(ROOT)

    #defaults to today's date
    cal = Calendar(top,
                   font="Arial 10", background='darkblue',
                   foreground='white', selectmode='day')

    cal.grid()
    ttk.Button(top, text="OK", command=print_sel).grid()

pick_date_dialog()

ROOT.mainloop()
