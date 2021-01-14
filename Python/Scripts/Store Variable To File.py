'''
   46-Store Variable To File.

   Save and load variable to a text file
   for later retrieval

   By Steve Shambles Dec 2018
   https://stevepython.wordpress.com
'''
import os

# Example variable
HIGH_SCORE = 1768

# Save the variable HIGH_SCORE to a file named "high_score.txt".
# Change as required.

with open("high_score.txt", 'w') as contents:
    # Need to convert to string to save.
    SAVE_IT = str(HIGH_SCORE)
    contents.write(SAVE_IT)
    print("saved")

# Load back the variable.
with open("high_score.txt", 'r') as contents:
    SAVED_HIGH_SCORE = contents.read()

    # Convert back to to integer.
    if SAVED_HIGH_SCORE > "":
        HIGH_SCORE = int(SAVED_HIGH_SCORE)
        print("Loaded...", HIGH_SCORE)

# Display high_score text in notepad.
os.startfile('high_score.txt')

# Note: PEP8 advises that constants should be all
# UPPER_CASE, this explains why three of my variables
# are so.
