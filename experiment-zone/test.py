import requests
import json

data = page.json()

outFile = open('sample.json', 'w+')
json.dump(data, outFile, ensure_ascii=False, indent=4)