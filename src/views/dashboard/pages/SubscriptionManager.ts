import {
    DIDDocument,
    JOSEService,
    JWTService,
    KeyConvert,
    Wallet
    } from 'xdvplatform-wallet/src';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
const ec = require('elliptic').ec;
const cbor = require('cbor-sync');


export class SubscriptionManager {

    constructor(private wallet: Wallet, private recipientKeypair: any, private swarmFeed: any) {
    }

    async sendEncryptedCommPayload(userAddress: string, documentPayload: any, hash: string, entry: number) {
        // get document from reference
        // get document from reference
        const ref = await this.swarmFeed.bzz.downloadData(
            hash
        );
        // download ref raw
        const documentCbor: any = await this.swarmFeed.bzz.download(
            ref.entries[entry].hash,
            {
                mode: 'raw'
            }
        );

        let indexDocument;
        let document;

        indexDocument = await documentCbor.arrayBuffer();
        document = cbor.decode(Buffer.from(indexDocument));
        // }
        const base64Content = (document).content;
        // is a cbor content
        const [errEnc, encDoc] = await this.wallet.encryptJWE(
            'P256',
            Buffer.from(base64Content),
            this.recipientKeypair,
        );

        // upload
        const encDocUrl = await this.swarmFeed.bzz.uploadData({ cipher: encDoc });

        // signed message from user
        documentPayload.txs = undefined;
        const [errSign, signed] = await this.wallet.signJWT('ES256K',
            {
                ...documentPayload,
                ref: encDocUrl
            }, {
                iss: this.swarmFeed.user,
                sub: userAddress,
                aud: this.swarmFeed.user,
            } as any);

        const duplexClient = new MessagingTimelineDuplexClient(this.swarmFeed, this.swarmFeed.user,
            'messaging'
        );

        const topicInstance = duplexClient.createSubject();
        const decoded = JWTService.decodeWithSignature(signed);
        await topicInstance.send(signed, decoded.signatures);
    }

    /**
     * Load subscriptions
     * @param callback 
     */
    public static loadSubscriptions(user: string, callback: (message) => {}) {
        const subs = JSON.parse(localStorage.getItem('xdv:messaging:subs'));
        return subs.map((i) => {
            const { feedHash, user } = i;
            const wallet = new Wallet();
            const swarmFeed = wallet.getSwarmNodeQueryable(user);

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
                .subscribe(m => {
                    callback({
                        ...m,
                        feedHash
                    });
                });

            return { ...i, feedHash, unsubscribe, currentUser: swarmFeed.user };
        });
    }
}