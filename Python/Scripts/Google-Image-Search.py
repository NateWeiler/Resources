#!python3

# Google Image Search

# Searches google images for a list of images. Image searches can be filtered to produce better results.

Perform a google image search on “banana” and filter it:
options = ImageOptions()
options.image_type = ImageType.CLIPART
options.larger_than = LargerThan.MP_4
options.color = "green"
results = Google.search_images("banana", options)

# Sample Result:
# {'domain': u'exitrealworld.com',
#  'filesize': u'4054k',
#  'format': u'jpg',
#  'height': u'3103',
#  'index': 0,
#  'link': u'http://www.exitrealworld.com/tools_v2/resources/9e55471ba84686ade677ffe595c45992/upload_images/YELLOW_BANANA.jpg',
#  'name': u'Lib Tech Skate Banana BTX',
#  'page': 0,
#  'thumb': u'http://t3.gstatic.com/images?q=tbn:ANd9GcRzvAUW0en9eZTag3giWelcQ_xbrnBMXVChb3RU3v4HtEgxN3RMS0bSdidf',
#  'width': u'3104'}

# Filter options:
ImageOptions:
    image_type # face, body, clipart, line drawing
    size_category # large, small, icon
    larger_than # the well known name of the smallest image size you want
    exact_width # the exact width of the image you want
    exact_height # the exact height of the image you want
    color_type # color, b&w, specific
    color # blue, green, red


# Enums of values that can be used to filter image searches:
class ImageType:
    NONE = None
    FACE = "face"
    PHOTO = "photo"
    CLIPART = "clipart"
    LINE_DRAWING = "lineart"

class SizeCategory:
    NONE = None
    ICON = "i"
    LARGE = "l"
    MEDIUM = "m"
    SMALL = "s"
    LARGER_THAN = "lt"
    EXACTLY = "ex"

class LargerThan:
    NONE = None
    QSVGA = "qsvga" # 400 x 300
    VGA = "vga"     # 640 x 480
    SVGA = "svga"   # 800 x 600
    XGA = "xga"     # 1024 x 768
    MP_2 = "2mp"    # 2 MP (1600 x 1200)
    MP_4 = "4mp"    # 4 MP (2272 x 1704)
    MP_6 = "6mp"    # 6 MP (2816 x 2112)
    MP_8 = "8mp"    # 8 MP (3264 x 2448)
    MP_10 = "10mp"  # 10 MP (3648 x 2736)
    MP_12 = "12mp"  # 12 MP (4096 x 3072)
    MP_15 = "15mp"  # 15 MP (4480 x 3360)
    MP_20 = "20mp"  # 20 MP (5120 x 3840)
    MP_40 = "40mp"  # 40 MP (7216 x 5412)
    MP_70 = "70mp"  # 70 MP (9600 x 7200)

class ColorType:
    NONE = None
    COLOR = "color"
    BLACK_WHITE = "gray"
    SPECIFIC = "specific"
