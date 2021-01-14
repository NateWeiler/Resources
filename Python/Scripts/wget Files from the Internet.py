'''
94-Wget any files from the internet

Tested on Linux Mint and Windows 7

pip3 install wget
'''

import wget

# Replace url with your desired target.
# file will download to currenr working directory.
url = 'http://www.futurecrew.com/skaven/song_files/mp3/razorback.mp3'
filename = wget.download(url)
