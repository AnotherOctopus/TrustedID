//https://www.npmjs.com/package/crypto-js
//https://github.com/zpao/qrcode.react

import { withCookies, Cookies } from 'react-cookie';
import React, { useState } from 'react';
import { setStatus } from "../libs/setStatus";
import sha256 from 'crypto-js/sha256';
import QRCode from 'qrcode.react';

//Frontend: 
// QR code contains the following information:
// healthPublic or workPublic encrypted by govPrivate
//as well as either companyPublic or doctorPublic (depending on code) 
//and HPubl

//to do - encrypt with govPrivate

const testingMode = true;
const cookies = new Cookies()

function CreateHealthQR() {

    let approvalToken = "";

    if (testingMode) {
        setStatus();
    } else { };
    const govPrivate = cookies.get('govPrivate')

    const healthPublic = cookies.get('healthPublic')
    const doctorPublic = cookies.get('doctorPublic')

    approvalToken = healthPublic + doctorPublic + govPrivate;

    return <QRCode value={approvalToken} />

}

function CreateWorkQR() {

    let approvalToken = "";

    if (testingMode) {
        setStatus();
    } else { };

    const govPrivate = cookies.get('govPrivate')

    const workPublic = cookies.get('workPublic')
    const companyPublic = cookies.get('companyPublic')

    approvalToken = workPublic + companyPublic + govPrivate;

    return <QRCode value={approvalToken} />

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