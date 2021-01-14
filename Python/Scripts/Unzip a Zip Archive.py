# 65-Unzip a zip archive

import zipfile

# Requires a zip archive called 'test.zip'
# in current directory.

un_zip = zipfile.ZipFile('test.zip')

# Will unzip contents of test.zip
# in same directory as .zip file.
un_zip.extractall()


# This will print out files found in the archive.
print (un_zip.namelist())
