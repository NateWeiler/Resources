"""
Python code snippets vol 35:
171-Download audio of a youtube video
stevepython.wordpress.com

pip3 install youtube-dl
Also required, install ffmpeg from https://www.ffmpeg.org/
On linux mint: sudo apt-get install ffmpeg

source:
https://stackoverflow.com/questions/49246598/
youtube-dl-get-audio-link-with-python
"""

import youtube_dl

# Change options if wish mp3 to wav, 192 to 320 for example.
ydl_opts = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
}
# Will download the audio file into current dir with same name as video.
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=kWZdv5pO5kg'])
    # Replace youtube video address above to the one you want.
