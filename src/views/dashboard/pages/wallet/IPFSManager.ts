import IPFS from 'ipfs-core'
import dagJose from 'dag-jose'
import multiformats from 'multiformats/cjs/src/basics'
import legacy from 'multiformats/cjs/src/legacy'
import { DID } from 'dids'
import { keccak256 } from 'ethers/utils'

multiformats.multicodec.add(dagJose)
const dagJoseFormat = legacy(multiformats, dagJose.name)

export class IPFSManager {
    client: IPFS.IPFSRepo;
    async start() {
        this.client = await IPFS.create({ ipld: { formats: [dagJoseFormat] } })
    }

    async stop() {
        await this.client.stop();
    }

    async blobToKeccak256(payload: Blob): Promise<Buffer> {
        let ab = await payload.arrayBuffer();
        let buf = new Uint8Array(ab);
        const hash = keccak256(buf) as string;
        return Buffer.from(hash);
    }

    async addSignedObject(did: DID, payload: Buffer | Blob) {
        let temp = payload
        if (payload instanceof Blob) {
            temp = await this.blobToKeccak256(payload);
        }
        // sign the payload as dag-jose
        const { jws, linkedBlock } = await did.createDagJWS(temp)
        // put the JWS into the ipfs dag
        const jwsCid = await this.client.dag.put(jws, { format: 'dag-jose', hashAlg: 'sha2-256' })
        // put the payload into the ipfs dag
        await this.client.block.put(linkedBlock, { cid: jws.link })
        return jwsCid
    }
}