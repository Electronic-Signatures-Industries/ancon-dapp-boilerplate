const os = require('os');
const axios = require('axios');

export interface SmartCardConnectorEvent {
    eventName: string;
    payload: any;
}
const CLIENT_API = 'http://localhost:8089';
export class SmartCardConnectorPKCS11 {
    module: string;
    constructor(private keyId?: string) {
        this.keyId = keyId;

        if (os.platform() === 'linux') {
            // TODO: Need to add Safe Sign
            // libaetpkss.so
            this.module = '/usr/local/lib/softhsm/libsofthsm2.so';
        } else if (os.platform() === 'darwin') {
            // 
            this.module = '/usr/local/lib/libaetpkss.dylib';
        } else if  (os.platform() === 'win32') {
            // 
            this.module = `C:/\Windows/\SysWOW64/\aetpkss1.dll`;
        }
    }


    async getSlots() {
        const slots = await axios(`${CLIENT_API}/sc/get_slots`);
        return Object.keys(slots.data).map(k => {
            return { value: JSON.parse(slots.data[k]), key: JSON.parse(slots.data[k]).slotDescription };
        });
    }

    async sign(index: string, pin: string, data: Buffer) {
        const res = await axios.post(`${CLIENT_API}/sc/sign/${index}`, {
            pin,
          data:  data.toString('base64')
        });
        return res.data;
    }

}