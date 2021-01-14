'''
86-Get video file inf

pip install opencv-python
'''

import os
import cv2

# Load a video.
video_in = 'test.mp4'

# Get file name, no path.
file_name = os.path.basename(video_in)

# Get frame rate.
vid_cap = cv2.VideoCapture(video_in)
vid_fps = int(vid_cap.get(cv2.CAP_PROP_FPS))

# Find total frames.
frame_count = int(vid_cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Duration.
vid_duration = frame_count/vid_fps
vid_minutes = int(vid_duration/60)
vid_seconds = round(vid_duration%60) #The % is Modulus, ie.remainder

# Get height and width of video.
vid_height = int(vid_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
vid_width = int(vid_cap.get(cv2.CAP_PROP_FRAME_WIDTH))


# Output the collected info.
print()
print('File name:', file_name)
print('Duration: '+str(vid_minutes) + 'M:' + str(vid_seconds)+'s')
print('FPS:', vid_fps)
print('Total frames:', frame_count)
print('Dimensions: '+str(vid_width)+' X '+str(vid_height))
print()
