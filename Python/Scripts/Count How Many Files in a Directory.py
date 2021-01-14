'''Count how many files in a directory'''
import os

# Change to your desired path.
FOLDER_SELECTED = r"c:\temp"

NUM_OF_FILES = next(os.walk(FOLDER_SELECTED))[2]
NOFF = (len(NUM_OF_FILES))

# NOFF = files found. Sub dirs are not counted.
print(NOFF)
