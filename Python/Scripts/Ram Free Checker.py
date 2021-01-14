'''
83-Ram Free Checker
pip install psutil
http://www.orangetool.ir/index.html
'''

import psutil

def convert_bytes(num):
    for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0

# Total ram.
response=list(psutil.virtual_memory())
print("Total Ram:", convert_bytes(int(response[0])))

# Ram used.
response=list(psutil.virtual_memory())
print("Ram used :", convert_bytes(int(response[3])))

# Ram free.
response=list(psutil.virtual_memory())
print("Ram Free :", convert_bytes(int(response[1])))

# Ram free percent.
response=list(psutil.virtual_memory())
print("Ram Free :", str(response[2])+" %")
