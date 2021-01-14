#!python3

# Empty Windows Recycle Bin

# You may need to "Pip install winshell"

import winshell
 
# The try-except block captures the error produced
# if the recycle bin is found to be already empty.
 
# You can change the boolean False and True statements
# to either turn on or off the following:
# Confirm yes\no dialog, progress bar, sound effect.
 
try:
    winshell.recycle_bin().empty(confirm=True, show_progress=Trur, sound=True)
    print("Recycle Bin emptied")
 
except:
    print('Recycle Bin already empty')
