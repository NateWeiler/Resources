''' 29-Word frequency in a text '''
import re

FREQUENCY = {}
DOC_TXT = open(r'c:\temp\test.txt', 'r', encoding="utf-8")
TXT_STR = DOC_TXT.read().lower()
MATCH_PAT = re.findall(r'\b[a-z]{3,15}\b', TXT_STR)

for word in MATCH_PAT:
    count = FREQUENCY.get(word, 0)
    FREQUENCY[word] = count + 1

FREQ_LIST = FREQUENCY.keys()
print("Words used 5 times or more:")
for words in FREQ_LIST:
    if FREQUENCY[words] > 4:
        print(words, FREQUENCY[words])
