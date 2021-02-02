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

    async appendDocumentSet(files: File[]) {
        // get parent node
        const parent = await this.ipfs.getCurrentNode();

        // get promises of signed objects
        const pushFiles = files.map(async (f) => {
            return await this.ipfs.addSignedObject(this.did, f);
        });

        // run promises
        const items = await forkJoin(pushFiles).toPromise();

        // get indexed of ipfs
        const parentindex = await this.ipfs.addIndex(this.did, items, parent);

        // response with indexes (IPFS cid's)
        const res = await this.ipfs.setCurrentNode(
            parentindex,
        );
        debugger;
        return res.name;
    }
}