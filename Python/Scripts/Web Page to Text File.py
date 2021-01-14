'''16-Web Page To Text File'''

# You will need to have these installed:
# pip install beautifulsoup4
# pip install lxml

import urllib.request
import bs4 as bs

# You will want to change this example URL.
SOURCE = urllib.request.urlopen('https://docs.python.org/3/whatsnew/3.7.html').read()
SOUP = bs.BeautifulSoup(SOURCE, 'lxml')
BODY = SOUP.body

# You may want to change where to save the text file.
with open("test.txt", "w", encoding="utf-8") as file:

    for paragraph in BODY.find_all('p'):
        file.write(paragraph.text)
        # Remove line below if you don't want to see output in shell.
        print(paragraph.text)
