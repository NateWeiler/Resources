"""
Python code snippets vol 34:

166-Merge Two or more PDFS into one
stevepython.wordpress.com

pip3 install PyPDF2

Tested on: Win 7\Linux Mint 19.1

Source:
https://snipplr.com/view/328728/merge-multiple-pdf-documents/
"""

import time
import os
from PyPDF2 import PdfFileMerger

# Any .pdf files found in current dir will be merged into one pdf file.
allPDFs = [a for a in os.listdir() if a.endswith(".pdf")]

dtFname = time.strftime("%Y%m%d_%H%M%S")
merger = PdfFileMerger()

for pdf in allPDFs:
    merger.append(pdf)

merger.write(dtFname + ".pdf")
