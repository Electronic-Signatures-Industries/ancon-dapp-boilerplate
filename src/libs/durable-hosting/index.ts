import { BzzFeed, FeedID } from '@erebos/bzz-feed'
import { getFeedTopic } from '@erebos/bzz-feed/esm/feed'
import { BzzBrowser } from '@erebos/bzz-browser'
import { pubKeyToAddress } from '@erebos/keccak256'
import { createKeyPair, sign } from '@erebos/secp256k1'
import { forkJoin } from 'rxjs'

const PromiseFileReader = require("promise-file-reader");

// const BZZ_URL = 'https://dappnode.auth2factor.com/swarm/';
const BZZ_URL = "https://swarm-gateways.net/";

function initialize(pvk: string) {
    const keyPair = createKeyPair(pvk);
    const user = pubKeyToAddress(keyPair.getPublic('array'))
    const signBytes = async bytes => sign(bytes, keyPair)
    const bzz = new BzzBrowser({ url: BZZ_URL });
    const bzzFeed = new BzzFeed({ bzz, signBytes })

    return { bzzFeed, bzz, user };
}
export async function publishDirectory({ name, pvk, defaultPath, contents }: {
    name: string,
    pvk: string;
    contents: File[];
    defaultPath: string,

}) {

    const { bzz, bzzFeed, user } = initialize(pvk);
    const feedHash = await bzzFeed.createManifest({
        user, name
    });

    // upload as directory
    let directory = {};
    let displayFeedDirectory = {};
    contents.forEach(i => {
        const item = {
            // @ts-ignore
            [i.filename || i.name]: {
                data: i,
                contentType: i.type,
                size: i.size,
            }
        }
        console.log(item)
        directory = {
            ...item,
            ...directory,
        };
    });

    const hash = await bzz.uploadDirectory(directory, {
        encrypt: true,
        defaultPath,
    });


    contents.forEach(i => {
        const uiItem = {
            // @ts-ignore
            [i.filename || i.name]: {
                // @ts-ignore
                name: i.filename || i.name,
                contentType: i.type,
                size: i.size,
                // @ts-ignore
                url: `bzz:/${feedHash}/${i.filename || i.name}`
            }
        }

        displayFeedDirectory = {
            ...uiItem,
            ...displayFeedDirectory,
        }
    })

    const feedH = await bzzFeed.setContentHash(feedHash, hash);

    return { displayFeedDirectory, feed: feedH, feedHash, user, hostingName: name, contentUrl: `${BZZ_URL}bzz:/${feedHash}` };
}

export async function getContents({ hash, pvk }: { hash: string, pvk: string }) {

    const { bzz, bzzFeed, user } = initialize(pvk);
    return await bzzFeed.getContent(hash);

}

export function generateKeyPair() {
    const keyPair = createKeyPair();
    return keyPair.getPrivate('hex');
}