from pymongo import MongoClient

def findUDbyPID(pid):
    client = MongoClient('35.185.182.63', 27018)
    db = client.opdms
    collection = db.underlying_disease
    result = []
    x = collection.find({"patient_id":"PT9yhi2zh4"})
    return x[0]['undertlying_disease']

print(findUDbyPID('PT9yhi2zh4'))