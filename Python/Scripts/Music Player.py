#! python

# Music Player

# Installation
'''
# In Windows
pip install pygame

# In Linux
sudo apt-get install python3-tk 
pip3 install pygame
'''

# Import all necessary Libray
from tkinter import *
from tkinter import filedialog
from pygame import mixer

# implement our class & Buttons for our application
class MusicPlayer:
    def __init__(self, window ):
        window.geometry('320x100'); window.title('Iris Player'); window.resizable(0,0)
        # Add Load Method to our MusicPlayer class
        Load = Button(window, text = 'Load',  width = 10, font = ('Times', 10), command = self.load)
        # Add Play Method to our class
        Play = Button(window, text = 'Play',  width = 10,font = ('Times', 10), command = self.play)
        # Add pause and stop method to our class
        Pause = Button(window,text = 'Pause',  width = 10, font = ('Times', 10), command = self.pause)
        Stop = Button(window ,text = 'Stop',  width = 10, font = ('Times', 10), command = self.stop)
        Load.place(x=0,y=20);Play.place(x=110,y=20);Pause.place(x=220,y=20);Stop.place(x=110,y=60) 
        self.music_file = False
        self.playing_state = False
    def load(self):
        self.music_file = filedialog.askopenfilename()
    def play(self):
        if self.music_file:
            mixer.init()
            mixer.music.load(self.music_file)
            mixer.music.play()
    def pause(self):
        if not self.playing_state:
            # Pausing Music
            mixer.music.pause()
            self.playing_state=True
        else:
            # Unpausing Music
            mixer.music.unpause()
            self.playing_state = False
    def stop(self):
        # Stop a Music File
        mixer.music.stop()
root = Tk()
app= MusicPlayer(root)
root.mainloop()
