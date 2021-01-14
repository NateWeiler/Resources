'''
   60-Pass a parameter from command callback
   in Tkinter using lambda.
'''

from tkinter import Tk, Button, LabelFrame

ROOT = Tk()
ROOT.geometry('200x60')
ROOT.title('Button Test')

def clk_but(butn_num):
    '''A button was clicked, print which one'''
    print(butn_num)

FRAME0 = LabelFrame(ROOT, text='')
FRAME0.grid()

BUT1 = Button(FRAME0, bg='skyblue', text='Click Me 1',
              command=lambda: clk_but("clicked button 1"))
BUT1.grid()

BUT2 = Button(FRAME0, bg='orange', text='Click Me 2',
              command=lambda: clk_but("clicked button 2"))
BUT2.grid()

ROOT.mainloop()
