'''
28-Get synonyms from Thesaurus
You may need to pip install thesaurus
'''
from thesaurus import Word

USERS_WORD = Word('humbug')
print(USERS_WORD.synonyms(1))
