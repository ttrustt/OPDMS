from pymongo import MongoClient
import pymongo

def findUDbyPID(pid):
    message = 'error'
    try : 
        client = MongoClient('35.185.182.63', 27018)
        print(1)
        db = client.opdms
        print(2)
        collection = db.underlying_disease
        print(3)
        x = collection.find({"patient_id":pid})
        print(x)
        print(x[0])
        print(4)
        message = (True,"Success", x[0]['underlying_disease'])
    except Exception as e : 
        message =  (False,"Error in findUDbyPID",e)
    client.close()
    return message

def findExbyDID(did):
    message = 'error'
    try : 
        client = MongoClient('35.185.182.63', 27018)
        db = client.opdms
        collection = db.expertise
        try:
            x = collection.find({"doctor_id":did})
            message = (True,"Success",x[0]['expertise'])
        except Exception as e :
            message = (True, "Not found",[])
    except Exception as e :
        message = (False,"Error in findExbyDID",e)
    client.close()
    return message  

def findFMbyPID(pid):
    client = MongoClient('35.185.182.63', 27018)
    db = client.opdms
    collection = db.food_medicine_limitation
    result = []
    x = collection.find({"patient_id":pid})
    return x[0]['fm_limitation']

print(findUDbyPID(0))