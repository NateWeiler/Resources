'''
   63-Replace Defined Chars In String
   Using Maketrans and translate to replace parts of strings.
'''

# Example, make all vowels uppercase.
# Change these to anything you want,
# but must be same length.
replace_these = "aeiou"
with_these = "AEIOU"

tranny = str.maketrans(replace_these, with_these)

text_string = "You can replace any character with any other using maketrans."
print(text_string.translate(tranny))
