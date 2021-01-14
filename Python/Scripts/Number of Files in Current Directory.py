#!python

# Number of Files in Current Directory

import os

num_of_files = len(os.listdir('.'))

print("files found:", num_of_files)
