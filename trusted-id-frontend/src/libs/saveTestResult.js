import { getHospitalTest } from '../actions/getHospitalTest';
import { Cookies } from 'react-cookie';
import { confirmHospitalCertificate } from './saveHospital';
import JSEncrypt from 'jsencrypt';

//note for future - we need to cross-reference the hospital certificate with test results somehow

export function saveHospitalTest(patientNumber) {
    let cookie = new Cookies();
    let encrypt = new JSEncrypt();

    let certified = confirmHospitalCertificate()
    console.log(certified);
    if (!certified) {
        console.error("Hospital not certified.")
    } else {
        //save results
        let results = getHospitalTest(patientNumber);
        console.log('hospital test results:', results)
        cookie.set('hospitalTestResults', results)

        //encrypt results to send back to hospital
        encrypt.setPrivateKey(cookie.get('healthPrivate'));
        let encryptedResults = encrypt.encrypt(results);
        return encryptedResults
    }
}