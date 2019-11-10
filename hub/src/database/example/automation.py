from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.soil_collection

import datetime
data = [{
	"sensor": "testcase",
	"number": 0,
	"sunlight": "0",
	"temperature": 0,
	"moisture": "0",
	"phosphate": "0",
	"date": datetime.datetime.utcnow()
},
{
	"sensor": 1,
	"sunlight": "71%",
	"temperature": 8,
	"moisture": "54%",
	"phosphate": "11%",
	"date": datetime.datetime.utcnow()
},
{
	"sensor": 2,
	"sunlight": "64%",
	"temperature": 80,
	"moisture": "52%",
	"phosphate": "11%",
	"date": datetime.datetime.utcnow()
},
{
	"sensor": 3,
	"sunlight": "70%",
	"temperature": 84,
	"moisture": "30%",
	"phosphate": "11%",
	"date": datetime.datetime.utcnow()
},
{
	"sensor": 4,
	"sunlight": "72%",
	"temperature": 81,
	"moisture": "40%",
	"phosphate": "11%",
	"date": datetime.datetime.utcnow()
},
{
	"sensor": 5,
	"sunlight": "71%",
	"temperature": 76,
	"moisture": "66%",
	"phosphate": "9%",
	"date": datetime.datetime.utcnow()
}
]

soil_data = db.soil_data
data_id = soil_data.insert_many(data).inserted_ids
data_id

db.list_collection_names()
