  
import urllib.request as ur
import xml.etree.ElementTree as et

url = input('Enter location: ')

total_number = 0
sum = 0

xml = ur.urlopen(url).read()
tree = et.fromstring(xml)
counts = tree.findall('.//count')
for count in counts:
    sum += int(count.text)
    total_number += 1

print('Count:', total_number)
print('Sum:', sum)