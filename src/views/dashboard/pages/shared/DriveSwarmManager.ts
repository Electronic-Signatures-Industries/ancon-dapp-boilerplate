import moment from 'moment';
import { CacheService } from './CacheService';
import { DIDDocument, LDCryptoTypes } from 'xdvplatform-wallet';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { forkJoin } from 'rxjs';
import { KeyConvert } from 'xdvplatform-wallet/src';
import { PushFilesOptions } from './PushFilesOptions';
import { ShareUtils } from './ShareUtils';
import { SwarmFeed } from 'xdvplatform-wallet/src/swarm/feed';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { Wallet } from 'xdvplatform-wallet/src';
import 'share-api-polyfill';

const cbor = require('cbor-sync');

export interface XVDSwarmNodeBlock {
    block: number;
    rootHash: string;
    parentHash: string;
    xdv: 'test' | 'main';
    version: string;
    documentSignatures: DocumentSig[];
    txs: string;
    metadata: SwarmNodeSignedContent[];
    timestamp: number;
};
export interface DocumentSig {
    hash: string;
    signature: ec.Signature | string;
}
export interface DriveDocumentRef {
    ref: any;
    reference: SwarmNodeSignedContent;
}
export class DriveSwarmManager {
    static cacheService: CacheService = new CacheService();
    constructor(private wallet: Wallet) {

    }


    /** Shares a ephimeral */
    async shareEphemeralLink(address: string, txs: string, entry: number, hash: string, fromManifest: boolean) {
        const swarmFeed = await this.wallet.getSwarmNodeClient(address, 'ES256K');
        const document = await ShareUtils.getDocument(
            this.wallet,
            address,
            txs,
            entry.toString(),
            hash
        );
        // }
        const base64Content = (document).content;

        // sign with eddsa for XDV share spec, only file contents
        const kp = this.wallet.getEd25519();
        const sig = kp.sign(Buffer.from(atob(base64Content))).toHex();
        const keypairExports = await KeyConvert.createLinkedDataJsonFormat(LDCryptoTypes.Ed25519, {
            privBytes: () => null,
            pubBytes: () => kp.getPublic()
        }, false);
        const id = `did:xdv:${swarmFeed.user}:${txs}:${document.hash}`;
        const did = new DIDDocument();
        const pub = { owner: swarmFeed.user, ...keypairExports };
        did.id = id;
        did.publicKey = [pub];
        const payload = {
            sig,
            did,
        };
        const [e, res] = await this.wallet.signJWT('ES256K', payload, {
            iss: swarmFeed.user,
            sub: id,
            aud: 'app.xdv.digital'
        });

        const jwt = res;
        const refHash = await swarmFeed.bzz.uploadData(jwt, {
            encrypt: true
        });
        const sharedUrl = `https://app.xdv.digital/#/viewer?link=${address};${refHash}`;

        // @ts-ignore
        navigator.share(
            {
                title: 'XDV',
                text: 'Sharing this signed document that you requested',
                url: sharedUrl,
            },
            // @ts-ignore
            {
                // @ts-ignore
                copy: true, email: true, print: true, sms: true, smessenger: true,
                // @ts-ignore
                facebook: true, whatsapp: true, twitter: true, linkedin: true, telegram: true, skype: true,
            }
        );
    }



    async pushFiles(options: PushFilesOptions) {

        const swarmFeed = await this.wallet.getSwarmNodeClient(options.address, 'ES256K');
        const kp = (await this.wallet.getPrivateKey('ES256K'));
        // @ts-ignore
        const documents = options.files.map(async (i) => {
            let ab = await (i as Blob).arrayBuffer();
            let buf = new Uint8Array(ab);
            const hash = ethers.utils.keccak256(buf) as string;
            const signature = kp.sign(Buffer.from(hash));

            return {
                contentType: i.type,
                name: i.name,
                lastModified: i.lastModified,
                size: i.size,
                content: ethers.utils.base64.encode(buf),
                signature,
                hash,
                created: moment().unix(),
                documentPubCert: options.documentPubCert,
                documentSignature: options.documentSignature,
                signaturePreset: options.signedPreset,
            } as SwarmNodeSignedContent;
        });

        const signedDocs = await forkJoin(documents).toPromise();
        const splitIntoCborAndReferences: DriveDocumentRef[] = signedDocs.map((i: SwarmNodeSignedContent) => {
            const ref =
                cbor.encode({
                    ...i,
                });

            const { contentType, name, size, signature, hash, lastModified, signaturePreset,
                documentPubCert, documentSignature, created } = i;
            return {
                ref, reference: {
                    contentType, name, size, signature, hash, lastModified, signaturePreset,
                    documentPubCert, documentSignature, created
                }
            };
        });


        // @ts-ignore
        return await this.appendTreeNode(swarmFeed, splitIntoCborAndReferences);
    }


    async appendTreeNode(swarmFeed: SwarmFeed, contents: DriveDocumentRef[]) {
        const queueHash = await swarmFeed.bzzFeed.createManifest({
            user: swarmFeed.user,
            name: moment().unix().toString()
        });

        const documentSignatures = contents.map(i => {
            return { hash: i.reference.hash, signature: i.reference.signature };
        })

        console.log({
            user: swarmFeed.user,
            name: 'documents',
        })
        // upload as directory
        let directory = {};
        contents.forEach(i => {
            const cborRef = {
                [`${i.reference.hash}`]: {
                    data: i.ref,
                }
            }
            // console.log(item)
            directory = {
                ...cborRef,
                ...directory,
            };
        });

        const underlyingHash = await swarmFeed.bzz.uploadDirectory(directory, {
            encrypt: true,
        });
        // await swarmFeed.bzzFeed.setContentHash(directoryFixedHash, underlyingHash);



        const feed = await swarmFeed.bzzFeed.createManifest({
            user: swarmFeed.user,
            name: `tx-document-tree`
        })
        let parentHash = '';
        let rootHash = '';
        let current = 0;
        try {
            let lastBlock = await swarmFeed.bzzFeed.getContentHash(feed);
            let res = await swarmFeed.bzz.downloadData(lastBlock);
            current = res.block;
            parentHash = lastBlock;
            rootHash = res.rootHash;
        } catch (error) {
        }
        const block: XVDSwarmNodeBlock = {
            block: current + 1,
            rootHash: current === 1 ? parentHash : rootHash,
            parentHash,
            xdv: 'prod',
            version: '1.0.0',
            documentSignatures,
            txs: underlyingHash,
            metadata: contents.map(i => i.reference),
            timestamp: moment().unix()
        };
        const refUnderlyingHash = await swarmFeed.bzz.uploadData(block, {
            encrypt: true,
        });


        const f = await swarmFeed.bzzFeed.setContentHash(feed, refUnderlyingHash);
        return {
            ...block,
        }
    }



    static async goToParentNode(swarmFeed: SwarmFeed, ref: string) {
        return swarmFeed.bzz.downloadData(ref);
    }

    static async subscribe(swarmFeed: SwarmFeed, feedHash: any, callback) {

        async function getBlocks(block: XVDSwarmNodeBlock, limit: number) {
            const has = await DriveSwarmManager.cacheService.hasBlocks();
            if (has) return await DriveSwarmManager.cacheService.getBlocks();
            await DriveSwarmManager.cacheService.setBlocks(block);
            
            let blocks = [block];
            const hash = await swarmFeed.bzzFeed.getContentHash(feedHash);
            let i = 0;
            let blockPosition = block.block;
            let hasBlock = block.block > 1;
            while (hasBlock && i < limit) {
                let previous = await DriveSwarmManager.goToParentNode(swarmFeed, block.parentHash);
                blocks = [...blocks, previous];
                blockPosition--;
                hasBlock = blockPosition > 1;
                i++;
                block = previous;
                await DriveSwarmManager.cacheService.setBlocks(block);
            }

            return blocks;
        }

        return swarmFeed.bzzFeed
            .pollContentHash(feedHash, { changedOnly: true, interval: 5000 })
            .subscribe(async m => {
                const block = await swarmFeed.bzz.downloadData(m);
                let blocks = await getBlocks(block, 20);
                await DriveSwarmManager.cacheService.setBlocks(block);

                callback(blocks);
            });
    }
}