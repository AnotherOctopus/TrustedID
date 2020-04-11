//https://www.npmjs.com/package/crypto-js
//https://github.com/zpao/qrcode.react

import { withCookies, Cookies } from 'react-cookie';
import React, { useState } from 'react';
//import { setStatus } from "../libs/setStatus";
import sha256 from 'crypto-js/sha256';
import QRCode from 'qrcode.react';

import generateApprovalToken from '../libs/generateApprovalToken'
//import QrReader from 'react-qr-reader';

//Frontend: 
// QR code contains the following information:
// healthPublic or workPublic encrypted by govPrivate
//as well as either companyPublic or doctorPublic (depending on code) 
//and HPubl

//to do - encrypt with govPrivate

const testingMode = true;
const cookies = new Cookies()

const style = {
    width: '250px',
    height: '250px',
}

function CreateHealthQR() {
    let approvalToken = "";
    // approvalToken = cookies.get('govCertificate') + generateApprovalToken("health");
    let hospitalPublic = ""
    if (testingMode) {
        hospitalPublic = "sdfsdfsdfsdfsdf";
    } else { hospitalPublic = cookies.get('hospitalPublic') };

    const govPublic = cookies.get('govPublic')
    const healthPublic = cookies.get('healthPublic')

    approvalToken = healthPublic + hospitalPublic + govPublic;

    return <QRCode style={style} value={approvalToken} />

}

function CreateWorkQR() {

    let approvalToken = "";
    // approvalToken = cookies.get('govCertificate') + generateApprovalToken("work");

    let companyPublic = ""
    if (testingMode) {
        companyPublic = "sdfsdfsdfsdfsdf";
    } else { companyPublic = cookies.get('companyPublic') };

    const govPublic = cookies.get('govPublic')
    const workPublic = cookies.get('workPublic')

    approvalToken = workPublic + companyPublic + govPublic;


    return <QRCode style={style} value={approvalToken} />

}

export default function returnQR(request) {
    let result = "";

    if (request === "health") {
        result = <CreateHealthQR />;
    } else if (request === "work") {
        result = <CreateWorkQR />;
    } else {
        result = "Incorrect";
    }

    return result;
}