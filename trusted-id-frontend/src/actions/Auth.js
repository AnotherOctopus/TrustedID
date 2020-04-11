import React, { useState } from 'react';
//import KeyEncoder from 'key-encoder';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = false

//const keyEncoder = new KeyEncoder('secp256k1')

async function authenticateInternal(name, license, hpub) {

    //console.log('authenticate internal gov public:', hpub)
    //console.log('name:', name, 'license:', license, 'hpub:', hpub)
    try {
        const response = await fetch('http://ec2-3-87-206-167.compute-1.amazonaws.com/newuser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                license: license,
                hpub: hpub,
            })
        }).then(result => result.text());
        console.log('Certification received from Gov: ', response);

        return response
    } catch (error) {
        console.error('Failure: ', error);
    }
}

export async function authenticate(name, license, govPublic) {
    if (localTesting) {
        return {
            status: 200,
            data: {
                publicKey: 'sdfsdfsdf',
            }
        }
    } else {
        return authenticateInternal(name, license, govPublic)
    }
}

