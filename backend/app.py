from flask import Flask
from DBfunc import *
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/register')
def register_endpoint():
    register(['13123','2','3','4','5','6','7','8','9','2000-10-10','11','12','13','14'])