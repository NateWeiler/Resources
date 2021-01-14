import json
import pygal

# open a "file" with the same name as the tab
f = open('aapl.json', 'r')
data = ''.join(f.readlines())

# use the json module to parse and load the data
data = json.loads(data)

x_labels = []
close_price = []
for day in data[::-1]:
  x_labels.append(day['Date'])
  close_price.append(day['Close'])

# use the pygal charting library to display a chart
line_chart = pygal.Line()
line_chart.title = "Apple, Inc. stock price for December 2014"
line_chart.add('Price', close_price)

line_chart.render()