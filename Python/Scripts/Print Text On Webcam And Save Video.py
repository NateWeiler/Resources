'''
77-Print Text On Webcam And Save Video

Tested on Window 7 and Linux Mint 19.1

On my Linux I had to make the font smaller (0.5)and change text position
(60,260) to be able see the text. Also the saved video would not play.
This could be all down to my setup though.

pip install opencv-python
'''
import cv2

cv2.namedWindow("preview")
vc = cv2.VideoCapture(0)

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'DIVX')
out = cv2.VideoWriter('output.avi',fourcc, 20.0, (640,480))


if vc.isOpened():
    rval, frame = vc.read()
else:
    rval = False
    print("No camera found.")


while rval:
    cv2.imshow("preview", frame)
    rval, frame = vc.read()

    # Print text onto video.
    cv2.putText(frame, "Video subtitle Shambles test", (110, 460),  \
    cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), lineType=cv2.LINE_AA)

    # write the frame to file
    out.write(frame)

    # End if Escape key detected
    key = cv2.waitKey(25)
    if key == 27: # exit on ESC
        break

cv2.destroyWindow("preview")
