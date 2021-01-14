'''
89-Convert almost any video format
Tested on Linux Mint and Windows 7

Requires ffmpeg installed on system.
free from ffmpeg.org

https://www.ffmpeg.org/documentation.html

linux:sudo apt-get install ffmpeg
'''

import subprocess

# Change infile.avi to your source video.
# Change outfile.wmv to destination video.
ff_comm = "ffmpeg -y -i test.mp4 -c:v libx264 outfile.wmv"
subprocess.Popen(ff_comm.split())
