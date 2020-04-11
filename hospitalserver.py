from Crypto.PublicKey import RSA
from threading import Thread
from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
import requests
import time
import base64
import json
from flask import Flask,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

class Hospital(object):
    def __init__(self):
        self.pubkey    = RSA.import_key(open("hospital2pub.key","r").read())
        self.privkey    = RSA.import_key(open("hospital2priv.key","r").read() )
        self.cert    = base64.b64decode(open("hospital2pub.crt","r").read())
        self.employees = [74324535,5463567,87654,34565]
        empbytes = [e.to_bytes(4,'big') for e in self.employees]
        self.employtokens = [pkcs1_15.new(self.privkey).sign(SHA256.new(data = empl)) for empl in empbytes]
        print(self.employtokens)
        self.registtokens = []
        self.employeelines = []
        self.newemployees = []
        self.nextnode   = "http://ec2-54-196-126-174.compute-1.amazonaws.com/propogate"
h = Hospital()
@app.route('/')
def hello_world():
    return json.dumps({"pubkey":open("hospital2pub.key","r").read(), "cert": open("hospital2pub.crt","r").read()})

@app.route('/confirm',methods = ['POST'])
def loademployline():
    employline = request.json["rettoken"]
    h.employeelines.append(employline)
    r = requests.post(h.nextnode,json = {"newemployee": employline})
    return "Confirmed"

@app.route('/req',methods = ['POST'])
def giveemploytoken():
    employid = int(request.json["employeeid"])
    if employid in h.registtokens:
        return "Employee id already used"
    if employid in h.employees:
        h.registtokens.append(employid)
    else:
        return "not a valid employee"
    return base64.b64encode(h.employtokens[h.employees.index(employid)])

@app.route('/propogate',methods = ['POST'])
def propogate():
    print(request.json)
    h.employeelines.append(request.json["newemployee"])
    return "newemployeegot"

@app.route('/getchain',methods = ['GET'])
def getchain():
    return json.dumps({ "blockchain": h.employeelines})

if __name__ == '__main__':
        app.run(host='0.0.0.0',port = 80)

