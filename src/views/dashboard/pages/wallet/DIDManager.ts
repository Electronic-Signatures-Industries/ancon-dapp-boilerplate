import { DIDDocument, Wallet } from 'xdvplatform-wallet';
import { KeystoreIndex } from '../shared/KeystoreIndex';
import { Session } from '../shared/Session';
import { CID, IpfsHttpClient } from 'ipfs-http-client'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import KeyResolver from '@ceramicnetwork/key-did-resolver'
import { DID } from 'dids'
import { mnemonicToSeed } from 'ethers/utils/hdnode';
import { arrayify } from 'ethers/utils';

export class DIDManager {

    /**
     * Create 3ID
     * using XDV
     * @param wallet 
     * @param messageNotify 
     */
    async create3ID(
        wallet: Wallet,
        messageNotify: (m) => {}) {
        let seed = arrayify(mnemonicToSeed(wallet.mnemonic));
        seed = seed.slice(0, 32);
        const provider = new Ed25519Provider(seed);
        const did = new DID({ provider, resolver: KeyResolver.getResolver() })
        messageNotify("Requesting access to publish...");
        await did.authenticate();
        return did;
    }    
}