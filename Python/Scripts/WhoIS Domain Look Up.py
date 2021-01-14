'''Whois look up'''

#first you need to pip install python-whois
import whois

w = whois.whois('https://wordpress.com')

print(w)
