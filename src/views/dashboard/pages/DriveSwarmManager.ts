import { DocumentNodeSchema, KeyConvert, Wallet } from 'xdvplatform-tools';
import { DriveSession } from './DriveSession';
import { ethers } from 'ethers';
import { forkJoin } from 'rxjs';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';

export interface PushFilesOptions {
    encrypt?: boolean;
    files: File[];
}
export class DriveSwarmManager {
    constructor(private wallet: Wallet, private driveSession: any) {

    }

    async pushFiles(options: PushFilesOptions) {

        const did = this.driveSession.did;
        const kp = this.wallet.getP256();
        const kpJwk = await KeyConvert.getP256(kp);

        const swarmKp = this.wallet.getES256K();
        const { swarmFeed } = await DriveSession.getSwarmNodeClient(this.wallet);
        const feed = this.driveSession.feed.feedHash || this.driveSession.feed;
        const metadata = await swarmFeed.bzzFeed.getMetadata(feed);
        const documents = options.files.map(async (i) => {
            let ab = await (i as Blob).arrayBuffer();
            let buf = new Uint8Array(ab);
            const hash = ethers.utils.keccak256(buf) as string;
            const signature = kp.sign(hash.replace('0x', ''));

            return {
                contentType: i.type,
                name: i.name,
                lastModified: i.lastModified,
                size: i.size,
                content: ethers.utils.base64.encode(buf),
                signature,
                hash,
            } as SwarmNodeSignedContent;
        });

        // get index json
        const index = await swarmFeed.bzzFeed.getContent(feed, {
            path: 'index.json',
        });
        const readerIndex = new Response(index.body);
        const indexJson = await readerIndex.json();
        // get index json
        const { body } = await swarmFeed.bzzFeed.getContent(feed, {
            path: 'docs/refs.json',
        });
        const reader = new Response(body);
        const docsJson = await reader.json();
        let patchRefs = {
            docs: docsJson.docs || {},
        };
        const signedDocs = await forkJoin(documents).toPromise();
        const refs = signedDocs.map(async (i: SwarmNodeSignedContent) => {
            const data =
            {
                ...i,
                '$did': did.id,
            }

            const ref = await swarmFeed.bzzFeed.setContent(
                metadata.feed,
                JSON.stringify(data),
                { encrypt: true,
                path: `docs/${i.name}.json` });
            const { contentType, name, size, signature, hash, lastModified } = i;
            return { ref, contentType, name, size, signature, hash, lastModified };
        });

        const items = await forkJoin(refs).toPromise();
        items.map((i) => {
            patchRefs.docs = {
                ...patchRefs.docs,
                [i.hash]: { ...i },
            };
        });
        const payload = {
            'index.json': {
                ...indexJson,
            },
            'docs/refs.json': patchRefs,
        };

        const res = await swarmFeed.publishDirectory({
            name: did,
            contents: swarmFeed.toSwarmPayload(payload),
            defaultPath: 'index.json',
        });

    }
}