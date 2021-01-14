'''
90-Convert almost any audio format

Tested on Linux Mint and Windows 7

Requires ffmpeg installed on system.
free from ffmpeg.org

https://www.ffmpeg.org/documentation.html
linux:sudo apt-get install ffmpeg
'''

import subprocess

ff_comm = "ffmpeg -y -i yourfile.aac newfilename.mp3"
subprocess.Popen(ff_comm.split())
