import { base64 } from 'ethers/utils';
import {
    DIDDocument,
    JOSEService,
    JWTService,
    KeyConvert,
    Wallet
    } from 'xdvplatform-tools';
import { DriveSession } from './DriveSession';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import { PartialChapter } from '@erebos/timeline';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';

export interface XDVMessageConfig {
    address: string;
    feed: any;
}


export class MessageIO {

    constructor(private wallet: Wallet, private swarmFeed: any) {

    }

    async sendEncryptedCommPayload(shareInfo: XDVMessageConfig, documentPayload: SwarmNodeSignedContent) {
        const resolver = await DriveSession.createDIDResolver(
            this.swarmFeed,
            shareInfo.feed
        );

        const did = resolver.resolve(
            `did:xdv:${shareInfo.address}`
        ) as DIDDocument;
        const pub = did.publicKey[0].publicKeyJwk;

        const kp = this.wallet.getES256K();
        const kpSuite = await KeyConvert.getES256K(kp);

        // get document from reference
        const document = await this.swarmFeed.bzz.downloadData(
            documentPayload.ref
        );
        // encrypt and store
        const encDoc = await JOSEService.encrypt(pub, document.content);

        // upload
        const encDocUrl = await this.swarmFeed.bzz.uploadData({ cipher: encDoc });

        // signed message from user
        const signed = await JWTService.sign(kpSuite.pem,
            {
                ...documentPayload,
                ref: encDocUrl
            }, {
                iss: this.swarmFeed.user,
                sub: shareInfo.address,
                aud: this.swarmFeed.user,
            } as any);

        const feedHash = await this.swarmFeed.bzzFeed.createManifest({
            user: this.swarmFeed.user,
            name: `${this.swarmFeed.user}:${shareInfo.address}`
        });
        const duplexClient = new MessagingTimelineDuplexClient(this.swarmFeed, feedHash);

        // topic is user did
        const topic = did.id;

        const topicInstance = duplexClient.createSubject(topic);

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
                    c.forEach(callback);
                });

            return { ...i, unsubscribe, currentUser: swarmFeed.user };
        });
    }
}