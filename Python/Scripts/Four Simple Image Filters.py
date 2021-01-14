'''
24-Four simple image filters
This snippet is a replacement for 24-duck duck go search results
snippet that stopped working.

pip install Pillow

https://pillow.readthedocs.io/en/3.1.x/reference/ImageEnhance.html
'''

from PIL import Image,ImageFilter
from PIL import ImageEnhance

#Read and display image
im = Image.open('test1.jpg')
im.show("original")

# Choose your filter(s)
#
enh = ImageEnhance.Color(im)
#enh = ImageEnhance.Contrast(im)
#enh = ImageEnhance.Brightness(im)
#enh = ImageEnhance.Sharpness(im)

#A floating point value controlling the enhancement value.
#1.0 always returns a copy of the original image,
#lower factors mean less color, brightness, contrast, etc eg -1.4,
#and higher values more. There are no restrictions on this value.
enh.enhance(1.5).show("enhanced")
