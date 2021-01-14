'''
92-live video sketcher

Tested on Linux Mint and Windows 7

pip3 install opencv-python
pip3 install numpy

source:
https://github.com/geekcomputers/Python/blob/master/live_sketch.py
'''

import cv2
import numpy as np

def sketch(image):

    img_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    img_gray_blur = cv2.GaussianBlur(img_gray, (5,5), 0)
    canny_edges = cv2.Canny(img_gray_blur, 10, 70)
    ret, mask = cv2.threshold(canny_edges, 70, 255, cv2.THRESH_BINARY_INV)
    return mask

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    cv2.imshow('Our Live Sketcher', sketch(frame))
    if cv2.waitKey(1) == 13:
        break

cap.release()
cv2.destroyAllWindows()
