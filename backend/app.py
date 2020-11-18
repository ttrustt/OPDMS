from flask import Flask
from DBfunc import *
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/register', methods=['POST','GET'])
def register_endpoint():
    k = ['1111','2112','3311','4114','1155','51144','61144','74114','11844','44119','1110','2011-11-11','1211','111344','111444','15441r']
    dbfunc_status = register(k)
    if(not dbfunc_status[0]):return custom_error(dbfunc_status[1],400)
    return 'OK'








def custom_error(message, status_code):
    response = make_response(jsonify(message), status_code)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response