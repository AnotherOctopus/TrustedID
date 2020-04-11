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

const testingMode = false;
const cookies = new Cookies()

const style = {
    width: '250px',
    height: '250px',
}

function CreateHealthQR() {
    const approvalToken = JSON.stringify(generateApprovalToken("health"));

    return <QRCode size={250} style={style} value={approvalToken} />

}

function CreateWorkQR() {
    const approvalToken = JSON.stringify(generateApprovalToken("work"));

    return <QRCode size={250} style={style} value={approvalToken} />

}

function CreateCertificateQR() {
    //commenting the below as the api endpoint is down
    //const certificate = cookies.get('govCertificate');
    console.log("createCertificate Called")
    const certificate = "TESTING TESTING TESTING";
    return <QRCode size={250} style={style} value={certificate} />

}

export default function returnQR(request) {
    let result = "";

    if (request === "health") {
        result = <CreateHealthQR />;
    } else if (request === "work") {
        result = <CreateWorkQR />;
    } else if (request === "certificate"){
        result = <CreateCertificateQR />
    } else {
        result = "Incorrect";
    }

    return result;
}