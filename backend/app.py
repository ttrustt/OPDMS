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
    print(params_list)
    # k = ['1111','2112','3311','4114','1155','51144','61144','74114','11844','44119','1110','2011-11-11','1211','111344','111444','15441r']
    dbfunc_status = register(params_list)
    print(dbfunc_status)
    if(not dbfunc_status[0]):return custom_error(dbfunc_status[1],200)
    response = make_response(jsonify('OK'),200)
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
    if(not dbfunc_status[0]):return custom_error(dbfunc_status[1],200)
    response = make_response(jsonify('OK'),200)
    return response


def custom_error(message, status_code):
    response = make_response(jsonify(message), status_code)
    return response

if __name__ == "__main__":
    app.run(debug=True)