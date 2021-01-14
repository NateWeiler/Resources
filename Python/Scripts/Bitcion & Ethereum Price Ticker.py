"""
Python code snippets vol 36:
178-Bitcion and Ethereum price ticker.
stevepython.wordpress.com

Reports price of BTC or ETH, if changed, every 60 seconds in the shell.

source:
https://gist.github.com/Dogeek/a09e9d29ee301aa58e408e6eeba6d426
"""
import time
import requests

api_url_formatter = "https://api.coinmarketcap.com/v1/ticker/{}"
api_names = {
    "btc": "bitcoin",
    "eth": "ethereum",
}


def get_latest_price(currency_code):
    """Retrive latest price of selected crpto currency."""
    response = requests.get(api_url_formatter.format(api_names[currency_code.lower()]))
    if response.status_code == 200:
        return response.json()[0]['price_usd']
    else:
        raise Exception("Response didn't return a 200 status code.")


usr_input = None
while usr_input not in ("eth", "btc"):
    usr_input = input("Enter ETH/BTC : ").lower()

last_price = -1

while True:
    price = get_latest_price(usr_input)
    if price != last_price:
        print(f"Price : {price}")
        last_price = price
    time.sleep(60)  # sleeps for a minute
