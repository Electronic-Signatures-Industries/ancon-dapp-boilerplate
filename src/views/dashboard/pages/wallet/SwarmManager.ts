import { Address, Bee, PostageBatch } from '@ethersphere/bee-js';
import contentHash from 'content-hash';
import { Observable } from 'rxjs'

const beeUrl = "http://localhost:1633"
const POSTAGE_STAMPS_AMOUNT = '100';
const POSTAGE_STAMPS_DEPTH = 17;
const bee = new Bee(beeUrl);

export class SwarmManager {

    async createPostageStamp(file) {
        let intervalId;
        const postageBatchIdObse = new Observable(subscriber => {
            const getPostageBatchId = async () => {
                try {
                    const postageBatchId = await bee.createPostageBatch(POSTAGE_STAMPS_AMOUNT, POSTAGE_STAMPS_DEPTH);
                    intervalId = setInterval(() => {
                        subscriber.next(postageBatchId);
                    }, 20000);
                } catch (error) {   
                }
            }
            getPostageBatchId();
        });
        postageBatchIdObse.subscribe(batchId => {
            const getHashSwarm = async () => {
                const hash = await this.createHashFile(batchId, file);
                if(hash) {
                    clearInterval(intervalId);
                }
                console.log(hash);
            }
            getHashSwarm();
        });
    }

    async createHashFile(postageBatchId, file) {
        let hash = '';
        try {
            const swarmHash = await bee.uploadFile(postageBatchId, file);
            hash = contentHash.fromSwarm(swarmHash);
        } catch (e) {
            console.log(e);
        }
        return hash;
    }

}