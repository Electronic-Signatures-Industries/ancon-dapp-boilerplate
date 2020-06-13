import moment from 'moment';
import { count } from 'rxjs/operators';
import { defaultPath } from 'ethers/utils/hdnode';
import {
    DocumentNodeSchema,
    JWTService,
    KeyConvert,
    Wallet
    } from 'xdvplatform-tools';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { forkJoin } from 'rxjs';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import { PartialChapter } from '@erebos/timeline';
import { Session } from './Session';
import { SwarmFeed } from 'xdvplatform-tools/src/swarm/feed';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
const cbor = require('cbor-sync');

export interface PushFilesOptions {
    encrypt?: boolean;
    files: File[];
    queueName: string;
    address: string;
}

export interface DriveDocumentRef {
    ref: any;
    reference: object;
}
export class DriveSwarmManager {
    constructor(private wallet: Wallet, private driveSession: any) {

    }

    async pushFiles(options: PushFilesOptions) {

        const kp = await this.wallet.getKeyPair(
            this.wallet.id,
            'ES256K',
            ''
        );
        const swarmFeed = Session.getSwarmNodeClient(
            kp);
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
            } as SwarmNodeSignedContent;
        });

        const signedDocs = await forkJoin(documents).toPromise();
        const splitIntoCborAndReferences: DriveDocumentRef[] = signedDocs.map((i: SwarmNodeSignedContent) => {
            const ref =
                cbor.encode({
                    ...i,
                });

            const { contentType, name, size, signature, hash, lastModified } = i;
            return { ref, reference: { contentType, name, size, signature, hash, lastModified } };
        });


        return await this.addToTimeline(swarmFeed, kp, splitIntoCborAndReferences);
    }


    async addToTimeline(swarmFeed: SwarmFeed, kp: ec.KeyPair, contents: DriveDocumentRef[]) {
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
            version: '1.0.0-rc.1',
            documentSignatures,
            txs: underlyingHash,
            metadata: contents.map(i => i.reference),
            timestamp: moment().unix()
        }, {
            encrypt: true,
        });
        await swarmFeed.bzzFeed.setContentHash(feed, refUnderlyingHash);
    }

    static async  subscribe(swarmFeed: SwarmFeed, feedHash: any, callback) {
        return swarmFeed.bzzFeed.pollContentHash(feedHash, { changedOnly: true, interval: 2000 }).subscribe(async m => {
            const block = await swarmFeed.bzz.downloadData(m);
            callback(block);
        });
    }
}