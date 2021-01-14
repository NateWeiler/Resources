# 68-OCR Text From Image
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = \
r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe'

value=Image.open("test.png")
text = pytesseract.image_to_string(value, config='')
print (text)
