'''
38-Number Of Words In A Text File
'''

# have a text file called "test.txt" in current dir
fname ="test.txt"

num_words = 0

with open(fname, 'r', encoding="utf-8-sig") as f:
    for line in f:
        words = line.split()
        num_words += len(words)

print (str(num_words)+" words found in "+str(fname))
