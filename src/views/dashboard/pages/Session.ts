import { DIDDocument, KeyConvert, Wallet } from 'xdvplatform-tools';
import { KeystoreIndex } from './KeystoreIndex';
import { SubscriptionManager } from './SubscriptionManager';

const KEY = 'xdv:drive:session';
export class Session {
    static wallet:  Wallet = new Wallet();
    static subscriptions: SubscriptionManager;

    public static setWallet(id: string,  onPassphrase: any){
        Session.wallet.open(id, onPassphrase);
    }
    public static async resolveAndStoreDID(did: string) {
        const user = did.split(':')[2];
        // resolve DID
        const swarmFeed = Session.wallet.getSwarmNodeQueryable(user);

        const feedHash = await swarmFeed.bzzFeed.createManifest({
            user,
            name: did,
        });
        const resolver = await Session.createDIDResolver(
            swarmFeed,
            feedHash
        );
        const document = resolver.resolve(did) as DIDDocument;
        const pub = document.publicKey[0].publicKeyJwk;

        await Session.wallet.setPublicKey(
            did,
            'P256_JWK_PUBLIC',
            JSON.stringify(pub) as any
        );

        // Get Key Store Index
        const localkeystoreIndex = KeystoreIndex.getIndex();
        const key = new KeystoreIndex();
        key.address = user;
//        key.algorithm = AlgorithmType.P256_JWK_PUBLIC;
        key.keystore = '';
        key.created = new Date();
        key.publicKeyFromDID = pub;
        key.name = did;

        // store
        if (localkeystoreIndex.find(i => i.name === key.name)) {
            // already exists
            return;
        }
        KeystoreIndex.setIndex([...localkeystoreIndex, key]);

    }
    


    static async createDIDResolver(swarmFeed: any, feed: string) {
        let { body } = await swarmFeed.bzzFeed.getContent(feed, {
            path: 'index.json',
        });

        let reader = new Response(body);
        let content = await reader.json();

        return {
            resolve: (did: string) => {
                if (did === content.id) {
                    return content;
                }
                else {
                    throw new Error('DID invalido');
                }
            }
        };
    }


    static has() {
        try {
            JSON.parse(localStorage.getItem(
                'xdv:drive:session',
            ));
            return true;
        } catch (e) {
            return false;
        }
    }

    static get() {
        const session = JSON.parse(localStorage.getItem(
            'xdv:drive:session',
        ));

        if (!!session.address) {
            session.address = session.did.split(':')[2];
        }

        return session;
    }

    static set(did: string, address: string, ksName: string) {

        const driveSession = {
            ksName,
            did,
            address,
        };

        localStorage.setItem(
            'xdv:drive:session',
            JSON.stringify(driveSession)
        );

    }


}