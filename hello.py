from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
import base64
from flask import Flask,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
def generate_RSA(bits=2048):
    '''
    Generate an RSA keypair with an exponent of 65537 in PEM format
    param: bits The key length in bits
    Return private key and public key
    '''
    new_key = RSA.generate(bits, e=65537)
    public_key = new_key.publickey().exportKey("PEM")
    private_key = new_key.exportKey("PEM")
    return private_key, public_key

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/newuser',methods = ['POST'])
def givekeys():
    with open("govtpriv.key","r") as fh:
        govtkey = RSA.import_key(fh.read())
    print(request.json["hpub"])
    userkey = RSA.import_key(request.json["hpub"])
    userhash = SHA256.new(userkey.exportKey("PEM"))
    signature = pkcs1_15.new(govtkey).sign(userhash)
    return base64.b64encode(signature), 200

if __name__ == '__main__':
        app.run(host='0.0.0.0',port = 80)
