#!Python3

# Extract text from Webpage

import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.goanywhere.com/blog/2019/03/28/pgp-vs-gpg-whats-the-difference#:~:text=GPG%20%E2%80%93%20GNU%20Privacy%20Guard,stands%20for%20GNU%20Privacy%20Guard.&text=GPG%20is%20defined%20by%20RFC,and%20operating%20systems%20like%20Linux.')
soup = BeautifulSoup(response.text, 'html.parser')
# Print the body content in list form
print(soup.body.contents[0])
# Print the first found div on html page
print(soup.find('div'))
# Print the all divs on html page in list form
print(soup.find_all('div'))
# Print the element with 'required_element_id' id
print(soup.find(id='required_element_id'))
# Print the all html elements in list form that matches the selectors
print(soup.select(required_css_selectors))
# Print the attribute value in list form
print(soup.find(id='someid').get("attribute-name"))
# You can also break your one large query into multiple queries
parent = soup.find(id='someid')
# getText() return the text between opening and closing tag
print(parent.select(".some-class")[0].getText())
