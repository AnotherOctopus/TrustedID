import React, {useState} from 'react'

async function authenticate(data) {
    try {
        let response = await fetch ('http://example.com', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data})
        })
        let json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}