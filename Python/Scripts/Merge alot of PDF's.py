#! python
# Merging multiple PDFs with same name into a single PDF using a Python script

from PyPDF2 import PdfFileMerger, PdfFileReader
 
# Call the PdfFileMerger
mergedObject = PdfFileMerger()
 
# I had 116 files in the folder that had to be merged into a single document
# Loop through all of them and append their pages
for fileNumber in range(1, 117):
    mergedObject.append(PdfFileReader('6_yuddhakanda_' + str(fileNumber)+ '.pdf', 'rb'))
 
# Write all the files into a file which is named as shown below
mergedObject.write("mergedfilesoutput.pdf")