import urllib.request as ur
import json
url=input()
data=ur.urlopen(url).read().decode()
json=json.loads(data)
comments=json['comments']
sum=0
for comment in comments:
    sum=sum+comment['count']
print(sum)
