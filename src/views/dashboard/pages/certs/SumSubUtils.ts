const axios = require('axios');
const crypto = require('crypto');

export const CERT_API = 'http://localhost:3000';
export class SumSubUtils {
    
     static async getAccessToken(name: string) {
        const res = await axios.get(`${CERT_API}/kyc/access_token?name=${name}&ttlInSecs=600`);

        return res.data.access_token;
    }  
}