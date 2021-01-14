'''
    47-Randomly shuffle string
    Steve Shambles Jan 2019
    https://stevepython.wordpress.com
    You may need to:
    "pip install python-string-utils"
'''

import string_utils

OUT_COME = "12345"

# Randomly shuffle "OUT_COME" string.
SHUFF = (string_utils.shuffle(OUT_COME))

# Display shuffled up string, note that original
# string still intact in "OUT_COME".
print(SHUFF)
