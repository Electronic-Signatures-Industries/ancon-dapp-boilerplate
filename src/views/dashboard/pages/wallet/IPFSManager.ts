import IPFS from 'ipfs-core'
import dagJose from 'dag-jose'
import multiformats from 'multiformats/cjs/src/basics'
import legacy from 'multiformats/cjs/src/legacy'
import { DID } from 'dids'
import { keccak256 } from 'ethers/utils'
import { ethers } from 'ethers'
import moment from 'moment'

const mf = multiformats('');
mf.multicodec.add(dagJose)
const dagJoseFormat = legacy(mf, dagJose.name)

export class IPFSManager {
    client: IPFS.IPFSRepo;
    provider: ethers.providers.JsonRpcProvider
    async start() {
        this.provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/');
        this.client = await IPFS.create({ ipld: { formats: [dagJoseFormat] } })
    }

    async stop() {
        await this.client.stop();
    }

    /**
     * Converts Blob to Keccak 256 hash
     * @param payload 
     */
    async blobToKeccak256(payload: Blob): Promise<string> {
        let ab = await payload.arrayBuffer();
        let buf = new Uint8Array(ab);
        return keccak256(buf) as string;
   }

   async setCurrentNode(
       did: DID,
       cid: string,       
   ) {
    debugger   
    // TODO: Use IPNS
       const res = await this.client.name.publish(cid);

       debugger
       return res;
   }

    /**
     * Add Signed Object
     * @param did DID
     * @param payload Payload, either Buffer or Blob 
     * @param previousNode If it has previous node
     */
    async addSignedObject(
        did: DID,
        payload: Buffer | Blob,
        previousNode: any) {
        let temp: string;
        let content: Buffer;
        if (payload instanceof Blob) {
            temp = await this.blobToKeccak256(payload);
            content = Buffer.from((await payload.arrayBuffer()));
        } else {
            temp = keccak256(payload);
            content = payload;
        }
        temp = temp.replace('0x','');
        const epoch = 1; // await this.provider.getBlockNumber();
        // sign the payload as dag-jose
        const { jws, linkedBlock } = await did.createDagJWS({
            epoch,
            timestamp: moment().unix(),
            hash: temp,
            content: content.toString('hex'),
            parent: previousNode || undefined
        });
        // put the JWS into the ipfs dag
        const jwsCid = await this.client.dag.put(jws, { format: 'dag-jose', hashAlg: 'sha2-256' })
        // put the payload into the ipfs dag
        await this.client.block.put(linkedBlock, { cid: jws.link })
        return jwsCid.toString()
    }

    /**
     * Get IPLD object
     * @param cid content id
     */
    async getObject(cid: string): Promise<any> {
        let temp = await this.client.dag.get(cid);
        const res = {
            metadata: {
                ...temp,
            },            
            payload: undefined            
        }
        temp = await this.client.dag.get(cid, { path: '/link' });
        res.payload = {
            ...temp,
        };

        return temp;
    }

    verify(did: DID, obj: any): Promise<any> {
        return did.verifyJWS(obj.metadata);
    }

    async encryptObject(did: DID, cleartext, dids: string[]) {
        const jwe = await did.createDagJWE(cleartext, dids)
        return this.client.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' })
    }

    async decryptObject(did: DID, cid, query) {
        const jwe = (await this.client.dag.get(cid, query)).value
        const cleartext = await did.decryptDagJWE(jwe)
        return cleartext;
    }
    
}