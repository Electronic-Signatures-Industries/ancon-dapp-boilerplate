import moment from 'moment';
import PouchDB from 'pouchdb';
import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnect from '@walletconnect/client';
import { DIDDocument, Wallet } from 'xdvplatform-wallet/src';
import { DIDSigner, KeystoreIndex } from './KeystoreIndex';
import { Token } from './Token';

PouchDB.plugin(require('pouchdb-find'));

const WALLET_REFS_KEY = 'xdv:wallet:refs';
const TOKENS_KEY = 'xdv:tokens';

export class Session {

    static timeout;
    static walletConnect: WalletConnect;
    static db = new PouchDB('xdv:session');
    static SharedWallet: Wallet;

    static async sign(data: Buffer, address: string, signerType: DIDSigner) {
        if (signerType === DIDSigner.Walletconnect) {
            const msgParams = [data.toString('hex'), address];
            Session.walletConnect = new WalletConnect({
                bridge: 'https://bridge.walletconnect.org', // Required
                qrcodeModal: QRCodeModal,
            });

            // Sign personal message
            return Session.walletConnect
                .signPersonalMessage(msgParams);
        }
        if (signerType === DIDSigner.Ledger) {

        }
        return null;
    }
    static async getTokens({ chain }) {
        const tokens: Token[] = await this.db.get(TOKENS_KEY);
        if (tokens) {
            return Object.values(tokens).filter(i => i.chain === chain );
        } else {
            return Object.values(tokens);

        }
    }

    /**
     * Sets tokens
     * @param token Token
     * @param update if update otherwise create
     */
    static async setTokens(token: Token, update: boolean = false) {

        try {
            const ref: any = await this.db.get(TOKENS_KEY);
            return this.db.put({
                _id: TOKENS_KEY,
                ...ref,
                [token.symbol]: token,
                _rev: ref._rev,
                timestamp: new Date(),
            });
        } catch (e) {
            return this.db.put({
                _id: TOKENS_KEY,
                [token.symbol]: token,
                timestamp: new Date(),
            });

        }
    }

    /**
     * Resolves and stores a DID in wallet
     * @param wallet Wallet
     * @param did DID id
     * @param name Name to save DID as
     */
    public static async resolveAndStoreDID(wallet: Wallet, did: string, name: string = did) {
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
            did + (new Date()).getTime(),
            'P256_JWK_PUBLIC',
            JSON.stringify(pub) as any
        );

        // Get Key Store Index
        const key = new KeystoreIndex();
        key.address = user;
        //        key.algorithm = AlgorithmType.P256_JWK_PUBLIC;
        key.keystore = did;
        key.created = new Date();
        key.publicKeyFromDID = pub;
        key.name = name;

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


    /**
     * Gets keystore from session db
     */
    static async getSessionInfo(): Promise<{
        currentKeystore: KeystoreIndex;
        unlock: boolean;

    }> {
        try {
            const item = await this.db.get('xdv:session');
            return { ...item } as any;
        } catch (e) {
            return { currentKeystore: null, unlock: null };
        }
    }

    /**
     * Sets a keystore index, if keystore is diff, then clears unlock (unlock set to false)
     * @param ks 
     */
    static async set({ ks, unlock = undefined }: any & {
        ks: KeystoreIndex;
        unlock: any;
    }) {
        const templ = {
            _id: 'xdv:session',
            currentKeystore: ks,
            unlock,
            timestamp: new Date(),
        };
        try {
            let ref: any & {
                currentKeystore: KeystoreIndex;
                unlock: boolean;

            } = await this.db.get('xdv:session');
            if (ks.keystore !== ref.currentKeystore.keystore) {
                // if diff, then clear unlock=false
                ref = await this.db.put({
                    _id: 'xdv:session',
                    _deleted: true,
                    _rev: ref._rev,
                });
            }
            // @ts-ignore
            templ._rev = ref._rev;
            if (unlock !== undefined) {
                templ.unlock = unlock;
            }
            return this.db.put(templ);
        } catch (e) {
            return this.db.put(templ);

        }
    }

    /**
     * Checks to see if there are available wallets
     */
    static async hasWalletRefs() {
        try {
            const item = await this.db.get(WALLET_REFS_KEY);
            return !!item;

        } catch (e) {
            return false;
        }
    }

    static async getWalletRefs() {
        const doc: any = await this.db.get(WALLET_REFS_KEY);
        return Object.values(doc.refs);
    }

    /**
     * Sets wallet keystore
     * @param ks Keystore Item
     * @param update if update otherwise create
     */
    static async setWalletRefs(ks: KeystoreIndex, update: boolean = false) {

        try {
            const ref: any = await this.db.get(WALLET_REFS_KEY);
            return this.db.put({
                _id: WALLET_REFS_KEY,
                refs: { ...ref.refs, [ks.keystore]: ks },
                _rev: ref._rev,
                timestamp: new Date(),
            });
        } catch (e) {
            return this.db.put({
                _id: WALLET_REFS_KEY,
                refs: { [ks.keystore]: ks },
                timestamp: new Date(),
            });

        }
    }
    static async removeWalletRef(item: KeystoreIndex) {
        const ref: any = await this.db.get(WALLET_REFS_KEY);

        // remove
        let refs = {};
        const keys = Object.keys(ref.refs);
        for (let i = 0;i<keys.length;i++) {
            if (ref.refs[keys[i]].name !== item.name) {
                refs = {
                    ...refs,
                    [keys[i]]: ref.refs[keys[i]]
                }                
            }
        }

        return this.db.put({
            _id: WALLET_REFS_KEY,
            refs,
            _rev: ref._rev,
            timestamp: new Date(),
        });
    }

}