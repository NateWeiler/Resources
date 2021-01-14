'''
73-Zoom And Save Image

pip install matplotlib
'''

from matplotlib import pyplot as plt
import matplotlib.image as mpimg

img = mpimg.imread("test.jpg")
plt.imshow(img)

# This hides the values on X and Y axis,
# remove hash if you dont want these values displayed.
#plt.xticks([]), plt.yticks([])

plt.show()
