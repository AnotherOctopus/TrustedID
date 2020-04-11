import { RSA } from 'react-native-rsa-native';
import { Cookies } from 'react-cookie';
import { saveHospital } from 'saveHospital';
//https://www.npmjs.com/package/react-native-rsa-native

let testing = true;

export function generateHealthToken() {
    const cookies = new Cookies();
    let token = "";

    saveHospital();

    token = cookies.get('hospitalPublic') + cookies.get('healthPublic');

    console.log('token before encryption: ', token);

    //the below ensures that the recipient has gotten the govPublic from the person and so 
    //has approval to read
    token = RSA.encrypt(token, cookies.get('govPrivate'));

    console.log('token after encryption: ', token);

    return token
}

export function generateWorkToken() {
    const cookies = new Cookies();
    let token = "";

    saveHospital();

    let workPublic = ""

    if (testing) {
        workPublic = "sdfsdfsdfsdf";
    } else {
        workPublic = cookies.get('workPublic');
    }

    token = workPublic + cookies.get('healthPublic');

    console.log('token before encryption: ', token);

    token = RSA.encrypt(token, cookies.get('govPrivate'));

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