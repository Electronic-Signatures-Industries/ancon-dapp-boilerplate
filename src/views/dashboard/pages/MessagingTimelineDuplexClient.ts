import { BzzFeed } from '@erebos/bzz-feed';
import { BzzNode } from '@erebos/bzz-node';
import { Chapter, TimelineReader, TimelineWriter } from '@erebos/timeline';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { pubKeyToAddress } from '@erebos/keccak256';
import { Subject } from 'rxjs';

export class MessagingTimelineDuplexClient {
    constructor(
        private swarmFeed: any, private feed: string) {
    }

    createSubject(topicName?: string) {
        // In this example we are Alice communicating with Bob
        const writer = new TimelineWriter({
            bzz: this.swarmFeed.bzzFeed,
            feed: this.feed,
        });

        const pushMessage = writer.createAddChapter({
            author: this.swarmFeed.user,
            type: 'application/json'
        });

        const send = (message, signature) => {
            pushMessage({ content: message, signature })
        }

        return { send };
    }


    subscribe() {
        const reader = new TimelineReader({
            bzz: this.swarmFeed.bzzFeed,
            feed: this.feed,
        }); // 10 seconds
            // .subscribe(chapters => {
            //     chapters.forEach(c => {
            //         console.log(`New message from Alice: ${c.content}`)
            //     })
            // })

        return reader;
    }

}