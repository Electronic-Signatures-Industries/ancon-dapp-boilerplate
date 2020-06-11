import SessionKeystore from 'session-keystore';
import { AlgorithmType } from './AlgorithmType';
import { BzzFeed } from '@erebos/bzz-feed';
import { DIDDocument, KeyConvert, Wallet } from 'xdvplatform-tools';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { JWK } from 'node-jose';
import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
import { KeystoreIndex } from './KeystoreIndex';
import { pubKeyToAddress } from '@erebos/keccak256';
import { sign } from '@erebos/secp256k1';
import { SwarmFeed } from 'xdvplatform-tools/src/swarm/feed';

const keyStore = new KeyStore();
const keyHandler = new KeyHandler(keyStore);
const KEY = 'xdv:drive:session';

export type AlgorithmTypeString = keyof typeof AlgorithmType;
export class DriveSession {
    static KeystoreInMem = new SessionKeystore();


    public static async resolveAndStoreDID(did: string) {
        const user = did.split(':')[2];
        // resolve DID
        const swarmFeed = await DriveSession.getSwarmNodeQueryable(user);

        const feedHash = await swarmFeed.bzzFeed.createManifest({
            user,
            name: did,
        });
        const resolver = await DriveSession.createDIDResolver(
            swarmFeed,
            feedHash
        );
        const document = resolver.resolve(did) as DIDDocument;
        const pub = document.publicKey[0].publicKeyJwk;


        await DriveSession.setSecure(
            did,
            'P256_JWK_PUBLIC',
            pub
        );

        // Get Key Store Index
        const localkeystoreIndex = KeystoreIndex.getIndex();
        const key = new KeystoreIndex();
        key.address = user;
        key.algorithm = AlgorithmType.P256_JWK_PUBLIC;
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
    
    public static async  getPrivateKey(id: string, algorithm: string, password: string) {
        let pvk = '';
        let key = id+algorithm;
        debugger
        if (this.KeystoreInMem && this.KeystoreInMem.get(key)) {
            return this.KeystoreInMem.get(key);
        }

        // Read value
        pvk = await keyHandler.getSecureValue(key);

        this.KeystoreInMem.set(key, pvk);
        if (AlgorithmType[algorithm] === AlgorithmType.ES256K) {
            const ES256k = new ec('secp256k1');
            return ES256k.keyFromPrivate(pvk);
        }

        if (AlgorithmType[algorithm] === AlgorithmType.P256) {
            const P256 = new ec('P256');
            return P256.keyFromPrivate(pvk);
        }

        if (AlgorithmType[algorithm] === AlgorithmType.P256_JWK_PUBLIC) {
            return await JWK.asKey(pvk, 'jwk');
        }
    }


    static setSecure(id: string, algorithm: AlgorithmTypeString, value: string) {
        const key = id + algorithm;
        // Write value
        return keyHandler.writeSecureValue(key, value);
    }
    static async browserUnlock(keystore: KeystoreIndex, password: string) {
        try {
            const base = await ethers.Wallet.fromEncryptedJson(
                keystore.keystore,
                password
            );
            return new Wallet(base.mnemonic, base);
        } catch (e) {
            console.log(e);
        }
        return null;
    }


    static async getSwarmNodeClient(keypair: ec.KeyPair) {
        console.log(pubKeyToAddress(keypair.getPublic('array')))
        const user = pubKeyToAddress(keypair.getPublic('array'));
        const swarmFeed = new SwarmFeed(
            (data) => Promise.resolve(sign(data, keypair)),
            user
        );
        swarmFeed.initialize();
        return swarmFeed;
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


    static getSwarmNodeQueryable(user: any) {
        const swarmFeed = new SwarmFeed(
            (data) => Promise.resolve(false),
            user
        );
        swarmFeed.initialize();

        return swarmFeed;
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