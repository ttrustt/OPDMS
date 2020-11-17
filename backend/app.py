from flask import Flask
from DBfunc import *
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/register')
def register_endpoint():
    k = ['0ee','1ee','2ee','3ee','4','5','6','7','8','9','10','2011-11-11','12','13e','14ee','15ee']
    return register(k)