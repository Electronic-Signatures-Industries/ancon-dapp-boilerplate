import IPFS from 'ipfs-core'
import dagJose from 'dag-jose'
import multiformats from 'multiformats/cjs/src/basics'
import legacy from 'multiformats/cjs/src/legacy'
import { DID } from 'dids'
import { ethers } from 'ethers'
import moment from 'moment'
import axios from 'axios'
import IPFSClient from 'ipfs-http-client';
import { SwarmNodeSignedContent } from '../shared/SwarmNodeSignedContent'
import { keccak256 } from 'ethers/lib/utils'
const dagCBOR = require('ipld-dag-cbor');
const Ipld = require('ipld')
const IpfsRepo = require('ipfs-repo')
const IpfsBlockService = require('ipfs-block-service')
const multicodec = require('multicodec')
const Repo = require('ipfs-repo');

const initIpld = async (repo) => {
  //const repo = new IpfsRepo(ipfsRepoPath)
  //await repo.init({})
  //await repo.open()
  const blockService = new IpfsBlockService(repo)
  return new Ipld({blockService: blockService})
}

const MAINNET = `https://mainnet.infura.io/v3/92ed13edfad140409ac24457a9c4e22d`;
export class IPFSManager {
    format = 'dag-cbor';
    client: IPFS.IPFSRepo;
    provider: ethers.providers.JsonRpcProvider;
    ipld: any;

    async start(){
       this.client = IPFSClient({ url: `http://ifesa.ipfs.pa:5001` });
       this.ipld = await initIpld(this.client);
    }

    async stop() {
        //await this.client.stop();
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
        cid: string,
        key: string = 'self',

    ) {
        const res = await this.client.name.publish(cid, {key});
        return res;
    }

    async getCurrentNode(
        key: string = 'self'
    ) {
        try {
            let query = '';
            const keys = await this.client.key.list();
            const { id } = keys.find(i => i.name === key);
            for await (query of this.client.name.resolve(`/ipns/${id}`)) {
            }
            return query.replace('/ipfs/', '');
        } catch (e) {
            return null;
        }
    }

    /**
     * Add Signed Object
     * @param did DID
     * @param payload Payload, either Buffer or Blob 
     * @param previousNode If it has previous node
     */
    async addSignedObject(
        did: DID,
        payload: File,
        previousNode?: any) {
        let temp: string;
        let content: Buffer;
        if (payload instanceof File) {
            temp = await this.blobToKeccak256(payload);
            content = Buffer.from((await payload.arrayBuffer()));
        } else {
            throw new Error('addSignedObject: must be a file object');

        }
        temp = temp.replace('0x', '');
        // sign the payload as dag-cbor
        //* display on grid
        const { jws, linkedBlock } = await did.createDagJWS({
            content: content.toString('base64'),//*
        });
        const metadata = {
            contentType: payload.type,
            name: payload.name, //*
            lastModified: payload.lastModified,//*
            timestamp: moment().unix(),
            hash: temp,//*
            id: atob(moment().unix() + temp),
            documentPubCert: undefined,
            documentSignature: undefined,
            signaturePreset: undefined,
            contentRef: undefined
        }
        // put the JWS into the ipfs dag
        const jwsCid = await this.client.dag.put(jws, multicodec.DAG_CBOR);
        // put the payload into the ipfs dag
        await this.client.block.put(linkedBlock, { cid: jws.link })
        console.log('cid', jwsCid.toString());
        metadata.contentRef = jwsCid.toString();
        return metadata;
    }

    createSignedContent({
        contentType,
        name,
        lastModified,
        size,
        content,
        hash,
        documentPubCert,
        documentSignature,
        signaturePreset
    }) {
        return {
            contentType,
            name,
            lastModified,
            size,
            content,
            hash,
            created: moment().unix(),
            documentPubCert,
            documentSignature,
            signaturePreset,
        } as SwarmNodeSignedContent;

    }

    async addIndex(
        did: DID,
        documents: any[]) {
        // sign the payload as dag-cbor
        const { jws, linkedBlock } = await did.createDagJWS({
            documents
        });
        
        // put the JWS into the ipfs dag
        const jwsCid = await this.client.dag.put(jws, multicodec.DAG_CBOR);
        // put the payload into the ipfs dag
        
        await this.client.block.put(linkedBlock, { cid: jws.link });
        const cid = jwsCid.toString()
        return cid;
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
        return this.client.dag.put(jwe, multicodec.DAG_CBOR);
    }

    async decryptObject(did: DID, cid, query) {
        const jwe = (await this.client.dag.get(cid, query)).value
        const cleartext = await did.decryptDagJWE(jwe)
        return cleartext;
    }
    async addPublicWallet(
        did: DID,
        payload: Buffer) {
        let temp: string;
        let content: Buffer;
        temp = keccak256(payload);
        content = payload;
        temp = temp.replace('0x', '');
        // sign the payload as dag-cbor
        const cid = await this.client.add({
            path: 'index.json',
            content
        });
        return cid.toString()
    }

    /**
     * Creates key
     * @param name name 
     * @param password password
     */
    async createKey(name: string, password: string) {
        const key = await this.client.key.gen(name, {
            type: 'rsa',
            size: 2048
        });

        const pem = await this.client.key.export(name, password);

        return { name, pem };
    }

}