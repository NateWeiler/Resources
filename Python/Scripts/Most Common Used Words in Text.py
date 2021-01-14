'''Most common words used in a text file.

   I found this great snippet here:
   https://python-forum.io/Thread-Python-word-counter-and-ranker

   I added comments, ideas, PEP8.

   For more snippets:
   https://stevepython.wordpress.com/

   This is similar, but better, than snippet 29.
'''

from collections import Counter
import re

# Loads in a text file called test.txt from current dir.
with open('test.txt') as f:
    TEXT = f.read().lower()

WORDS = re.findall('\w+', TEXT)
TOP_WORDS = Counter(WORDS).most_common(10) # Change the 10 to whatever you like

for word, count in TOP_WORDS:
    print(f'{word:<4} {"-->":^4} {count:>4}')

# It would be awesome to check for and remove STOP words
# E.g: is, at, the, I, to, a, was, we, for etc.
# Then this could be used to look at keyword usage.
