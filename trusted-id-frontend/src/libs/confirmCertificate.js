
import { sha256 } from 'js-sha256';
import getGovernmentPublic from '../governmentPublic';
//import NodeRSA from 'node-rsa';
import OpenCrypto from 'opencrypto'
//https://github.com/safebash/opencrypto
//https://github.com/rzcoder/node-rsa/
//to decrypt with public key

const testingMode = true;

let governmentPublic = "";

if (testingMode) {
    governmentPublic = getGovernmentPublic();
} else {
    //to be written
}

export default function confirmCertificate(encryptedCertificate, publicKey) {
    //const decrypt = new JSEncrypt();

    // let decryptedCertificate = "";
    // let hashedPublicKey = "";
    // console.log('encryptedCertificate: ', encryptedCertificate)
    // //first decrypt the publicKey using the government Certificate
    // const key= new NodeRSA()
    // key.importKey(governmentPublic,'public',{environment: 'browser'})
    // console.log('is the key empty? ', key.isEmpty());
    // decryptedCertificate = key.decrypt(encryptedCertificate);

    // decrypt.setPublicKey(governmentPublic);
    // decryptedCertificate = decrypt.decrypt(encryptedCertificate);
    // console.log('decryptedCertificate: ', decryptedCertificate);

    // console.log('publicKey: ', publicKey)
    //hash (SHA256) the public key
    //const encrypt = new JSEncrypt();
    // hashedPublicKey = sha256(publicKey);
    // console.log('hashed public key:', hashedPublicKey);

    //const key = new NodeRSA();
    const crypt = new OpenCrypto();
    let result = false;
    //result = key.verify(publicKey, encryptedCertificate,'base64',governmentPublic)
    // crypt.verify(publicKey, data, signature, options).then(function (isValid) {
    //     console.log(isValid)
    //   })
    result = crypt.verify(encryptedCertificate, publicKey, governmentPublic)
    console.log('result: ', result);
    return result;
}