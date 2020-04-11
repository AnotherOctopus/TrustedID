import { Cookies } from 'react-cookie';
//replace below with test certificate
//import { confirmHospitalCertificate } from './saveHospital';
import JSEncrypt from 'jsencrypt';
import { sha256 } from 'js-sha256';
//https://www.npmjs.com/package/react-native-rsa-native

let testing = true;

export function generateHealthToken() {
    const cookies = new Cookies();
    let encrypt = new JSEncrypt();
    let token = "";

    //this should really be changed to the doctorsNote, not hospital certificate
    //the below ensures that the recipient has gotten the govPublic from the person and so 
    //has approval to read
    encrypt.setPrivateKey(cookies.get('govPrivate'));
    token = encrypt.encrypt(cookies.get('hospitalPublic'))// + encrypt.encrypt(cookies.get('healthPublic'));
    console.log('token after encryption: ', token);

    return token
}

export function generateWorkToken() {
    //needs to updated to reflect changes above
    const cookies = new Cookies();
    let token = "";
    let encrypt = new JSEncrypt();

    let workPublic = ""

    if (testing) {
        workPublic = "sdfsdfsdfsdf";
    } else {
        workPublic = cookies.get('workPublic');
    }

    token = workPublic + cookies.get('healthPublic');

    console.log('token before encryption: ', token);

    encrypt.setPrivateKey(cookies.get('govPrivate'));
    token = encrypt.encrypt(token);

    console.log('token after encryption: ', token);

    return token
}

export default function generateApprovalToken(request) {
    if (request = "health") {
        generateHealthToken();
    } else if (request = "work") {
        generateWorkToken()
    }
}