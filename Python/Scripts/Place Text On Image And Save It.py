
'''
76-Place Text On Image

Tested on Linux Mint 19.1 and Windows 7

pip install opencv-python
'''

import cv2

# Load image
img = cv2.imread("devon.png")

# Set font
font = cv2.FONT_HERSHEY_SIMPLEX

# Place text on image.
cv2.putText(img, "Devon. (c) 2019 Jack Shambles",  \
(330,360), font, 0.3, (255,255,255), 1, cv2.LINE_AA)

# Display image
cv2.imshow("Devon by Jack", img)

# Save image.
cv2.imwrite('new.jpg', img)

# Wait for any key to be pressed.
cv2.waitKey(0)

# Close window.
cv2.destroyAllWindows()
