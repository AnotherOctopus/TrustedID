import { getHospital } from '../actions/Hospital.js';
import { RSA } from 'react-native-rsa-native';
import { Cookies } from 'react-cookie'

//https://www.npmjs.com/package/js-sha256
//need to save hospitalpublic to cookies

const testingMode = true;

if (testingMode) {
    const governmentPublic = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzixh4JHQ9LSByOnIoO8c
    B5o9c / NUDBNodts7pFwur6cQQvrGwdaLn8dn6qRWE8Htwu9xKLlfPXkE + 6OaNN8F
    yQ03ZBnDp7dvffczpJrt1ayzFn3X5PvDVnOiDafrkgcsnSnKWnmwAjItjUMQvvIV
    xgc4 + VKcT0SoVIjW / 2eAumMRaJEq2BoCnMFE8f1lrk5PyVIgLI8cRLPMv7qd3o3m
    ANJ8nD + 8IDM2yjUcgnR8VB3vQzyAffChkMfJAzkQD92vdNTCCnTLwZgq9gLTODcD
    zbW0m2vNGs4 / 3nJvZmu0C + uXY4Vsip5mIc53P0Y6ofXu1gNTg8HXfWUqoik6PHc +
        MQIDAQAB
    ----- END PUBLIC KEY----- `;
} else {
    //to be written
}

function confirmHospitalCertificate() {
    const cookies = new Cookies();
    const decryptedCertificate = "";
    const hashedHospitalPublic = "";
    const { hospitalPublic, hospitalCertificate } = getHospital();
    console.log("hospitalPublic: ", hospitalPublic);
    console.log("hospitalCertificate", hospitalCertificate);
    decryptedCertificate = RSA.decrypt(hospitalCertificate, governmentPublic);
    console.log("decryptedCertificate", decryptedCertificate)
    hashedHospitalPublic = sha256(hospitalPublic);
    console.log("hashedHospitalPublic", hashedHospitalPublic)
    if (decryptedCertificate === hashedHospitalPublic) {

        if (cookies.get('hospitalPublic') === hospitalPublic) {
            return true
        } else {
            cookies.set('hospitalPublic', hospitalPublic);
            return true
        }
    } else {
        return false
    }
}

