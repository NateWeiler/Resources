import urllib.request,urllib.error,urllib.parse
from bs4 import BeautifulSoup
url='http://py4e-data.dr-chuck.net/comments_319939.html'
html=urllib.request.urlopen(url).read()
soup=BeautifulSoup(html,'html.parser')
tags=soup('span')
sum=0
for tag in tags:
    sum=sum+int(tag.contents[0])
print(sum)