from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.opdms
collection = db.underlying_disease_
x = collection.find({"underlying_disease":"N185"})
for i in x:
    print(i)