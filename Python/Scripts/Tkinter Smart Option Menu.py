"""
Python code snippets vol 35:
175-Tkinter smart option menu
stevepython.wordpress.com

pip3 install tk_tools

source:
https://github.com/slightlynybbled/tk_tools/blob/master/examples/smart_optionmenu.py
"""

import tkinter as tk
import tk_tools


if __name__ == '__main__':
    root = tk.Tk()

    tk.Label(root, text="The variable value: ").grid(row=1, column=0, sticky='ew')
    value_label = tk.Label(root, text="")
    value_label.grid(row=1, column=1, sticky='ew')

    def callback(value):
        value_label.config(text=str(value))

    tk.Label(root, text="Select a value: ").grid(row=0, column=0, sticky='ew')
    drop_down = tk_tools.SmartOptionMenu(root, ['one', 'two', 'three'], callback=callback)
    drop_down.grid(row=0, column=1, sticky='ew')

    root.mainloop()
