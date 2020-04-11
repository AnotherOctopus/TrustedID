import { getHospitalCertificate } from '../actions/Hospital.js';
import { Cookies } from 'react-cookie';
import JSEncrypt from 'jsencrypt';
import { sha256 } from 'js-sha256';
import getGovernmentPublic from '../governmentPublic';
import confirmCertificate from '../libs/confirmCertificate';

//https://www.npmjs.com/package/js-sha256
// import pidcrypt from 'pidCrypt';
//import { RSA } from 'react-native-rsa-native';
//https://github.com/travist/jsencrypt

//https://www.npmjs.com/package/js-sha256
//need to save hospitalpublic to cookies

const testingMode = false;

let governmentPublic = "";

if (testingMode) {
    governmentPublic = getGovernmentPublic();
} else {
    //to be written
}

export function confirmHospitalCertificate() {
    const cookies = new Cookies();
    let decryptedCertificate = "";
    let hashedHospitalPublic = "";
    const { pubkey, cert } = getHospitalCertificate();
    const hospitalPublic = pubkey;
    const hospitalCertificate = cert;
    console.log("hospitalPublic: ", hospitalPublic);
    console.log("hospitalCertificate", hospitalCertificate);

    const result = confirmCertificate(hospitalCertificate, hospitalPublic);

    if (result && cookies.get('hospitalPublic') !== hospitalPublic) {
        cookies.set('hospitalPublic', hospitalPublic);
    }

    return result


    // let verify = new JSEncrypt();
    // verify.setPublicKey(hospitalPublic);
    // decryptedCertificate = verify.verify(hospitalCertificate, sha256());
    // console.log("decryptedCertificate", decryptedCertificate)

    // hashedHospitalPublic = sha256(hospitalPublic);
    // console.log("hashedHospitalPublic", hashedHospitalPublic)
    // if (decryptedCertificate === hospitalPublic) {
    //     //below can probably be more efficient and happen earlier
    //     if (cookies.get('hospitalPublic') === hospitalPublic) {
    //         return true
    //     } else {
    //         cookies.set('hospitalPublic', hospitalPublic);
    //         return true
    //     }
    // } else {
    //     return false
    // }
}

// export async function confirmHospitalCertificate() {
//     //console.log('form submission data', fields);

//     try {
//         const cookies = new Cookies();
//         let decryptedCertificate = "";
//         let hashedHospitalPublic = "";
//         const { pubkey, cert } = await getHospitalCertificate();
//         const hospitalPublic = pubkey;
//         const hospitalCertificate = cert;
//       console.log("hospitalPublic: ", hospitalPublic);
//       console.log("hospitalCertificate", hospitalCertificate);

//     let verify = new JSEncrypt();

//     //decrypted hospitalCertificate should match a hashed hospital publicKey
//     //decrypt the certification with governmentPublic
//     verify.setPublicKey(governmentPublic);
//     decryptedCertificate = verify.decrypt(hospitalCertificate);

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

