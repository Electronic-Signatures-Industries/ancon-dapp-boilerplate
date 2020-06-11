import { AlgorithmType } from './AlgorithmType';
import { base64 } from 'ethers/utils';
import { decrypt, encrypt, PrivateKey } from 'eciesjs';
import {
    DIDDocument,
    JOSEService,
    JWTService,
    KeyConvert,
    Wallet
    } from 'xdvplatform-tools';
import { DriveSession } from './DriveSession';
import { ec } from 'elliptic';
import { JWE } from 'node-jose';
import { JWK } from 'node-jose';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import { PartialChapter } from '@erebos/timeline';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
const ec = require('elliptic').ec;
const cbor = require('cbor-sync');



export class MessageIO {

    constructor(private keypair: ec.KeyPair, private recipientKeypair: any, private swarmFeed: any) {

    }

    async sendEncryptedCommPayload(keypair: any, swarmFeed: any, userAddress: string, documentPayload: SwarmNodeSignedContent) {
        
        const kpSuite = await KeyConvert.getP256(this.keypair);

        // get document from reference
        const document = await swarmFeed.bzz.downloadFile(
            documentPayload.ref
        );

        const encDoc  = await JWE
        .createEncrypt([this.recipientKeypair])
        .update(Buffer.from((document)))
        .final();

        // upload
        const encDocUrl = await swarmFeed.bzz.uploadData({ cipher: encDoc });

        // signed message from user
        const signed = await JWTService.sign(kpSuite.pem,
            {
                ...documentPayload,
                ref: encDocUrl
            }, {
                iss: this.swarmFeed.user,
                sub: userAddress,
                aud: this.swarmFeed.user,
            } as any);

        const feedHash = await this.swarmFeed.bzzFeed.createManifest({
            user: this.swarmFeed.user,
            name: `${this.swarmFeed.user}:${userAddress}`
        });
        const duplexClient = new MessagingTimelineDuplexClient(this.swarmFeed, feedHash);


        const topicInstance = duplexClient.createSubject();

        const decoded = JWTService.decodeWithSignature(signed);
        await topicInstance.send(signed, decoded.signatures);

    }

    async receiveEncryptedCommPayload() {

    }

    static loadSubscriptions(callback: (message) => {}) {
        const subs = JSON.parse(localStorage.getItem('xdv:messaging:subs'));
        return subs.map((i) => {
            const { did, feedHash, pub } = i;
            const swarmFeed = DriveSession.getSwarmNodeQueryable(pub);

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

            return { ...i, feedHash, did, unsubscribe, currentUser: swarmFeed.user };
        });
    }
}