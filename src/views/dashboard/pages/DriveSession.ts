import SessionKeystore from 'session-keystore';
import { BzzFeed } from '@erebos/bzz-feed';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { KeyConvert, Wallet } from 'xdvplatform-tools';
import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
import { KeystoreIndex } from './KeystoreIndex';
import { pubKeyToAddress } from '@erebos/keccak256';
import { sign } from '@erebos/secp256k1';
import { SwarmFeed } from 'xdvplatform-tools/src/swarm/feed';

const keyStore = new KeyStore();
const keyHandler = new KeyHandler(keyStore);

const KEY = 'xdv:drive:session';
export class DriveSession {
    static KeystoreInMem = new SessionKeystore();



    public static async  getPrivateKey( id: string, password: string, session = null) {
        let pvk = '';
        if (session && session.get(id)) {
            return session.get(id);
        }

        // Read value
        pvk = await keyHandler.getSecureValue(id);

        session.set(id, pvk);
        return pvk;
    }


    static setSecure(key: string, value: string) {
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