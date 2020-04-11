from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
import base64

def sign(pubkeyfile):
    with open("govtpriv.key","r") as fh:
        govtkey = RSA.import_key(fh.read())
    with open(pubkeyfile,"r") as fh:
        userkey = RSA.import_key(fh.read())
    userhash = SHA256.new(userkey.exportKey("PEM"))
    signature = pkcs1_15.new(govtkey).sign(userhash)
    crtfile = pubkeyfile.split(".")[0] + ".crt"
    with open(crtfile,"wb") as fh:
        fh.write(base64.b64encode(signature))
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
if __name__ == "__main__":
    sign("hospital1pub.key")
    sign("hospital2pub.key")
    """
    govprivkey, govpubkey = generate_RSA()
    with open("hospital2pub.key","wb") as fh:
        fh.write(govpubkey)
    with open("hospital2priv.key","wb") as fh:
        fh.write(govprivkey)
    """
