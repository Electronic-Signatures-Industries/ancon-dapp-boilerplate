const axios = require('axios');

export const CERT_API = 'http://localhost:3000';
export class CertificateService {
    async find(name: string, domain: string) {
        const res = await axios.post(`${CERT_API}/domains/find`, {
            name,
            domain
        });

        if (res.data.exists) {
            return true;
        } else {
            return false;
        }
    }
}