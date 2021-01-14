# 41-Play mp3 using Pygame

# You may need to pip install pygame

# Royalty free music from:
# https://www.bensound.com/royalty-free-music/electronica

from pygame import mixer

# Rename the .mp3 to your own track.
# You can find this .mp3 in the same folder as this code
mixer.init()
mixer.music.load('bensound-enigmatic.mp3')
mixer.music.play()

print ("Playing Mp3, type: mixer.music.stop()")
# Use the following line in your code to stop the track playing
# mixer.music.stop()
