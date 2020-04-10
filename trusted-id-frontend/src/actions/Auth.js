import React, { useState } from 'react';
import keyEncoder from 'key-encoder';
import blah from '.../node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = false

async function authenticateInternal(data) {

    let govPublic = keyEncoder.encodePublic(data.govPublic, 'raw', 'pem')
    try {
        let response = await fetch('http://example.com', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                license: data.license,
                hpub: govPublic,
            })
        })
        let json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function authenticate(data) {
    if (localTesting) {
        return {
            status: 200,
            data: {
                privateKey: 'sadflkjasfasf',
                publicKey: 'sdfsdfsdf',
            }
        }
    } else {
        return authenticateInternal(data)
    }
}

