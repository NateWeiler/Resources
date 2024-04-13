# Crawl FB events from calendar

from bs4 import BeautifulSoup
import requests

def get_website_news_links_thalheimCh():
        
    url = 'https://thalheim.ch/index.php/aktuell/veranstaltungen'
    
    response = requests.get(url, allow_redirects=True)
    print("Response for", url, response)

    soup = BeautifulSoup(response.content, 'html.parser')

    all_links = soup.select('table tbody tr div.fc-daygrid-day-events a')
    print(all_links)

result = get_website_news_links_thalheimCh()
