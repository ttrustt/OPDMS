from flask import Flask
from DBfunc import *
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/register')
def register_endpoint():
    k = ['0e','1e','2e','3e','4','5','6','7','8','9','10','2011-11-11','12','13e','14e','15e']
    return register(k)