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
import { ec } from 'elliptic';
import { JWE } from 'node-jose';
import { JWK } from 'node-jose';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import { PartialChapter } from '@erebos/timeline';
import { Session } from './Session';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
const ec = require('elliptic').ec;
const cbor = require('cbor-sync');



export class MessageIO {

    constructor(private keypair: ec.KeyPair, private recipientKeypair: any, private swarmFeed: any) {

    }

    async sendEncryptedCommPayload(userAddress: string, documentPayload: any, hash: string, entry: number) {

        const kpSuite = await KeyConvert.getP256(this.keypair);

        // get document from reference
        const ref = await this.swarmFeed.bzz.downloadData(
            hash
        );
        // download ref raw
        const index: any = await this.swarmFeed.bzz.downloadData(
            ref.entries[0].hash,
            {
                mode: 'raw'
            }
        );
        const document: any = await this.swarmFeed.bzz.download(
            index.entries[entry].hash,
            {
                mode: 'raw'
            }
        );
        let buf = await document.arrayBuffer();

        // is a cbor content
        const encDoc = await JWE
            .createEncrypt([this.recipientKeypair])
            .update(buf)
            .final();

        // upload
        const encDocUrl = await this.swarmFeed.bzz.uploadData({ cipher: encDoc });

        // signed message from user
        documentPayload.txs = undefined;
        const signed = await JWTService.sign(kpSuite.pem,
            {
                ...documentPayload,
                ref: encDocUrl
            }, {
                iss: this.swarmFeed.user,
                sub: userAddress,
                aud: this.swarmFeed.user,
            } as any);

        // const feedHash = await this.swarmFeed.bzzFeed.createManifest({
        //     user: this.swarmFeed.user,
        //     name: `messaging`
        // });
        const duplexClient = new MessagingTimelineDuplexClient(this.swarmFeed, this.swarmFeed.user,
            'messaging'
        );


        const topicInstance = duplexClient.createSubject();

        const decoded = JWTService.decodeWithSignature(signed);
        await topicInstance.send(signed, decoded.signatures);

    }

    async receiveEncryptedCommPayload() {

    }

    static loadSubscriptions(callback: (message) => {}) {
        const subs = JSON.parse(localStorage.getItem('xdv:messaging:subs'));
        return subs.map((i) => {
            const { feedHash, user } = i;
            const swarmFeed = Session.getSwarmNodeQueryable(user);

            const duplexClient = new MessagingTimelineDuplexClient(
                swarmFeed,
                user,
                'messaging'
            );

            const unsubscribe = duplexClient
                .subscribe()
                .pollLatestChapter({
                    interval: 5000,
                })
                .subscribe(m=> {
                 callback({
                        ...m,
                        feedHash
                    });
                });

            return { ...i, feedHash, unsubscribe, currentUser: swarmFeed.user };
        });
    }
}