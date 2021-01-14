# 45-Kill Running Programs

import os

# Try to kill some common windows programs
# Add or remove programs you want by listing
# them by their executable filename.

# To test this example, open notepad and run this code.

os.system("taskkill /f /im notepad.exe")
#os.system("taskkill /f /im winword.exe")
#os.system("taskkill /f /im chrome.exe")
#os.system("taskkill /f /im firefox.exe")
