import re
sm=0
file = open ('123.txt','r');
for line in file:
	line=line.strip()
	num=re.findall('[0-9]+',line)
	num=map(int,num)
	sm=sm+sum(num)
print(sm)
