import { DIDDocument, Wallet } from 'xdvplatform-wallet';
import { KeystoreIndex } from '../shared/KeystoreIndex';
import { Session } from '../shared/Session';
import { CID, IpfsHttpClient } from 'ipfs-http-client'
// const ipfs = IpfsHttpClient('https://ipfs-api.xdv.digital/api/v0')

export class DIDManager {
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
        debugger
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