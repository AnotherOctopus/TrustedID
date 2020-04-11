import React, { useState } from 'react';
//import KeyEncoder from 'key-encoder';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = false

async function getHospitalTestInternal(patientNumber) {

    //console.log('authenticate internal gov public:', hpub)
    //console.log('name:', name, 'license:', license, 'hpub:', hpub)
    try {
        const response = await fetch('http://ec2-3-87-206-167.compute-1.amazonaws.com/req', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patientNumber: patientNumber,
            })
        }).then(result => result.text());
        console.log('Response: ', response);

        return response
    } catch (error) {
        console.error('Failure: ', error);
    }
}

export async function getHospitalTest(patientNumber) {
    if (localTesting) {
        return {
            status: 200,
            data: {
                publicKey: 'sdfsdfsdf',
            }
        }
    } else {
        return getHospitalTestInternal(patientNumber)
    }
}

