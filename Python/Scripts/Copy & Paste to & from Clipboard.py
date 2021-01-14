'''Copy & paste text to & from the clipboard'''

# You may first need to: pip install Pyperclip.
import pyperclip

# Copy some text to the clipboard for this example.
pyperclip.copy("sending this text to the clipboard")

# Grab text from the clipboard.
CB_TXT = pyperclip.paste()

print("Contents of clipboard is:", CB_TXT)
