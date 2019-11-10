from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.soil_collection
soil_data = db.soil_data


import datetime

sunlights = []
temperatures = []
moistures = []
phosphates = []

for data_id in soil_data.find():
    sunlights.append(data_id['sunlight'])
    temperatures.append(data_id['temperature'])
    moistures.append(data_id['moisture'])
    phosphates.append(data_id['phosphate'])

for sunlight in sunlights:
    print(sunlight)

for temperature in temperatures:
    print(temperature)

for moisture in moistures:
    print(moisture)

for phosphate in phosphates:
    print(phosphate)
