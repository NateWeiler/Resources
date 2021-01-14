'''04-Check if directory exists, if not, create it'''
import os

# You should change 'test' to your preferred folder.
MYDIR = ("test")
CHECK_FOLDER = os.path.isdir(MYDIR)

# If folder doesn't exist, then create it.
if not CHECK_FOLDER:
    os.makedirs(MYDIR)
    print("created folder : ", MYDIR)

else:
    print(MYDIR, "folder already exists.")
