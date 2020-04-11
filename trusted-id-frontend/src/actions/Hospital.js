import React, { useState } from 'react';
import KeyEncoder from 'key-encoder';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = false

async function getHospitalInternal() {
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

export async function getHospital() {
    if (localTesting) {
        return {
            status: 200,
            data: {
                hospitalPublic: 'sdfsdfsdf',
                encryptedCertificate: 'sdfsdf',
            }
        }
    } else {
        return authenticateInternal()
    }
}

