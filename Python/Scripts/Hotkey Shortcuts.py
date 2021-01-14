'''
   59-Python Hotkey Shortcuts
   Create hotkey shortcuts for anything.

   You may neeed to "pip install keyboard"
'''
import os
import keyboard as kb

def example():
    '''This function will be called when the shortcut key combination,
       defined in main(), is pressed. You can run anything you want here.
       For this example I have just opened notepade.exe.'''

    os.startfile('notepad.exe')

def main():
    '''The shortcut defined in here will be the Windows key + control + r.
    To quit checking for keypresses is Win + control + escape key.
    You can change these keys to anything you want.'''

    short_cut = "Win+Ctrl+R"
    kb.add_hotkey(short_cut, example, args=None)
    kb.wait("Win+Ctrl+Esc")

main()
