# 40-Google News RSS feed

from urllib.request import urlopen
from bs4 import BeautifulSoup as soup

def news(xml_news_url):
    ''' Print News'''
    gnews_client = urlopen(xml_news_url)
    xml_page = gnews_client.read()
    gnews_client.close()
    soup_page = soup(xml_page, "xml")
    news_list = soup_page.findAll("item")

    for google_news in news_list:
        print(google_news.pubDate.text)
        print(google_news.title.text)
        print(google_news.link.text)
        print("\n\n")

GNEWS_URL = "https://news.google.com/news/rss/?ned=uk&gl=US&hl=en"

news(GNEWS_URL)
