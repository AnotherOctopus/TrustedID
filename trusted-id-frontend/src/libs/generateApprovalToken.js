import { Cookies } from 'react-cookie';
//replace below with test certificate
//import { confirmHospitalCertificate } from './saveHospital';
//import JSEncrypt from 'jsencrypt';
import { sha256 } from 'js-sha256';
import JSEncrypt from 'encryptlong';

//https://www.npmjs.com/package/encryptlong
//https://www.npmjs.com/package/react-native-rsa-native

let testingHealth = true;
let testingWork = true;

export function generateCertificateToken() {
    const cookies = new Cookies();
    const token = {
        govCertificate: cookies.get('govCertificate'),
        govPublic: cookies.get('govPublic')
    }

    return token
}

export function generateHealthToken() {
    const cookies = new Cookies();
    const encrypt = new JSEncrypt();
    let tokenHospital = "";
    let tokenHealth = "";
    let hospitalPublic = "";
    let token = {};

    if (testingHealth) {
        hospitalPublic = "sdfsdfsdf";
    } else {
        hospitalPublic = cookies.get('hospitalPublic');
    }

    //this should really be changed to the doctorsNote, not hospital certificate
    //the below ensures that the recipient has gotten the govPublic from the person and so 
    //has approval to read
    console.log('govPrivate:', cookies.get('govPrivate'));
    console.log('healthPublic: ', cookies.get('healthPublic'));
    encrypt.setPrivateKey(cookies.get('govPrivate'));
    console.log('hospitalPublic:', hospitalPublic);
    tokenHospital = encrypt.encryptLong(hospitalPublic)// + encrypt.encrypt(cookies.get('healthPublic'));
    tokenHealth = encrypt.encryptLong(cookies.get('healthPublic'));

    token = {
        encryptedHospitalPublicKey: tokenHospital,
        encryptedHealthPublicKey: tokenHealth,
        //govCertificate: cookies.get('govCertificate'),
    }

    console.log('token after encryption: ', token);
    return token
}

export function generateWorkToken() {
    const cookies = new Cookies();
    let encrypt = new JSEncrypt();
    let tokenCompany = "";
    let tokenWork = "";
    let companyPublic = "";
    let token = {};

    if (testingWork) {
        companyPublic = "sdfsdfsdf";
    } else {
        companyPublic = cookies.get('companyPublic');
    }

    //this should really be changed to the doctorsNote, not hospital certificate
    //the below ensures that the recipient has gotten the govPublic from the person and so 
    //has approval to read
    console.log('govPrivate:', cookies.get('govPrivate'));
    console.log('workPublic: ', cookies.get('workPublic'));
    encrypt.setPrivateKey(cookies.get('govPrivate'));
    console.log('companyPublic:', companyPublic);
    tokenWork = encrypt.encryptLong(cookies.get('workPublic'));
    tokenCompany = encrypt.encryptLong(companyPublic)// + encrypt.encrypt(cookies.get('healthPublic'));

    token = {
        encryptedCompanyPublicKey: tokenCompany,
        encryptedWorkPublicKey: tokenWork,
        //govCertificate: cookies.get('govCertificate'),
    }

    console.log('token after encryption: ', token);
    return token
}

export default function generateApprovalToken(request) {
    console.log('generating approval token now');

    if (request === "health") {
        return generateHealthToken()
    } else if (request === "work") {
        return generateWorkToken()
    } else if (request === "certificate") {
        return generateCertificateToken();
    }
}