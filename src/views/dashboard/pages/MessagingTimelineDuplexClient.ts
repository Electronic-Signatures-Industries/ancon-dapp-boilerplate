import moment from 'moment';
import { BzzFeed } from '@erebos/bzz-feed';
import { BzzNode } from '@erebos/bzz-node';
import { Chapter, TimelineReader, TimelineWriter } from '@erebos/timeline';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { pubKeyToAddress } from '@erebos/keccak256';
import { Subject } from 'rxjs';

export class MessagingTimelineDuplexClient {
    constructor(
        private swarmFeed: any, private user: string, private feedName: string) {
    }

    /**
     * Create subject
     */
    createSubject() {
        const writer = new TimelineWriter({
            bzz: this.swarmFeed.bzzFeed,
            feed: { user: this.user, name: this.feedName},
        });

        const send =  (content, signature) => {
            const pushMessage =   writer.createAddChapter({
                author: this.swarmFeed.user,
                type: 'application/json',
                protocol: 'timeline',
                content,
                signature,
                version: '1.0.0',
                timestamp: moment().unix()
            });

         pushMessage({ content })
        }

        return { send };
    }


    /**
     * Subscribe
     */
    subscribe() {
        const reader = new TimelineReader({
            bzz: this.swarmFeed.bzzFeed,
            feed: { user: this.user, name: this.feedName},

        });
 
        return reader;
    }

}