# link shortener

## run pip install pyshorteners in terminal first

import pyshorteners
link_input  = input('https://nateweiler.github.io/NateWeiler.io/\n')
link = link_input
shortener = pyshorteners.Shortener()
url = shortener.tinyurl.short(link)
print(url)