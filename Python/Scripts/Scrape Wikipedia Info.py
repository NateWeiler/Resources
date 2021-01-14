''' 34-Scrape Wikipedia info'''

# You will probably need to 'pip install wikipedia' first.
import wikipedia

# Get summary, change to topic you prefer.
RESULT = wikipedia.page('python programming language')
print(RESULT.summary)

# Get list of links from the page.
# Personally I comment these lines out.
for link in RESULT.links:
    print(link)
