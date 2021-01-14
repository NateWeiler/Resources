# 43-Password Generator
import random

s1 = 'qwertyuiopasdfghjklzxcvbnm'
s2 = s1.upper()
s3 = '1234567890'
s4 = '!@#$%^&*()_+=-'
s = s1+s2+s3+s4

password = ''
for x in range(1, 9):
    password = password + random.choice(s)
print(password)
