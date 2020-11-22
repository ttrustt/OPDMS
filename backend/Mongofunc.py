from pymongo import MongoClient
import pymongo

def findUDbyPID(listOfInput):
    pid = listOfInput[0]
    message = 'error'
    try : 
        client = MongoClient('35.185.182.63', 27018)
        db = client.opdms
        collection = db.underlying_disease
        cursor = list(collection.find({"patient_id":pid}))
        column = [{'title':'underlying_disease', 'dataKey':'underlying_disease', 'key':'underlying_disease'}]
        data = []
        if(len(list(cursor))==0):
            message = (True,"Not Found", data, column)
        else:
            for ud in cursor[0]['underlying_disease']:
                data.append({'underlying_disease':ud})
            message = (True, "Find underlying disease success", data, column)
    except Exception as e : 
        message =  (False, "Error while executing to MongoDB", e)
    client.close()
    return message

def findExbyDID(listOfInput):
    did = listOfInput[0]
    message = 'error'
    try : 
        client = MongoClient('35.185.182.63', 27018)
        db = client.opdms
        collection = db.expertise
        cursor = list(collection.find({"doctor_id":did}))
        column = [{'title':'expertise', 'dataKey':'expertise', 'key':'expertise'}]
        data = []
        if(len(list(cursor))==0):
            message = (True,"Not Found", data, column)
        else:
            for expertise in cursor[0]['expertise']:
                data.append({'expertise':expertise})
            message = (True, "Find expertise success", data, column)
    except Exception as e : 
        message =  (False, "Error while executing to MongoDB", e)
    client.close()
    return message

def findFMbyPID(listOfInput):
    pid = listOfInput[0]
    message = 'error'
    try : 
        client = MongoClient('35.185.182.63', 27018)
        db = client.opdms
        collection = db.food_medicine_limitation
        cursor = list(collection.find({"patient_id":pid}))
        column = [{'title':'fm_limitation', 'dataKey':'fm_limitation', 'key':'fm_limitation'}]
        data = []
        if(len(list(cursor))==0):
            message = (True,"Not Found", data, column)
        else:
            for food in cursor[0]['fm_limitation']:
                data.append({'fm_limitation':food})
            message = (True, "Find food medicine limitation success", data, column)
    except Exception as e : 
        message =  (False, "Error while executing to MongoDB", e)
    client.close()
    return message