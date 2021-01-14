'''
21-Doc To Text File.
Extract text only from .doc files (not .docx files)

You may need to "pip install pywin32",
and\or "pip install win32com".
'''
import win32com.client

# You need Microsoft Word installed for this to work.
WORD = win32com.client.Dispatch("Word.Application")
WORD.visible = False

# Change "test.doc" to your .doc file.
WB = WORD.Documents.Open(r"c:\temp\test.doc")
DOC = WORD.ActiveDocument

# Save as a text file.
with open(r"c:\temp\converted.txt", "w", encoding="utf-8") as file:
    file.write(DOC.Range().Text)

# View text in shell if required.
print(DOC.Range().Text)
