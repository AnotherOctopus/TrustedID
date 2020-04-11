import React, { useState } from 'react';
import { saveHospitalTest } from '../libs/saveTestResult';
//import KeyEncoder from 'key-encoder';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = true

async function sendEncryptedTestResultInternal(encryptedTestResult) {

    try {
        const response = await fetch('http://ec2-3-87-206-167.compute-1.amazonaws.com/confirm', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                encryptedTestResult: encryptedTestResult,
            })
        }).then(result => result.text());
        console.log('Response: ', response);

        return response
    } catch (error) {
        console.error('Failure: ', error);
    }
}

export async function sendEncryptedTestResult(encryptedTestResult) {
    if (localTesting) {
        return {
            status: 200,
            data: {
                encryptedTestResult: 'sdfsdfsdf',
            }
        }
    } else {
        return sendEncryptedTestResultInternal(encryptedTestResult)
    }
}

