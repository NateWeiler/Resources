# 44-Search For File Type

import os

newlist = [f for f in os.listdir('.') if f.endswith('.txt')]
print (newlist)
