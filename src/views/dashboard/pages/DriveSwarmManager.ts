import moment from 'moment';
import { count } from 'rxjs/operators';
import { defaultPath } from 'ethers/utils/hdnode';
import {
    DIDDocument,
    DocumentNodeSchema,
    JWTService,
    KeyConvert,
    LDCryptoTypes,
    Wallet
    } from 'xdvplatform-wallet';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { forkJoin } from 'rxjs';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import { PartialChapter } from '@erebos/timeline';
import { Session } from './Session';
import { ShareUtils } from './ShareUtils';
import { SigningOutput } from './SigningOutput';
import { SwarmFeed } from 'xdvplatform-wallet/src/swarm/feed';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
const cbor = require('cbor-sync');

export interface PushFilesOptions {
    encrypt?: boolean;
    files: File[] | File;
    queueName: string;
    address: string;
    documentSignature: string,
    documentPubCert: string,
    basicAuthentication?: string;
    signedPreset?: SigningOutput
}

export interface DriveDocumentRef {
    ref: any;
    reference: object;
}
export class DriveSwarmManager {
    constructor(private wallet: Wallet) {

    }


    async shareEphimeralLink(address: string, txs: string, entry: number) {
        const swarmFeed = await this.wallet.getSwarmNodeClient(address, 'ES256K');

        // get document from reference
        const ref = await swarmFeed.bzz.downloadData(
            txs
        );
        // download ref raw
        const documentCbor: any = await swarmFeed.bzz.download(
            ref.entries[0].hash,
            {
                mode: 'raw'
            }
        );
        const indexDocument = await documentCbor.arrayBuffer();
        const document = cbor.decode(Buffer.from(indexDocument));
        const base64Content = (document).content;

        // sign with eddsa for XDV share spec, only file contents
        const kp = this.wallet.getEd25519();
        const sig = kp.sign(Buffer.from(atob(base64Content))).toHex();
        const keypairExports = await KeyConvert.createLinkedDataJsonFormat(LDCryptoTypes.Ed25519, {
            privBytes: () => null,
            pubBytes: () => kp.getPublic()
        }, false);
        const id = `did:xdv:${swarmFeed.user}:${txs}:${entry}`;
        const did = new DIDDocument();
        const pub = { owner: swarmFeed.user, ...keypairExports };
        did.id = id;
        did.publicKey = [pub];
        const payload = {
            sig,
            did,
        };
        const [res] = await this.wallet.signJWT('ES256K', payload, {
            iss: swarmFeed.user,
            sub: id,
            aud: 'xdvmessaging.auth2factor.com'
        });
        return res;
    }



    async pushFiles(options: PushFilesOptions) {

        const swarmFeed = await this.wallet.getSwarmNodeClient(options.address, 'ES256K');
        const kp = (await this.wallet.getPrivateKey('ES256K'));
        const documents = options.files.map(async (i) => {
            let ab = await (i as Blob).arrayBuffer();
            let buf = new Uint8Array(ab);
            const hash = ethers.utils.keccak256(buf) as string;
            const signature = kp.sign(hash.replace('0x', ''));

            return {
                contentType: i.type,
                name: i.name,
                lastModified: i.lastModified,
                size: i.size,
                content: ethers.utils.base64.encode(buf),
                signature,
                hash,
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
                documentPubCert, documentSignature } = i;
            return {
                ref, reference: {
                    contentType, name, size, signature, hash, lastModified, signaturePreset,
                    documentPubCert, documentSignature
                }
            };
        });


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
        const directoryFixedHash = queueHash;
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
        const refUnderlyingHash = await swarmFeed.bzz.uploadData({
            block: current + 1,
            rootHash: current === 1 ? parentHash : rootHash,
            parentHash,
            xdv: 'test',
            version: '1.0.0-rc.2',
            documentSignatures,
            txs: underlyingHash,
            metadata: contents.map(i => i.reference),
            timestamp: moment().unix()
        }, {
            encrypt: true,
        });
        const f = await swarmFeed.bzzFeed.setContentHash(feed, refUnderlyingHash);
        return {
            txs: underlyingHash,
        }
    }

    static async subscribe(swarmFeed: SwarmFeed, feedHash: any, callback) {
        return swarmFeed.bzzFeed
            .pollContentHash(feedHash, { changedOnly: true, interval: 5000 })
            .subscribe(async m => {
                const block = await swarmFeed.bzz.downloadData(m);
                callback(block);
            });
    }
}