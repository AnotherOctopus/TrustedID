import { saveHospitalTest } from './saveHospitalTest';
import { sendEncryptedHospitalTest } from '../actions/sendEncryptedTestResult';
import { confirmHospitalCertificate } from './saveHospital';

const testStatus = true

export function getAndSendTestResult(patientNumber) {
    if (testStatus) {
        confirmHospitalCertificate();
    }
    else {
        let encryptedTestResult = saveHospitalTest(patientNumber);
        //sendEncryptedHospitalTest(encryptedTestResult);
    }
}