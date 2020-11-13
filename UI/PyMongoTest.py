from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.opdms
collection = db.underlying_disease_
print(collection.find_one())