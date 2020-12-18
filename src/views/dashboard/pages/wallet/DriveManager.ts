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
        // todo: read ipns
        const pushFiles = files.map(async (f) => {
            return await this.ipfs.addSignedObject(this.did, f);
        });

        const items = await forkJoin(pushFiles).toPromise();
        
        // todo: set previous, and update next
        const res = await this.ipfs.setCurrentNode(
            this.did,
            items[0],
        );
    }
}