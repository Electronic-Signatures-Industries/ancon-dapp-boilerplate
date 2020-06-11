import moment from 'moment';
import { defaultPath } from 'ethers/utils/hdnode';
import {
    DocumentNodeSchema,
    JWTService,
    KeyConvert,
    Wallet
    } from 'xdvplatform-tools';
import { DriveSession } from './DriveSession';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { forkJoin } from 'rxjs';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import { PartialChapter } from '@erebos/timeline';
import { SwarmFeed } from 'xdvplatform-tools/src/swarm/feed';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
const cbor = require('cbor-sync');

export interface PushFilesOptions {
    encrypt?: boolean;
    files: File[];
    password: string;
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

        const pvk = await DriveSession.getPrivateKey(
            `${options.address}:ES256K`,
            options.password,
            DriveSession.KeystoreInMem
        );

        const ES256k = new ec('secp256k1');
        const kp = ES256k.keyFromPrivate(pvk);
        const swarmFeed = await DriveSession.getSwarmNodeClient(
            kp);

        const feed = await swarmFeed.bzzFeed.createManifest({
            user: options.address,
            name: `did:xdv:${options.address}`
        })

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

        const queue = await swarmFeed.bzzFeed.createManifest({
            user: options.address,
            name: options.queueName
        })

        console.log({
            user: options.address,
            name: 'documents',
        })
        return await this.addToTimeline(swarmFeed, options.queueName, splitIntoCborAndReferences, queue);
    }


    async addToTimeline(swarmFeed: SwarmFeed, queueName: string, contents: DriveDocumentRef[], queueHash: string) {
        console.log(queueHash)

        const directoryFixedHash = queueHash;
        // upload as directory
        let directory = {};
        contents.forEach(i => {
            const cborRef = {
                [`${i.reference.hash}/cbor`]: {
                    data: i.ref,
                    contentType: 'application/cbor'
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
        await swarmFeed.bzzFeed.setContentHash(directoryFixedHash, underlyingHash);
        const duplexClient = new MessagingTimelineDuplexClient(swarmFeed, queueHash);
        const topicInstance = duplexClient.createSubject();
        const refs = contents.map(i => i.reference);
        await topicInstance.send({ refs }, null);
    }

    static subscribe(swarmFeed: SwarmFeed, feedHash: string, callback) {
        const duplexClient = new MessagingTimelineDuplexClient(
            swarmFeed,
            feedHash
        );

        const unsubscribe = duplexClient
            .subscribe()
            .live({
                interval: 5000,
            })
            .subscribe((c: PartialChapter<SwarmNodeSignedContent>[]) => {
                c.forEach(m => callback({
                    ...m,
                    feedHash
                }));
            });
        return unsubscribe;

    }
}