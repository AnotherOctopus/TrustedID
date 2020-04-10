import React, { useState } from 'react'

// If we are locally testing
const localTesting = true

async function authenticateInternal(data) {
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

