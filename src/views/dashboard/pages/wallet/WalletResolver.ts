import axios from 'axios';

const base = `https://firmas.xdv.digital/api`;

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