'''Get definitions for a word'''
# Do a "pip install PyDictionary" from command line first.
from PyDictionary import PyDictionary

DICT = PyDictionary()
CHECK_WORD = "house"
print(DICT.meaning(CHECK_WORD))
print("-----------")
print(DICT.synonym(CHECK_WORD))
print("-----------")
print(DICT.antonym(CHECK_WORD))
print("-----------")
print("French translation:")
print (DICT.translate(CHECK_WORD,'fr'))

# Note ignore the warnings, this wouldn't show up in a GUI,
