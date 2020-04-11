import React, { useState } from 'react';
//import KeyEncoder from 'key-encoder';
//https://www.npmjs.com/package/key-encoder

// If we are locally testing
const localTesting = true

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
        return "iEHtPOgKUYvNs4LA8UqEOYkPHHisb6MxLq6K2BiFRy7AnQjzQslLqqHh0JCxGnZZ/Xffn1QIMHnncAQKG7WfD4YbuEsO/v/2oNHsQBL0qPRaaf8eeLL2T5d9M6up3sH1bMMWmhh+4r7oZYupvB7d7zM6o4AFsExGuJROCysiBrYgsCg3kEOsUkQ9Y+Ive1DtzbhMmucOx/kSv0TxhIkHBtyviUDxTo1/KhqMDxgDiL/lAPCC/itf8ShkuyE0DaB0gLNbCYabLyBjBF8YAx6EurwKB9R5KF94nBdD9LCNrEdlZtX6bl6zj6BNmpCnZ6lQgtG24DTnBjRKHecEFKrocQ=="
    } else {
        return authenticateInternal(name, license, govPublic)
    }
}

