#! /usr/bin/env python

# Clone or update all the GitHub gists of the current GitHub user into working directory
# Specify GitHub username in the GITHUB_USER environment variable, i.e.
# git config --global user.name "NateWeiler"

# To execute, copy script into a ~/gists directory, and 'python gist-backup.py'
# This will git clone every public and private gist of GITHUB-USER into that folder
# as well as a contents.txt folder.

from __future__ import print_function
import json
import urllib
from subprocess import call
import os
import math

try:
    from urllib.request import urlopen
except ImportError:
    from urllib2 import urlopen

if 'GITHUB_USER' in os.environ:
    USER = os.environ['GITHUB_USER']
else:
    USER = os.environ['USER']

perpage = 30
userurl = urlopen('https://api.github.com/users/' + USER)
public_gists = json.load(userurl)
gistcount = public_gists['public_gists']
print("Found gists: " + str(gistcount))
pages = int(math.ceil(float(gistcount) / perpage))
print("Found pages: " + str(pages))

f = open('./contents.txt', 'w+')

for page in range(pages):
    pageNumber = str(page + 1)
    print("Processing page number " + pageNumber)
    pageUrl = 'https://api.github.com/users/' + USER  + '/gists?page=' + \
        pageNumber + '&per_page=' + str(int(perpage))
    u = urlopen (pageUrl)
    gists = json.load(u)
    startd = os.getcwd()
    for gist in gists:
        gistd = gist['id']
        gistUrl = 'https://gist.github.com/' + gistd + '.git'
        if os.path.isdir(gistd):
            os.chdir(gistd)
            call(['git', 'pull', gistUrl])
            os.chdir(startd)
        else:
            call(['git', 'clone', gistUrl])
        if gist['description'] == None:
            description = ''
        else:
            description = gist['description'].encode('utf8').\
                replace("\r", ' ').replace("\n", ' ')
        print(gist['id'], gistUrl, description, file=f)
