import keypair from 'keypair';
import { Cookies } from 'react-cookie'
//need to add ability to store locally
//https://www.npmjs.com/package/react-cookie
//https://github.com/juliangruber/keypair

export function createHumanId() {
    // const [cookies, setCookie, removeCookie] = useCookies(['PII'])
    const cookies = new Cookies()

    const gov = createId()
    cookies.set('govPublic', gov.public)
    cookies.set('govPrivate', gov.private)

    const health = createId()
    cookies.set('healthPublic', health.public)
    cookies.set('healthPrivate', health.private)

    const work = createId()
    cookies.set('workPublic', work.public)
    cookies.set('workPrivate', work.private)
}

function createId() {
    var pair = keypair();
    console.log('public key: ', pair.public)
    console.log('private key: ', pair.private)
    return pair
}