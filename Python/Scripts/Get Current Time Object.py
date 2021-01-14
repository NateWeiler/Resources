## Get-Current-Time-Object.py

from datetime import datetime

now = datetime.now().time() # time object

print("now =", now)
print("type(now) =", type(now))
