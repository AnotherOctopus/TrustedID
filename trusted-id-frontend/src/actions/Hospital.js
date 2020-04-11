import React, { useState } from 'react';
import KeyEncoder from 'key-encoder';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = true

async function getHospitalCertificateInternal() {
    try {
        const response = await fetch('http://ec2-54-196-126-174.compute-1.amazonaws.com/', {
            method: 'GET'
        }).then(result => result.json());
        console.log('Hospital Response: ', response);
        return response
    } catch (error) {
        console.error('Failure: ', error);
    }
}

export async function getHospitalCertificate() {
    if (localTesting) {
        return {
            status: 200,
            data: {
                hospitalPublic: 'sdfsdfsdf',
                hospitalCertificate: 'sdfsdf',
            }
        }
    } else {
        return getHospitalCertificateInternal()
    }
}

