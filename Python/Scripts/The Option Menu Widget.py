import tkinter as tk
import tkinter.ttk as ttk

def print_something(event):
	print("You choose " + v.get())

root = tk.Tk()
v = tk.StringVar()
om = ttk.OptionMenu(root, v, "Choose", "item 1", "item 2", "item 3")
v.set("item 3")
om.pack()
om.bind("<Return>", print_something)
om.focus()

root.mainloop()