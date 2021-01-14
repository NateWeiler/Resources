'''
97-Open webcam in full screen mode

Tested on Python V3.6 on Windows 7 and Linux Mint 19.1.

pip3 install opencv-python
'''

import cv2

cap = cv2.VideoCapture(0)
while(True):
    ret, frame = cap.read()
    cv2.namedWindow('frame', cv2.WINDOW_NORMAL)
    cv2.setWindowProperty('frame', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
    cv2.imshow('frame', frame)
    if(cv2.waitKey(1) & 0xFF == ord('q')):
        break
cap.release()
cv2.destroyAllWindows()
