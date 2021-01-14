'''
99-Photo cartoonizer
Tested on Python V3.6 on Windows 7 and Linux Mint 19.1.

pip3 install opencv-python
'''
import cv2

image = cv2.imread('pond.png')
img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
img_gray = cv2.medianBlur(img_gray, 5)
edges = cv2.Laplacian(img_gray, cv2.CV_8U, ksize=5)
ret,mask =cv2.threshold(edges,100,255,cv2.THRESH_BINARY_INV)
image2 = cv2.bitwise_and(image, image, mask=mask)
image2 = cv2.medianBlur(image2, 5)
cv2.imshow("", mask)
cv2.imwrite("cartooned.jpg", mask)
