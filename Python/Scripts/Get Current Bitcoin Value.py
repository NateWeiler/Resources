''' 18-Get current Bitcoin value '''

import requests

CBV = requests.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
for coin in CBV.json():
    print("Current USD$ price for 1 Bitcoin")
    print(coin["price_usd"])
