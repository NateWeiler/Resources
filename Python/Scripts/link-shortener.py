﻿# link shortener

## run pip install pyshorteners in terminal first

import pyshorteners
link_input  = input('What link would you like to shorten?\n')
link = link_input
shortener = pyshorteners.Shortener()
url = shortener.tinyurl.short(link)
print(url)