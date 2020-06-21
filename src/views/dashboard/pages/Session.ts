import moment from 'moment';
import PouchDB from 'pouchdb';
import { DIDDocument, KeyConvert, Wallet } from 'xdvplatform-wallet';
import { KeystoreIndex } from './KeystoreIndex';
import { SubscriptionManager } from './SubscriptionManager';
let SID = '';
const WALLET_REFS_KEY = 'xdv:wallet:refs';
export class Session {
    static timeout;
    static async hasUnlock() {
        try {
            if (Session.timeout)
                clearTimeout(Session.timeout);
            Session.timeout = setTimeout(async () => {

                const ref = await this.db.get('xdv:unlock');

                await this.db.put({
                    _id: 'xdv:unlock',
                    _rev: ref._rev,
                    _deleted: true,
                });

            }, 15 * 60 * 1000);

            const item = await this.db.get('xdv:unlock');
            return !!item;

        } catch (e) {
            return false;
        }
    }

    static async getUnlock() {
        const doc = await this.db.get('xdv:unlock');
        return doc.passphrase;
    }

    static async setUnlock(passphrase: string) {
        let p;
        if (passphrase.length < 1) return;
        try {

            const ref = await this.db.get('xdv:unlock');

            p = this.db.put({
                _id: 'xdv:unlock',
                _rev: ref._rev,
                passphrase,
                timestamp: new Date(),
            });

        } catch (e) {
            p = this.db.put({
                _id: 'xdv:unlock',
                passphrase,
                timestamp: new Date(),
            });
        } finally {
        }

        return p;

    }
    static db = new PouchDB('xdv:session');
    public static async resolveAndStoreDID(wallet: Wallet, did: string) {
        const user = did.split(':')[2];
        // resolve DID
        const swarmFeed = wallet.getSwarmNodeQueryable(user);

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

        await wallet.setPublicKey(
            did,
            'P256_JWK_PUBLIC',
            JSON.stringify(pub) as any
        );

        // Get Key Store Index
        const key = new KeystoreIndex();
        key.address = user;
        //        key.algorithm = AlgorithmType.P256_JWK_PUBLIC;
        key.keystore = '';
        key.created = new Date();
        key.publicKeyFromDID = pub;
        key.name = did;

        await Session.setWalletRefs(key);

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


    static async has() {

        try {
            const item = await this.db.get('xdv:session');
            return item.currentKeystore !== undefined;

        } catch (e) {
            return false;
        }
    }




    static async get() {
        const item = await this.db.get('xdv:session');
        return item.currentKeystore;
    }

    static async set(ks: KeystoreIndex) {

        try {
            const ref = await this.db.get('xdv:session');

            return this.db.put({
                _id: 'xdv:session',
                currentKeystore: ks,
                _rev: ref._rev,
                timestamp: new Date(),
            });
        } catch (e) {
            return this.db.put({
                _id: 'xdv:session',
                currentKeystore: ks,
                timestamp: new Date(),
            });

        }
    }
    static async hasWalletRefs() {
        try {
            const item = await this.db.get(WALLET_REFS_KEY);
            return !!item;

        } catch (e) {
            return false;
        }
    }

    static async getWalletRefs() {
        const doc = await this.db.get(WALLET_REFS_KEY);
        return doc.refs;
    }

    static async setWalletRefs(ks: KeystoreIndex) {

        try {
            const ref = await this.db.get(WALLET_REFS_KEY);

            return this.db.put({
                _id: WALLET_REFS_KEY,
                refs: [...ref.refs, ks],
                _rev: ref._rev,
                timestamp: new Date(),
            });
        } catch (e) {
            return this.db.put({
                _id: WALLET_REFS_KEY,
                refs: [ks],
                timestamp: new Date(),
            });

        }
    }

}