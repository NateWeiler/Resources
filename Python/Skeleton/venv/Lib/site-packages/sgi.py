import os
import json
import shutil
import requests
import argparse
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(__file__)

def get_url(query):
    query_chunks = query.split()
    proper_query = '+'.join(query_chunks)
    google_endpoint = 'https://www.google.co.in/search?q='
    return google_endpoint + proper_query + '&tbm=isch'

def get_headers(**kwargs):
    kwargs['user-agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36'
    return kwargs

def perform_google_image_search(query):
    url = get_url(query)
    headers = get_headers()
    return requests.get(url, headers=headers)

def extract_image_urls_from_search_results(response, nos):
    image_urls = []
    image_count = 0
    soup = BeautifulSoup(response.content, 'html.parser')
    for data in soup.find_all("div", {"class":"rg_meta"}):
        image_count += 1
        image_url = json.loads(data.contents[0])["ou"]
        image_urls.append(image_url)
        if image_count >= nos:
            break
    return image_urls

def save_image(content=None, name=None):
    if content and name:
        with open(name, 'wb') as o:
            shutil.copyfileobj(content, o)

def download_images(image_urls, path):
    for count, url in enumerate(image_urls):
        try:
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                name = url.split('/')[-1]
                if path:
                    name = os.path.join(path, name)
                save_image(response.raw, name)
        except Exception as ex:
            pass

def main():
    parser = argparse.ArgumentParser(description='Scrap google images')
    parser.add_argument('--path', type=str, required=True, help='path to save images')
    parser.add_argument('--query', type=str,  required=True, help='search keywords eg: broken mirrors')
    parser.add_argument('--nos', type=int, default=10, help='number of images you want to download')
    args = parser.parse_args()
    response = perform_google_image_search(args.query)
    image_urls = extract_image_urls_from_search_results(response, args.nos)
    download_images(image_urls, args.path)

if __name__ == '__main__':
    main()
