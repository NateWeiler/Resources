
import urllib2
import urllib
import json


def getFromJson(response):
	jsonvalues = json.loads(response)  # jsonvalues is a dict
	definations = jsonvalues["definitions"]
	print "Meaning: "
	for i in range(0,len(definations)):
		print i+1,"." ,definations[i]["text"]



## url for calling api
url = "https://montanaflynn-dictionary.p.mashape.com/define?word=lexicon"
# compulsory parameters for api 
headers = { 'X-Mashape-Key' : "	GET-YOUR-KEY",
			"Accept": "application/json" }
url_values = urllib.urlencode(headers)	
#sending request to server		
request = urllib2.Request(url,headers=headers)
response =urllib2.urlopen(request).read()
#decoding json 
getFromJson(response)

