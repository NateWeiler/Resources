'''
79-Rotate Image

pip install opencv-python
'''
import cv2

# Load image.
img = cv2.imread('pond.png')
rows,cols = img.shape[:2]

# rot_angle value, try, 45,90,135,180 etc
rot_angle = 180

# Find centre of image to rotate.
rot_mat = cv2.getRotationMatrix2D((cols/2,rows/2),rot_angle,1)

# Rotate.
rotate = cv2.warpAffine(img,rot_mat,(cols,rows))

# Save.
cv2.imwrite('rotated.jpg', rotate)

# Print info.
message = str(rot_angle)+str(" degrees")
print ("Image rotated", str(message))
print ("Rotated image saved as: rotated.jpg")
print("Press any key to close")

# Display.
cv2.imshow("Original Image", img)
cv2.imshow("Image rotation", rotate)
cv2.waitKey(0)

# Close.
cv2.destroyAllWindows()
