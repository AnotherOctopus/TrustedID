import { Cookies } from 'react-cookie'
//later import companyPublic and doctorPublic from cookies?
//this page will just edit the companyPublic and doctorPublic

const localTesting = true
const cookies = new Cookies()

function retrieveStatusInternal() {
    //
}

function retrieveStatus() {
    if (localTesting) {
        return {
            status: 200,
            data: {
                companyPublic: 'sadflkjasfasf',
                doctorPublic: 'sdfsdfsdf',
            }
        }
    } else {
        return retrieveStatusInternal()
    }
}

export function setStatus() {
    const { companyPublic, doctorPublic } = retrieveStatus().data;
    cookies.set('companyPublic', companyPublic)
    cookies.set('doctorPublic', doctorPublic)
}

