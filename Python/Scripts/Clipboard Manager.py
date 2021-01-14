import os
import time
from tkinter import Button, Frame, messagebox, Menu, Tk, X
import webbrowser
 
import pyperclip
 
root = Tk()
root.title('CBMan V1.5')
root.geometry('200x125')
root.resizable(False, False)
 
# Check if 'cb-pastes' folder exists, if not, create it in current dir.
cb_folder = 'cb-pastes/'
check_folder = os.path.isdir(cb_folder)
 
if not check_folder:
    os.makedirs(cb_folder)
 
os.chdir(cb_folder)
 
check_file = os.path.isfile('saved.txt')
if not check_file:
    with open('saved.txt', 'w')as cf:
        pass
 
def call_save():
    """Append the text contents of the current clipboard into a text file."""
    ct = time.asctime()
    cb_txt = pyperclip.paste()
    with open('temp2.txt', 'w') as f:
        with open('temp2.txt', 'a') as f:
            f.write('\n')
            f.write(ct)
            f.write('\n')
            f.write(cb_txt)
            f.write('\n')
            f.write('-' *70)
 
    with open('saved.txt', 'r') as contents:
        save = contents.read()
    with open('temp2.txt', 'r') as contents:
        save2 = contents.read()
    with open('saved.txt', 'w') as contents:
        contents.write(save2)
    with open('saved.txt', 'a') as contents:
        contents.write(save)
 
    # All the above juggling between files is simply to append to the
    # start of the file rather than the end, which is the default.
 
    messagebox.showinfo('CBMan', 'Clipboard Saved.')
 
def call_clear():
    """Clear the clipboard of text."""
    pyperclip.copy('')
    messagebox.showinfo('CBMan', 'Clipboard cleared.')
 
def call_view():
    """Open text file of saved clips."""
    webbrowser.open('saved.txt')
 
def call_viewcb():
    """Open text file of current clipboard contents."""
    cb_get = pyperclip.paste()
    with open('temp.txt', 'w') as vf:
        vf.write(cb_get)
        vf.close()
        webbrowser.open('temp.txt')
 
def about_menu():
    """Display about message box."""
    messagebox.showinfo('About', 'CBMan V1.5. Steve Shambles. 2019')
 
def visit_blog():
    """Visit my python blog, you know it makes sense."""
    webbrowser.open('https://stevepython.wordpress.com')
 
# Create buttons.
app = Frame(root)
app.pack()
button1 = Button(app, text='View Clipboard', bg='skyblue', command=call_viewcb)
button1.pack(fill=X)
button2 = Button(app, text='Save Clipboard', bg='skyblue', command=call_save)
button2.pack(fill=X)
button3 = Button(app, text='Clear Clipboard', bg='skyblue', command=call_clear)
button3.pack(fill=X)
button4 = Button(app, text='View Saved texts', bg='skyblue', command=call_view)
button4.pack(fill=X)
 
# Drop down menu.
menubar = Menu(root)
filemenu = Menu(menubar, tearoff=0)
menubar.add_cascade(label='Menu', menu=filemenu)
filemenu.add_command(label='About', command=about_menu)
filemenu.add_command(label='Visit blog', command=visit_blog)
filemenu.add_command(label='Exit', command=root.destroy)
root.config(menu=menubar)
 
root.mainloop()