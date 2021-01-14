'''Auto scroll huge pages in Twitter'''
# You may need to pip install pyautogui
 
import webbrowser
from random import randint
import pyautogui
 
# This assumes you are logged into your account on Twitter
# You can change the twitter page to /following or any other
# page you want from Twitter, e.g someone else's followers .
# Insert the address in next line.
webbrowser.open("https://twitter.com/followers")
 
# Let's keep this humanistic to not alarm Twitter too much.
pyautogui.PAUSE = 2
 
PAGES = 0
# You can change the amount of pages to auto scroll by editing
# the "< 11" bit below. If you are not sure how many, or just
# want to get to the end put 10000 or something.
 
# Move the mouse pointer to top left corner of screen to stop this 
#script. and the scrolling at any time. Or ctrl+c in emergency.
while True:
    if PAGES < 11:
        pyautogui.press('pgdn')
        # Random pause 1-5 seconds, change\delete this, up to you.
        RND_DLY = randint(1, 5)
        pyautogui.PAUSE = RND_DLY
    else:
        break
    # Increment page count.
    PAGES += 1
