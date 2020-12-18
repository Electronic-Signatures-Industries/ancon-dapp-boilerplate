import { DID } from 'dids';
import { forkJoin } from 'rxjs';
import { DIDManager } from './DIDManager';
import { IPFSManager } from './IPFSManager';

export class DriveManager {
    constructor(
        private ipfs: IPFSManager,
        private didService: DIDManager,
        private did: DID        
    ) {

    }

    async appendDocumentSet(files: File[]) {
        const parent = await this.ipfs.getCurrentNode();
        const pushFiles = files.map(async (f) => {
            return await this.ipfs.addSignedObject(this.did, f);
        });
        const items = await forkJoin(pushFiles).toPromise();
        const parentindex = await this.ipfs.addIndex(this.did, items, parent);
        const res = await this.ipfs.setCurrentNode(
            parentindex,
        );

        return res;
    }
}