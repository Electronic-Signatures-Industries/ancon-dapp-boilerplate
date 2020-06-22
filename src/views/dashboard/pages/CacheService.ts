import find from 'pouchdb-find';
import moment from 'moment';
import PouchDB from 'pouchdb';
import { DIDDocument, KeyConvert, Wallet } from 'xdvplatform-wallet';
import { KeystoreIndex } from './KeystoreIndex';
import { SubscriptionManager } from './SubscriptionManager';

export class CacheService {
    dbCache: any;

    constructor() {
        PouchDB.plugin(find);

        this.dbCache = new PouchDB('xdv:cache');

    }
    async initialize() {
        await this.dbCache.createIndex({
            index: { fields: ['address', 'txs'] },
            ddoc: 'idx_a_txs'

        })
        await this.dbCache.createIndex({
            index: { fields: ['address', 'name'] },
            ddoc: 'idx_a_name'

        })

        await this.dbCache.createIndex({

            index: { fields: ['address', 'timestamp'] },
            ddoc: 'idx_a_timestamp'

        })
    }

    public async find(address: string, {
        txs,
        name,
        from,
        to,
    }: {
        txs?: string;
        name?: string;
        from?: number;
        to?: number;
    }) {

        try {
            const q = {
                selector: {
                    address,
                }
            };
            if (txs) {
                q.selector['txs'] = txs;
            }

            else if (name) {
                q.selector['name'] = name;
            }

            else if (from && to) {
                q.selector['timestamp'] = { $gte: from, $lte: to };
            }
            return await this.dbCache.find(q);

        } catch (e) {
            return false;
        }
    }




    public async setCachedDocuments(address: string, timestamp: number, document: any) {

        try {
            const has = await this.dbCache.get(document._id);

            if (!has)
                return this.dbCache.put({
                    ...document
                    ,
                    address,
                    timestamp,
                });
        } catch (e) {
            return this.dbCache.put({
                ...document
                ,
                address,
                timestamp,
            });
        }
    }

    public subscribeCache(address: string, filter: (doc) => {}, callback) {


        this.dbCache.changes({
            since: 0,
            filter,
            live: true,
            include_docs: true
        }).on('change', function (change) {
            // change.id contains the doc id, change.doc contains the doc
            if (change.deleted) {
                // document was deleted
            } else {
                callback(null, change)
                // document was added/modified
            }
        }).on('error', function (err) {
            // handle errors
            callback(err)
        });
    }


}