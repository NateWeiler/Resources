"""
Python code snippets vol 35:
174-Get current weather
stevepython.wordpress.com

pip3 install pyowm
requires api key from: https://openweathermap.org/api
"""
import pyowm

owm = pyowm.OWM('28c8c848ab4bece39561db462c462231')

# Search for current weather in London (Great Britain)
observation = owm.weather_at_place('London,GB')
w = observation.get_weather()

#print("Current weather:", w)
print("Current status:", w.get_detailed_status())
print("wind speed:", w.get_wind())
print("Humidity %:", w.get_humidity())
print("Temperature:", w.get_temperature('celsius'))
print("Sunrise:", w.get_sunrise_time('iso'))
print("Sunset:", w.get_sunset_time('iso'))
