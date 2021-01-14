"""
Python code snippets vol 36:
177-Enhance image detail
stevepython.wordpress.com

pip3 install opencv-python

Source: vars
"""

import cv2

# Read image.
im = cv2.imread("woolacombe1.jpg")

# Display original image.
cv2.imshow("original", im)

# Detail enhance filter
imout = cv2.detailEnhance(im)

# Display enhanced image.
cv2.imshow("detail-enhanced", imout)

# Save enhanced image.
cv2.imwrite("detail-enhance.jpg", imout)

# Press any key to close both windows.
cv2.waitKey(0)
cv2.destroyAllWindows()
