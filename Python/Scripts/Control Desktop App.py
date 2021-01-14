'''
37-Control A Desktop App
Open a desktop program, Notepad.exe in this example,
and interact with it using Pyautogui.
You may need to "pip install pyautogui".
'''
import subprocess
import time
import pyautogui

# Run Notepad.
subprocess.Popen('notepad.exe')

# Give Notepad a chance to open.
# You could increase this pause if any problems catching window focus.
time.sleep(0.2)

# Tell Pyautogui what the windows name is.
WINDOW = pyautogui.getWindow("Untitled - Notepad")

# Focus on Notepad and bring to front.
WINDOW.set_foreground()

# Test it out
# Hit F5 to print time and date
pyautogui.hotkey('F5')

# Newline (the "\n" bit) and print a message.
pyautogui.typewrite('\nHello auto bot world')
