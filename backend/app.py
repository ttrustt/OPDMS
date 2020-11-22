from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
from flask_cors import CORS, cross_origin
from DBfunc import *
from Mongofunc import * 
import json
app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/register', methods=['POST'])
@cross_origin()
def register_endpoint():
    params = request.get_json()
    params_list = [
        params.get('fname','null'),
        params.get('lname','null'),
        params.get('religion','null'),
        params.get('address','null'),
        params.get('province','null'),
        params.get('postal_code','null'),
        params.get('identification_number','null'),
        params.get('passport_number','null'),
        params.get('mobile_number','null'),
        params.get('nationality','null'),
        params.get('sex','null'),
        params.get('birthdate','null'),
        params.get('email','null'),
        params.get('username','null'),
        params.get('password','null'),
        params.get('user_type','null')
    ]
    # for i in range(len(params_list)):
    #     if(params_list[i]==''):
    #         params_list[i]=None
    # print(params_list)
    # k = ['1111','2112','3311','4114','1155','51144','61144','74114','11844','44119','1110','2011-11-11','1211','111344','111444','15441r']
    dbfunc_status = register(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):return make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/login', methods=['POST'])
@cross_origin()
def login_endpoint():
    params = request.get_json()
    params_list = [
        params.get('username','null'),
        params.get('password','null')
    ]

    print(params_list)
    dbfunc_status = login(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'username':dbfunc_status[2],'usertype':dbfunc_status[3],'fname':dbfunc_status[4],'lname':dbfunc_status[5]}),200)
    return response

@app.route('/createappointment', methods=['POST'])
@cross_origin()
def createappointment_endpoint():
    params = request.get_json()
    params_list = [
        params.get('patient_id','null'),
        params.get('doctor_id','null'),
        params.get('time_in','null'),
        params.get('time_out','null'),
        params.get('diagnosis_room_id','null'),
    ]

    print(params_list)
    dbfunc_status = createAppointment(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/showmedicine', methods=['POST'])
@cross_origin()
def showmedicine_endpoint():
    params = request.get_json()
    params_list = [
        params.get('username','null'),
    ]

    print(params_list)
    dbfunc_status = showMedicine(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/showuser', methods=['POST'])
@cross_origin()
def showuser_endpoint():
    params = request.get_json()
    params_list = [
        # params.get('user_id','null'),
    ]

    print(params_list)
    dbfunc_status = showUser()
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/updatebill', methods=['POST'])
@cross_origin()
def updatebill_endpoint():
    params = request.get_json()
    params_list = [
        params.get('receipt_number','null')
    ]

    print(params_list)
    dbfunc_status = updateReceipt(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'billStatus':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'billStatus':dbfunc_status[1]}),200)
    return response

@app.route('/createorder', methods=['POST'])
@cross_origin()
def createorder_endpoint():
    params = request.get_json()
    params_list = [
        params.get('pharma_room_id','null'),
        params.get('supplier_id','null'),
        params.get('manufacturing_date','null'),
        params.get('expired_date','null'),
        params.get('quantity','null'),
        params.get('price','null'),
        params.get('pharma_code','null'),
    ]

    print(params_list)
    dbfunc_status = createMedicine(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'createStatus':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'createStatus':dbfunc_status[1]}),200)
    return response

@app.route('/updateorder', methods=['POST'])
@cross_origin()
def updateorder_endpoint():
    params = request.get_json()
    params_list = [
        params.get('order_id','null')
    ]

    print(params_list)
    dbfunc_status = updateMedicineOrder(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/showschedule', methods=['POST'])
@cross_origin()
def showschedule_endpoint():
    params = request.get_json()

    params_list = [
        params.get('username','null')
    ]

    print(params_list)
    dbfunc_status = showSchedule(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/showschedulefordoctor', methods=['POST'])
@cross_origin()
def showschedulefordoctor_endpoint():
    params = request.get_json()

    params_list = [
        params.get('username','null')
    ]

    print(params_list)
    dbfunc_status = showScheduleForDoctor(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/showmedicinesq', methods=['POST'])
@cross_origin()
def showmedicine_sq():
    params = request.get_json()
    params_list = [
        params.get('PC','null')
    ]
    print(params_list)
    dbfunc_status = getMedicineSQ(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/creatediagnosis', methods=['POST'])
@cross_origin()
def creatediagnosis_endpoint():
    params = request.get_json()
    params_list = [
        params.get('visit_number','null'),
        params.get('schedule_number','null'),
        params.get('doctors_recommendation','null'),
        params.get('clinic_id','null'),
        params.get('icd_code_1','null'),
        params.get('icd_code_2','null'),
        params.get('icd_code_3','null'),
        params.get('icd_code_4','null'),
        params.get('icd_code_5','null'),
    ]

    print(params_list)
    dbfunc_status = createDiagnosis(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/createdispensation', methods=['POST'])
@cross_origin()
def createdispensation_endpoint():
    params = request.get_json()
    params_list = [
        params.get('visit_number','null'),
        params.get('receipt_number','null'),
        params.get('pharma_code','null'),
        params.get('quantity','null'),
        params.get('description','null'),
    ]

    print(params_list)
    dbfunc_status = createDispensation(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/generatevisitnumber', methods=['POST'])
@cross_origin()
def generatevisitnumber_endpoint():
    params = request.get_json()

    params_list = [
        # params.get('username','null')
    ]

    dbfunc_status = getVisitNumber()
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2]+1}),200)
    return response

@app.route('/generatereceipt', methods=['POST'])
@cross_origin()
def generatereceipt_endpoint():
    params = request.get_json()

    params_list = [
        # params.get('username','null')
    ]

    dbfunc_status = createReceipt()
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2]}),200)
    return response

@app.route('/deleteschedule', methods=['POST'])
@cross_origin()
def deleteschedule_endpoint():
    params = request.get_json()

    params_list = [
        params.get('schedule_number','null')
    ]

    dbfunc_status = deleteSchedule(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/deletereceipt', methods=['POST'])
@cross_origin()
def deletereceipt_endpoint():
    params = request.get_json()

    params_list = [
        params.get('receipt_number','null')
    ]

    dbfunc_status = deleteReceipt(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    return response

@app.route('/findexpertise', methods=['POST'])
@cross_origin()
def findexpertise_endpoint():
    params = request.get_json()

    params_list = [
        params.get('doctor_id','null')
    ]

    dbfunc_status = findExbyDID(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/findunderlyingdisease', methods=['POST'])
@cross_origin()
def findunderlyingdisease_endpoint():
    params = request.get_json()

    params_list = [
        params.get('patient_id','null')
    ]

    dbfunc_status = findUDbyPID(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/findlimitation', methods=['POST'])
@cross_origin()
def findlimitation():
    params = request.get_json()

    params_list = [
        params.get('patient_id','null')
    ]

    dbfunc_status = findFMbyPID(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

@app.route('/showreceipt', methods=['POST'])
@cross_origin()
def showreceipt_endpoint():
    params = request.get_json()

    params_list = [
        
    ]

    dbfunc_status = showReceipt()
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    return response

def custom_error(message, status_code):
    response = make_response(jsonify(message), status_code)
    return response

if __name__ == "__main__":
    app.run(debug=True)