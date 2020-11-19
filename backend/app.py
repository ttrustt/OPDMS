from flask import Flask, request, jsonify, make_response, flash, redirect, url_for
from flask_cors import CORS, cross_origin
from DBfunc import *
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
    for i in range(len(params_list)):
        if(params_list[i]==''):
            params_list[i]=None
    print(params_list)
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
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'username':dbfunc_status[2],'usertype':dbfunc_status[3]}),200)
    return response

@app.route('/createappointment', methods=['POST'])
@cross_origin()
def createappointment_endpoint():
    params = request.get_json()
    params_list = [
        params.get('patient_id','null'),
        params.get('doctor_id','null'),
        params.get('time_in','null'),
        params.get('time_in','null'),
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
        params.get('user_id','null'),
    ]

    print(params_list)
    dbfunc_status = showMedicine(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1],'data':dbfunc_status[2],'columns':dbfunc_status[3]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'status':dbfunc_status[1]}),200)
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
    if(not dbfunc_status[0]):response=make_response(jsonify({'success':dbfunc_status[0],'orderStatus':dbfunc_status[1]}),200)
    else: response = make_response(jsonify({'success':dbfunc_status[0],'orderStatus':dbfunc_status[1]}),200)
    return response

def custom_error(message, status_code):
    response = make_response(jsonify(message), status_code)
    return response

if __name__ == "__main__":
    app.run(debug=True)