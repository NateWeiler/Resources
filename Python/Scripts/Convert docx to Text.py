'''Convert a .Docx file to text'''

#You may first need to: pip install docx2txt

import docx2txt

#replace following line with location of your .docx file
MY_TEXT = docx2txt.process("test.docx")

print(MY_TEXT)
