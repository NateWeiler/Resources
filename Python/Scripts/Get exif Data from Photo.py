'''
    23-Get EXIF data from a photo
    pip install Pillow

    Go here for example images with EXIF data in them:
    https://github.com/ianare/exif-samples/tree/master/jpg
'''
from tkinter import Tk, filedialog
import PIL.Image
import PIL.ExifTags

#Open file dialog
ROOT = Tk()
ROOT.withdraw()

FILE_SELECTED = filedialog.askopenfilename(title='Select an image file')


IMG = PIL.Image.open(FILE_SELECTED)

EXIF = {
    PIL.ExifTags.TAGS[k]: v
    for k, v in IMG._getexif().items()
    if k in PIL.ExifTags.TAGS
}
print(EXIF)

if not EXIF:
    print ("no data found")
