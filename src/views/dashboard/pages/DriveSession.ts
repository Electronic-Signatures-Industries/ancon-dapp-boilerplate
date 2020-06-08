import { BzzFeed } from '@erebos/bzz-feed';
import { ethers } from 'ethers';
import { KeyConvert, Wallet } from 'xdvplatform-tools';
import { KeystoreIndex } from './KeystoreIndex';
import { sign } from '@erebos/secp256k1';
import { SwarmFeed } from 'xdvplatform-tools/src/swarm/feed';
const KEY = 'xdv:drive:session';

export class DriveSession {

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


    static async getSwarmNodeClient(wallet: Wallet) {
        const swarmKp = wallet.getES256K();
        const swarmFeed = new SwarmFeed(
            (data) => Promise.resolve(sign(data, swarmKp)),
            swarmKp.getPublic('array')
        );
        swarmFeed.initialize();
        const feedHash = await swarmFeed.bzzFeed.createManifest({
            user: swarmFeed.user,
            name: `did:xdv:${swarmFeed.user}`
        });
        return { swarmFeed, feedHash };
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


    static getSwarmNodeQueryable() {
        const driveSession = DriveSession.get();
        const swarmFeed = new SwarmFeed(
            (data) => Promise.resolve(false),
            driveSession.pub
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
        return JSON.parse(localStorage.getItem(
            'xdv:drive:session',
        ));
    }

    static set(feedHash: any, did: string, pub: any, address: string, ksName: string) {

        const driveSession = {
            ksName,
            feed: feedHash,
            did,
            pub,
            address,
        };

        localStorage.setItem(
            'xdv:drive:session',
            JSON.stringify(driveSession)
        );
    }
}