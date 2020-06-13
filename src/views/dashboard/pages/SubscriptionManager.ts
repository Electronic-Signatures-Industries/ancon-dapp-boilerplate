import {
    DIDDocument,
    JOSEService,
    JWTService,
    KeyConvert,
    Wallet
    } from 'xdvplatform-tools';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
const ec = require('elliptic').ec;


export class SubscriptionManager {

    constructor(private wallet: Wallet, private recipientKeypair: any, private swarmFeed: any) {
    }

    async sendEncryptedCommPayload(userAddress: string, documentPayload: any, hash: string, entry: number) {
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
        const encDoc = await this.wallet.encryptMultipleJWE(
            [this.recipientKeypair],
            'P256',
            buf,
            true
        );

        // upload
        const encDocUrl = await this.swarmFeed.bzz.uploadData({ cipher: encDoc });

        // signed message from user
        documentPayload.txs = undefined;
        const signed = await this.wallet.signJWT('ES256K',
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
    public loadSubscriptions(callback: (message) => {}) {
        const subs = JSON.parse(localStorage.getItem('xdv:messaging:subs'));
        return subs.map((i) => {
            const { feedHash, user } = i;
            const swarmFeed = this.wallet.getSwarmNodeQueryable(user);

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