'''Do a Google search and return results'''
# you may need to first "pip install google"

import webbrowser
from googlesearch import search

QUERY = "Python blogs"

#change tld to "co.uk" or whatever,num=results to get
for RESULTS in search(QUERY, tld="co.uk", num=10, stop=1, pause=1):
    print(RESULTS)
webbrowser.open(RESULTS)
