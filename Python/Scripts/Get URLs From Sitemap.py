''' 32-Get URL's From Sitemap '''

import os
from urllib.request import urlopen
from bs4 import BeautifulSoup


PAGES = []

# Insert your url here.
REQUEST = "https://stevepython.wordpress.com/sitemap.xml"
F = urlopen(REQUEST, timeout=3)
XML = F.read()

SOUP = BeautifulSoup(XML)
URLTAGS = SOUP.find_all("url")

# Output to shell, delete these 3 print lines if not required.
print("Sitemap for:", REQUEST)
print("urls found:", str(len(URLTAGS)))
print()

# Save urls to text file.
with open(r"c:\temp\test.txt", "w") as file:
    file.write(REQUEST)
    file.write("\nurls found:"+str(len(URLTAGS)))
    file.write("\n\n")

    for sitemap in URLTAGS:
        link = sitemap.findNext("loc").text
        PAGES.append(link)
        file.write(link)
        file.write("\n\n")

print(PAGES, "\n\nSaved links to text file")
os.startfile(r"c:\temp\test.txt")
