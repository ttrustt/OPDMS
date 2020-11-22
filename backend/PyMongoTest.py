from pymongo import MongoClient

def findUDbyPID(pid):
    client = MongoClient('35.185.182.63', 27018)
    db = client.opdms
    collection = db.underlying_disease
    result = []
    x = collection.find({"patient_id":pid})
    return x[0]['undertlying_disease']

def findExbyDID(did):
    client = MongoClient('35.185.182.63', 27018)
    db = client.opdms
    collection = db.expertise
    x = collection.find({"doctor_id":did})
    return x[0]['expertise']

def findFMbyPID(pid):
    client = MongoClient('35.185.182.63', 27018)
    db = client.opdms
    collection = db.food_medicine_limitation
    result = []
    x = collection.find({"patient_id":pid})
    return x[0]['fm_limitation']

print(findFMbyPID(5))