import { DIDDocument, Wallet } from 'xdvplatform-wallet';
import { KeystoreIndex } from '../shared/KeystoreIndex';
import { Session } from '../shared/Session';
import { CID, IpfsHttpClient } from 'ipfs-http-client'
// const ipfs = IpfsHttpClient('https://ipfs-api.xdv.digital/api/v0')
import { Ed25519Provider } from 'key-did-provider-ed25519'
import KeyResolver from '@ceramicnetwork/key-did-resolver'
import { DID } from 'dids'
import { mnemonicToSeed } from 'ethers/utils/hdnode';
import { arrayify } from 'ethers/utils';

export class DIDManager {

    async create3ID(wallet: Wallet) {
        const provider = new Ed25519Provider(arrayify(mnemonicToSeed(wallet.mnemonic)))
        const did = new DID({ provider, resolver: KeyResolver.getResolver() })
        await did.authenticate()
        return did;
    }
    
    async createDID(
        ks: KeystoreIndex,
        wallet: Wallet,
        ipfs: any,
        messageNotify: (m) => {}
    ) {

        const keypairExports = await wallet.getPrivateKeyExports("P256");
        const keypairEd25519Exports = await wallet.getPrivateKeyExports('ED25519');
        messageNotify("Connecting to Swarm");
        // const swarmFeed = await wallet.getSwarmNodeClient(
        //   ks.address,
        //   "ES256K"
        //   // 'https://ipfs.auth2factor.com/'
        // );
        const session = `did:ethr:${ks.address}`;
        const did = new DIDDocument();
        const pub = { owner: ks.address, ...keypairExports.ldJsonPublic };
        pub.publicKeyJwk.d = undefined;
        did.id = session;
        did.publicKey = [pub];
        did.authentication = [pub as any];
        const didIndex = { ...did, tag: "main_did" };


        messageNotify("Requesting access to publish...");

        // const file = await ipfs.add(Buffer.from(JSON.stringify(didIndex)))
        // const cid = file.cid();
        // // static
        // const res = await ipfs.name.publish(`/ipfs/${cid}`);

        // const key = await ipfs.key.import('ed25519', keypairEd25519Exports.pem, '');
        // debugger
        const file = await ipfs.add(Buffer.from(JSON.stringify(didIndex)))
        const cid = file.path;
        // static
        const res = await ipfs.name.publish(`/ipfs/${cid}`);

        console.log(res);
        // const directory = {
        //     'file': { data: Buffer.from('nice essay') },
        //     'other-file': { data: Buffer.from('nice essay') },
        //     'folder/with-file': { data: Buffer.from('nice essay') },
        //     'folder/with-other-folder/and-file': { data: Buffer.from('nice essay') }
        // }
        // const rootHash = await storage.put(directory)
        // const retrievedDirectory = await storage.get(rootHash)
        Session.set({ ks });

        return res
    }

}