import { saveHospitalTest } from './saveTestResult';
import { sendEncryptedTestResult } from '../actions/sendEncryptedTestResult';
import { confirmHospitalCertificate } from './saveHospital';

const testStatus = true

export function getAndSendTestResult(patientNumber) {
    if (testStatus) {
        confirmHospitalCertificate();
    }
    else {
        let encryptedTestResult = saveHospitalTest(patientNumber);
        sendEncryptedTestResult(encryptedTestResult);
    }
}