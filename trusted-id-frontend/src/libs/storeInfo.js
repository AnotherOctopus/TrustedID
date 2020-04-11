import keypair from 'keypair';
import { Cookies } from 'react-cookie'
//need to add ability to store locally
//https://www.npmjs.com/package/react-cookie
//https://github.com/juliangruber/keypair

const govPublic = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAlpZnXNUX2SVFwPE6PEHQvgIT6xCE6Ox1A2/kNjCVOjxIWH51dUaz+DD0WeMA
4vVOdp/SjdpDXg6FT+wUUekLj4k7cet00GvRZVuJwRSvIWUANkQWc0cFAFX1kn+ZG7Cl16Ba
GHMWtq538xe0wlVRkvkBYirCQBtTfdm2NHqQUUTd9pRAa156uhqPFOUBs0Gxv6iBQ+tWz+ri
7zkhhvBO1ZoVA63TH/fQNS3nqoHs5+NXK9AEpNQe2mS86FsQQXrfLHVlbXozadbBgo7MvRLF
aBI0gQAvN1RHcML81jZ+SlmmIVm+X4sVaOlDDnHx5fJLQzcBRgvkdBx/3TDYsVAE7wIDAQAB
-----END RSA PUBLIC KEY-----`

const govPrivate = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAlpZnXNUX2SVFwPE6PEHQvgIT6xCE6Ox1A2/kNjCVOjxIWH51dUaz+DD0
WeMA4vVOdp/SjdpDXg6FT+wUUekLj4k7cet00GvRZVuJwRSvIWUANkQWc0cFAFX1kn+ZG7Cl
16BaGHMWtq538xe0wlVRkvkBYirCQBtTfdm2NHqQUUTd9pRAa156uhqPFOUBs0Gxv6iBQ+tW
z+ri7zkhhvBO1ZoVA63TH/fQNS3nqoHs5+NXK9AEpNQe2mS86FsQQXrfLHVlbXozadbBgo7M
vRLFaBI0gQAvN1RHcML81jZ+SlmmIVm+X4sVaOlDDnHx5fJLQzcBRgvkdBx/3TDYsVAE7wID
AQABAoIBAD6iYm23aIr2ONQuwdUsXuGZRaWhIlcreuQqFxb/ECK/ziuYtcxI0zRpUElO5SCB
fdhTU6WS4jBuA78hZ7ZGI3vZTbNthxHltpvc/igkLU/LjdIEcf4SzR69oj4D+rAMwn40gSTo
QctMODIRayrlh9+E2LF3LYKymwCenG2piPtz73LSC9EL3VgN/I4zX/DfrBtnXXIzXYNwObL/
OkUnxV81Pqx2SME/yQVYhnpZv8XQsDpYdr4EbRPVTS+sSSEXGnkEGIf5LnnTidPdKxuttMhU
BMgMsM5P6pdTuxR084pZ80oZsd4nDm2XaMzlrXgkanVPPIgldRmqt5EIZC7ZIyECgYEA411E
HTxqquUFq58ktQRF3ttW0HAWfulZrLg8YIHFNSytTkzlyTL/JDUivfoXwr8ypng30iaRWzj/
mxjcGA3ELQgtna0IQifLBzxa8xu+So4l8N/X5vt/0vrVvzGIt9cbc/p9ph+EJnmSku0kRXeM
z4XrWqbtKFifFcdgkdry+z8CgYEAqY2ujXI3b4PVYzf+eCAzWIyqL+9GXB1STpLwa6roRCDA
2Cp72CfZr+ff2fUVGw1ilOSvrMYmfF25+66EszzK/qljf6AMJ35DZy9ObZMChri+twL0c9Gz
S3ltO3Z0PljlPnajyMNFxAUBj4xoY31u4OWPLS2IACgAPmOv+kkt+lECgYEAnTLe5VfgaEfw
o7hkqMNLi8obPAJDi3vLhJ/dHtyafSlmqbyBI5sezOnwG2nPA9cuLerwrVv9JBVEpPeLNRZP
jNMatunry9G3jkksmOmVp/agROp/XDSHLFhBcO/Ol00irg2C0lj4BaIItY1AhschlFoDX6oK
Ttr3Ixe2rSG03gECgYAcPRecQTCQZxGME9BS63IBxnO1xhEe2FdT9M8L74v9hML5faHgr0pn
LKQwpcvdFI6do7TKfrn8LpQCId/CBlb8sPN8VwiPL01EizFxuHFMRMqmqlxSSdOlt1SE+caE
d8O+cn32uucMrZTD9quQHlzwIeuFp7al6AOaYHn3omaA8QKBgQAI3Zkicj39qbHwqnXUqY8f
GMUazrfv2LVCb/bkoSgOr8jqsNj/SWvy7hLNWve0TRbRPjMEmOLsDX6tGkH1tA7X9FPcVciz
jZRpWCSl/aRMkyvcoMtXP+/JhtNnTQCCHFEjzu2p2Z1Aje6NZFyas9wNoI9kvBstbfFPF9EV
L9/mQg==
-----END RSA PRIVATE KEY-----`

const testingMode = true

export function createHumanId() {
    // const [cookies, setCookie, removeCookie] = useCookies(['PII'])
    const cookies = new Cookies()

    if (testingMode) {
        cookies.set('govPublic', govPublic);
        cookies.set('govPrivate', govPrivate);
    } else {const gov = createId()
    cookies.set('govPublic', gov.public)
    cookies.set('govPrivate', gov.private)
}

    const health = createId()
    cookies.set('healthPublic', health.public)
    cookies.set('healthPrivate', health.private)

    const work = createId()
    cookies.set('workPublic', work.public)
    cookies.set('workPrivate', work.private)

    console.log('Keys created and saved in cookie.')
    if (testingMode){
        console.log('Gov: ')
        console.log('public:', govPublic);
        console.log('private: ', govPrivate)
    } 
    // else {console.log('Gov: ', gov)}
    console.log('Health: ', health);
    console.log('Work: ', work);
}

function createId() {
    var pair = keypair();
    return pair
}