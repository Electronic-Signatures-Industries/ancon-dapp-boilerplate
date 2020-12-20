import axios from 'axios';

const base = `http://localhost:3000`;

export class WalletResolver {
    constructor() {

    }

     static async  setPublicWalletRef(
         commonName: string,
         ref: string
     ) {
         return await axios.post(`${base}/domains/wallet`, {
             walletReference: ref,
             commonName
         });
    }
}