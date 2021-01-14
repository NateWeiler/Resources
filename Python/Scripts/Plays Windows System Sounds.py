'''17-Play Windows system sounds'''

import winsound
from time import sleep

# More detail here:
# https://docs.python.org/3/library/winsound.html

winsound.PlaySound("SystemDefault", winsound.MB_ICONASTERISK)
sleep(1)
winsound.PlaySound("SystemHand", winsound.MB_ICONHAND)
sleep(1)
winsound.PlaySound("SystemExit", winsound.SND_ALIAS)
sleep(1)
winsound.PlaySound("SystemExclamation", winsound.SND_ALIAS)
sleep(1)
winsound.PlaySound("SystemAsterisk", winsound.SND_ALIAS)
sleep(1)
