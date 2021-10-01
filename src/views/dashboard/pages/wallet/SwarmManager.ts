import { Address, Bee, PostageBatch } from '@ethersphere/bee-js';

const beeUrl = "http://localhost:1633"
const POSTAGE_STAMPS_AMOUNT = BigInt(100)
const POSTAGE_STAMPS_DEPTH = 17
const bee = new Bee(beeUrl);

export class SwarmManager {

    async createPostageStamp() {
        try {
         const postageBatchId = await bee.createPostageBatch(
                POSTAGE_STAMPS_AMOUNT.toString(), 
                POSTAGE_STAMPS_DEPTH
            );
            return postageBatchId;
        }
        catch(e) {
            console.log(e);
        }
    }

    async createHashFile(file) {
        console.log(file);
        try {
            const postageBatchId = await this.createPostageStamp();
            const hash = await bee.uploadFile(postageBatchId, file)
            console.log(hash);
            return { hash }
        } catch (e) {
            console.log(e);
        }
       
    }

}