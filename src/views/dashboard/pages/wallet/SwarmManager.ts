import { Address, Bee, PostageBatch } from '@ethersphere/bee-js';
import contentHash from 'content-hash';
import { Observable } from 'rxjs'
import { mapState, mapMutations } from 'vuex';

const beeUrl = "http://localhost:1633"
const POSTAGE_STAMPS_AMOUNT = '100';
const POSTAGE_STAMPS_DEPTH = 17;
const bee = new Bee(beeUrl);

export class SwarmManager {

    async createPostageStamp(file) {
        let intervalId;
        let hash = '';
        let intervalHashId;
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
                hash = await this.createHashFile(batchId, file);
                if(hash) {
                    clearInterval(intervalId);
                }
            }
            getHashSwarm();
        });
        
        const hashObse = new Observable(subscriber => {
            intervalHashId = setInterval(() => {
                subscriber.next(hash);
            }, 10000);
            localStorage.setItem('intervalHashId', intervalHashId);
        });
       
        return hashObse;
    }

    async createHashFile(postageBatchId, file) {
        let hash = '';
        try {
            const swarmHash = await bee.uploadFile(postageBatchId, file);
            // hash = contentHash.fromSwarm(swarmHash);
            hash = swarmHash;
        } catch (e) {
            console.log(e);
        }
        return hash;
    }

    async getFile(hash) {
        let retrievedFile;
        console.log('getFile', hash)
        try {
            retrievedFile = await bee.downloadFile(hash);
            console.log(retrievedFile);
        } catch (e) {
            console.log(e);
        }
        return retrievedFile;
    }

}