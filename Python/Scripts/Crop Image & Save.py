'''
80-Crop Image

pip install opencv-python
'''
import cv2

# Load image to crop.
img = cv2.imread('weird.jpg', cv2.IMREAD_UNCHANGED)

# Set crop dimensions
# We first supply the startY and endY coordinates,
#followed by the startX and endX coordinates to the slice.
#top-line-230  bottom line-360, left side-205: right side-475
cropped = img[230:360, 205:475]

# Display original and cropped image.
cv2.imshow("Original", img)
cv2.imshow("Cropped", cropped)

# Save.
cv2.imwrite('cropped-image.jpg', cropped)

# Wait for any key press.
cv2.waitKey(0)

# Close.
cv2.destroyAllWindows()
