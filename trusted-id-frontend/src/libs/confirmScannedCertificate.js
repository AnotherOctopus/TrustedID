import confirmCertificate from './confirmCertificate';

export default function confirmScan(data) {
    const {govCertificate, govPublic} = JSON.parse(data);
    console.log('govCertificate: ', govCertificate);
    console.log('govPublic: ', govPublic);

    const result = confirmCertificate(govCertificate, govPublic);

    alert("scan result:", result)

    return result;
}