import { getHospitalCertificate } from '../actions/Hospital.js';
import { Cookies } from 'react-cookie';
import JSEncrypt from 'jsencrypt';
import { sha256 } from 'js-sha256';

//https://www.npmjs.com/package/js-sha256
// import pidcrypt from 'pidCrypt';
//import { RSA } from 'react-native-rsa-native';
//https://github.com/travist/jsencrypt

//https://www.npmjs.com/package/js-sha256
//need to save hospitalpublic to cookies

const testingMode = false;

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

export function confirmHospitalCertificate() {
    const cookies = new Cookies();
    let decryptedCertificate = "";
    let hashedHospitalPublic = "";
    let hospitalPublic = "";
    let hospitalCertificate = "";
    hospitalPublic = getHospitalCertificate();
    console.log("hospitalPublic: ", hospitalPublic);
    console.log("hospitalCertificate", hospitalCertificate);

    // let verify = new JSEncrypt();
    // verify.setPublicKey(hospitalPublic);
    // decryptedCertificate = verify.verify(hospitalCertificate, sha256());
    // console.log("decryptedCertificate", decryptedCertificate)

    // hashedHospitalPublic = sha256(hospitalPublic);
    // console.log("hashedHospitalPublic", hashedHospitalPublic)
    if (decryptedCertificate === hospitalPublic) {
        //below can probably be more efficient and happen earlier
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

// export async function confirmHospitalCertificate() {
//     //console.log('form submission data', fields);

//     try {
//         const cookies = new Cookies();
//         let decryptedCertificate = "";
//         let hashedHospitalPublic = "";
//         const { hospitalPublic, hospitalCertificate } = await getHospitalCertificate();
//       //console.log("results: ", results);
//       console.log("hospitalPublic: ", hospitalPublic);
//       console.log("hospitalCertificate", hospitalCertificate);

//     let verify = new JSEncrypt();
//     verify.setPublicKey(hospitalPublic);
//     decryptedCertificate = verify.verify(hospitalCertificate, sha256());

//     console.log("decryptedCertificate", decryptedCertificate)
//     // hashedHospitalPublic = sha256(hospitalPublic);
//     // console.log("hashedHospitalPublic", hashedHospitalPublic)
//     if (decryptedCertificate === hospitalPublic) {
//         //below can probably be more efficient and happen earlier
//         if (cookies.get('hospitalPublic') === hospitalPublic) {
//             return true
//         } else {
//             cookies.set('hospitalPublic', hospitalPublic);
//             return true
//         }
//     } else {
//         return false
//     }
//     } catch (e) {
//       console.log(e);
//     }
// }

