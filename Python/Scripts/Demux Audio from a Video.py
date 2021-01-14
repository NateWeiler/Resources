'''
87-Demux audio from a video

Tested on Linux Mint and Windows 7

Requires ffmpeg installed on system.
free from ffmpeg.org

linux:sudo apt-get install ffmpeg
'''
import subprocess
from tkinter import filedialog, Tk

# Demux audio of loaded video using ffmpeg

# Hide naff unwanted window.
ROOT = Tk()
ROOT.withdraw()

# User loads a video, via file dialog.
VIDEO = filedialog.askopenfilename(title="Load a video",
                                   filetypes=[(("All files", "*.*"))])

# If sucessful, the file audio.mp3 will be saved
# in the current working directory.
ff_command = "ffmpeg -y -i "+str(VIDEO)+" -vn -f mp3 audiox.mp3"
subprocess.Popen(ff_command.split())
