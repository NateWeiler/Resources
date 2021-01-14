''' 30-Get file size '''
import os
STATINFO = os.stat('test.jpg')
FILESIZE = (STATINFO.st_size)
print(FILESIZE, "Bytes")
