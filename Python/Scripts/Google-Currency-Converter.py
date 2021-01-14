#!python3

# Google Currency Converter (Exchange Rates)

# Convert between one currency and another using google calculator. Results are real time and can change at any time based on the current exchange rate according to google.

# Convert 5 US Dollars to Euros using the official 3 letter currency acronym:
euros = Google.convert_currency(5.0, "USD", "EUR")
print "5.0 USD = {0} EUR".format(euros)

5.0 USD = 3.82350692 EUR


# Convert 1000 Japanese Yen to US Dollars:
yen = Google.convert_currency(1000, "yen", "us dollars")
print "1000 yen = {0} us dollars".format(yen)

1000 yen = 12.379 us dollars


# Instead you can get the exchange rate which returns what 1 from_currency equals in to_currency and do your own math:
rate = Google.exchange_rate("dollars", "pesos")
print "dollars -> pesos exchange rate = {0}".format(rate)

dollars -> pesos exchange rate = 13.1580679


# Perform your own math. The following 2 statements are equal:
# 5.0 * Google.exchange_rate("USD", "EUR")

# Google.convert_currency(5.0, "USD", "EUR")


# As a side note, convert_currency is always more accurate than performing your own math on exchange_rate because of possible rounding errors. However if you have more than one value to convert it is best to call exchange_rate and cache the result to use for multiple calculations instead of querying the google server for each one.
