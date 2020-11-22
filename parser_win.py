import json
inFile = open("imageexperiments-988de-export.json", "r", encoding="utf-8")
outFile = open("imageexperiments.csv", "w", encoding="cp1251", newline='\n')
jsonstr = inFile.read()
data = json.loads(jsonstr)['atms']
print(data.items())
for key, value in data.items():
	outFile.write(value[0]['age'] + ';')
	outFile.write(value[0]['identity'])
	for i in value[1]:
		outFile.write(';' + str(i))
	outFile.write('\n')
print("Done")
outFile.close()