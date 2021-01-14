'''
Text to speech demo
You may need to "pip install gtts" first.
'''
import os
from gtts import gTTS

# You will need a text file named test.txt
# to play, put it in the current dir.
FLIST = open("test.txt", "r").read().replace("\n", " ")

print("please wait...processing")
TTS = gTTS(text=str(FLIST), lang='en-uk')

# Save to mp3 in current dir.
TTS.save("pcvoice.mp3")

# Plays the mp3 using the default app on your system
# that is linked to mp3s.
print(FLIST)
os.system("start pcvoice.mp3")
