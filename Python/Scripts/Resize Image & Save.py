'''
78- Resize Image and save.

Tested on Windows 7 and Linux Mint 19.1

pip install opencv-python
'''

import cv2

# Load image to resize. Insert your image below.
img = cv2.imread('black-swans.jpg', cv2.IMREAD_UNCHANGED)
print('Original Dimensions : ',img.shape)

# Set % of original size,
# Eamples: use 50 to halve the size, 200 to double its size.
scale_percent = 50


width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)

# If you prefer to manually add your own width and height
# then un-rem the following two lines, and fill in the values:
# width = ?
# height = ?

dim = (width, height)

# resize image
resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
print ('Scale ', scale_percent, '%')
print('Resized Dimensions : ',resized.shape)

# Display.
cv2.imshow("Original image", img)
cv2.imshow("Resized image", resized)

# Save.
cv2.imwrite('resized.jpg', resized)
print ("Resized image saved as: resized.jpg")

# Wait any key.
cv2.waitKey(0)

# Close.
cv2.destroyAllWindows()
