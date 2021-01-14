'''

   50-Get image type from header

   Steve Shambles Jan 2019

   For more snippets:
   https://stevepython.wordpress.com/

'''

from tkinter import Tk, filedialog
import imghdr

# Stop naff unused Tk GUI window showing.
ROOT = Tk()
ROOT.withdraw()

# Ask user to select an image file.
FILE_SELECTED = filedialog.askopenfilename(title='Select Image')

# Query imghdr and print result.
print(imghdr.what(FILE_SELECTED))

# If the file format is unknown, (or not an image), returns NONE,
# otherwise returns file type by inspecting the header of the file,
# which is more reliable then taking the word of the files extension
