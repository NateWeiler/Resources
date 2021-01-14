'''
   46.2-Store Variables To File and retrieve.
   By Steve Shambles March 2019
   https://stevepython.wordpress.com
'''
import os

# Example variables, HIGH_SCORE, LIVES_LEFT and CURR_SCORE
my_vars = ["1768","3","200"]

with open("my_vars.txt", 'w') as f:
    for my_var in my_vars:
        f.write(my_var)
        f.write("\n")

# Load back the variables.
with open("my_vars.txt", 'r') as f:
    HS = f.readline()
    HIGH_SCORE = HS.rstrip('\n')
    print (HIGH_SCORE)
    LL = f.readline()
    LIVES_LEFT = LL.rstrip('\n')
    print (LIVES_LEFT)
    CS = f.readline()
    CURR_SCORE = CS.rstrip('\n')
    print (CURR_SCORE)

os.startfile('my_vars.txt')
