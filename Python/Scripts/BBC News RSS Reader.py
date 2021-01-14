''' BBC News RSS Feed reader, news headlines from last 7 days'''
import urllib.request
import xml.etree.ElementTree as  ElementTree

URL = "http://feeds.bbci.co.uk/news/rss.xml"
REQ = urllib.request.urlopen(URL)
PAGE = REQ.read()
DOC = ElementTree.fromstring(PAGE)

for item in DOC.iter('item'):
    title = item.find('title').text
    print("---")
    pubDate = item.find('pubDate').text
    print(pubDate.strip())
    print(title.strip())
    link = item.find('link').text
    print(link.strip())

# Pylint rated 8.75, says 2nd import is useless, as
# does not rename original package.
# But this script wont run without it.
