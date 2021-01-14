'''
88-Remux audio back onto a video

Requires ffmpeg installed on system.
free from ffmpeg.org

linux:sudo apt-get install ffmpeg
'''
import subprocess


# load a video.
VIDEO = "test.mp4"

# load a sound file.
SOUND = "sound.mp3"

# Mux audio back again.
save_name = "muxed.avi"

ff_comm = "ffmpeg -y -i "+str(VIDEO)+" -i "+str(SOUND)+" -c copy -map 0:v -map 1:a "+str(save_name)
subprocess.Popen(ff_comm.split())
