import { DID } from 'dids';
import { forkJoin } from 'rxjs';
import { DIDManager } from './DIDManager';
import { IPFSManager } from './IPFSManager';

export class DriveManager {
    constructor(
        private ipfs: IPFSManager,
        private did: DID        
    ) {

    }

    async createDocumentSet(files: File[]){
        // get promises of signed objects
        const pushFiles = files.map(async (f) => {
            return await this.ipfs.addSignedObject(this.did, f);
        });

        // run promises
        const items = await forkJoin(pushFiles).toPromise();
        
        // get indexed of ipfs
        const parentindex = await this.ipfs.addIndex(this.did, items);

        return parentindex;
    }

    async appendDocumentSet(files: File[]) {

        // get promises of signed objects
        const pushFiles = files.map(async (f) => {
            return await this.ipfs.addSignedObject(this.did, f);
        });

        // response with indexes (IPFS cid's)
        const res = await this.ipfs.setCurrentNode(
            parentindex,
        );

        return res.name;
    }
}