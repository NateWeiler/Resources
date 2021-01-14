'''
85-Get total folder size
'''

import os

# Enter folder to check here:

# On Windows use something like this
direc_tory = r"C:\temp"

# On Linux use something like this
#direc_tory = "/home/shambles"

# Make sure it exists, if not quit.
check_dir = os.path.isdir(direc_tory)
if not check_dir:
    print(direc_tory, "does not exist")
    exit(0)

# Set up sizes in a dictionary
dir_size = 0
fsize_dict = {'Bytes': 1,
             'Kbs  ': float(1) / 1024,
             'Meg  ': float(1) / (1024 * 1024),
             'Gig  ': float(1) / (1024 * 1024 * 1024)}

# Calculate sizes of all files in dir and sub dirs.
for (path, dirs, files) in os.walk(direc_tory):
    for file in files:
        filename = os.path.join(path, file)
        dir_size += os.path.getsize(filename)

# Add to dict.
fsizeList = [str(round(fsize_dict[key] * dir_size, 2)) + " "  \
             + key for key in fsize_dict]

# Output result.
print()
print ("Total size of contents of", direc_tory)
print("-" * 35)

if dir_size == 0: print ("Dude, that folder is empty.")

else:
  for units in sorted(fsizeList)[::-1]:
      print()
      print (units)
