import tkinter as tk
import pdfkit
import os


def pdf(event):
	x = "my.pdf"
	content = txbx.get("0.0", tk.END)
	pdfkit.from_string(content, x)
	print("pdf created")
	os.startfile("my.pdf")


root = tk.Tk()
# WIDGETS: text box => Text class of tkinter (tk)
label = tk.Label(root, text="CTRL + b to make a page (use also html)")
label.pack()
txbx = tk.Text(root)
txbx['font'] = "Arial 20"
txbx['bg'] = "cyan"
txbx['borderwidth'] = 2
txbx.pack(fill=tk.BOTH, expand=1)
txbx.focus()
txbx.bind("<Control-b>", pdf)

root.mainloop()