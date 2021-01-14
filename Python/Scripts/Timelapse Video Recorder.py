'''
93-Timelapse Video recorder

Tested on Linux Mint and Windows 7

pip3 install opencv-python
'''

import cv2

capture = cv2.VideoCapture(0)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
output = cv2.VideoWriter('timelapse.mp4',fourcc,30,(640,480))

while True:
    ret, frame = capture.read()
    output.write(frame)
    cv2.imshow('frame',frame)

    if cv2.waitKey(1) & 0xFF == ord('x'):
        break
    cv2.waitKey(1500)

capture.release()
output.release()
cv2.destroyAllWindows()
