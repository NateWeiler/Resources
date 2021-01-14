'''
91-Get Tweets - No API

Tested on Linux Mint and Windows 7

More code chaos at:
https://stevepython.wordpress.com/

pip3 install pyquery
pip3 install tweetlib

source:
https://github.com/wyattferguson/tweetlib
'''

from tweetlib import tweetlib

# Get tweets by username
ts = tweetlib.TweetLib(username="steve_chance", max_tweets=3)
tweets = ts.get_tweets()

print(tweets)

# Search for tweets
#ts = tweetlib.TweetLib(query_search="python", since="2019-04-04")
#tweets = ts.get_tweets()
