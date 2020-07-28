import find from 'pouchdb-find';
import PouchDB from 'pouchdb';
import { XVDSwarmNodeBlock } from './DriveSwarmManager';

type CacheContent = string;

export interface FindQuery {
  txs?: string;
  name?: string;
  from?: number;
  to?: number;
}

export type ExportCacheCallback = (
  error: Error,
  change?: PouchDB.Core.ChangesResponseChange<CacheContent>
) => void;

const DOCUMENT_TREE = 'xdv:document:tree';
export class CacheService {
  private dbCache: PouchDB.Database<CacheContent>;

  constructor() {
    PouchDB.plugin(find);

    this.dbCache = new PouchDB("xdv:cache");
  }

  async initialize() {
    await this.dbCache.createIndex({
      index: {
        fields: ["address", "txs"],
        ddoc: "idx_a_txs",
      },
    });

    await this.dbCache.createIndex({
      index: {
        fields: ["address", "name"],
        ddoc: "idx_a_name",
      },
    });

    await this.dbCache.createIndex({
      index: {
        fields: ["address", "timestamp"],
        ddoc: "idx_a_timestamp",
      },
    });
  }

  public async find(address: string, query: FindQuery) {
    const { txs, name, from, to } = query;

    try {
      const q: PouchDB.Find.FindRequest<CacheContent> = {
        selector: {
          address,
        },
      };
      if (txs) {
        q.selector["txs"] = txs;
      } else if (name) {
        q.selector["name"] = name;
      } else if (from && to) {
        q.selector["timestamp"] = { $gte: from, $lte: to };
      }
      return await this.dbCache.find(q);
    } catch (e) {
      return false;
    }
  }

  public async setCachedDocuments(
    address: string,
    timestamp: number,
    document: any
  ) {
    try {
      const has = await this.dbCache.get(document._id);

      if (!has)
        return this.dbCache.put({
          ...document,
          address,
          timestamp,
        });
    } catch (e) {
      return this.dbCache.put({
        ...document,
        address,
        timestamp,
      });
    }
  }





  public async setBlockCache(
    block: XVDSwarmNodeBlock,
    id: string
  ) {
    try {
      const has = await this.dbCache.get(id);
      if (!has)
        return this.dbCache.put({
          ...block, _id: id
        });
    } catch (e) {
      return this.dbCache.put({
        ...block,
        _id: id
      });
    }
  }


  /**
     * Checks to see if there are available documents
     */
  public async hasBlocks() {
    try {
      const item = await this.dbCache.get(DOCUMENT_TREE);
      return !!item;

    } catch (e) {
      return false;
    }
  }

  public async getBlocks() {
    const doc: any = await this.dbCache.get(DOCUMENT_TREE);
    return Object.values(doc.refs);
  }

  /**
   * Sets document
   * @param block Block
   * @param update if update otherwise create
   */
  public async setBlocks(block: XVDSwarmNodeBlock) {

    try {
      const ref: any = await this.dbCache.get(DOCUMENT_TREE);
      return this.dbCache.put({
        _id: DOCUMENT_TREE,
        refs: { ...ref.refs, [block.timestamp]: block },
        _rev: ref._rev,
        timestamp: new Date(),
      });
    } catch (e) {
      return this.dbCache.put({
        _id: DOCUMENT_TREE,
        refs: { [block.timestamp]: block },
        timestamp: new Date(),
      });

    }
  }
  // public async removeWalletRef(item: any) {
  //   const ref: any = await this.dbCache.get(DOCUMENT_TREE);

  //   // remove
  //   let refs = {};
  //   const keys = Object.keys(ref.refs);
  //   for (let i = 0; i < keys.length; i++) {
  //     if (ref.refs[keys[i]].name !== item.name) {
  //       refs = {
  //         ...refs,
  //         [keys[i]]: ref.refs[keys[i]]
  //       }
  //     }
  //   }

  //   return this.db.put({
  //     _id: DOCUMENT_TREE,
  //     refs,
  //     _rev: ref._rev,
  //     timestamp: new Date(),
  //   });
// }



  public subscribeCache(
  address: string,
  filter: string | ((doc: any, params: any) => any),
  callback: ExportCacheCallback
) {
  return this.dbCache
    .changes({
      since: 0,
      filter,
      limit: 20,
      live: true,
      include_docs: true,
    })
    .on("change", function (change) {
      // change.id contains the doc id, change.doc contains the doc
      if (change.deleted) {
        // document was deleted
      } else {
        callback(null, change);
        // document was added/modified
      }
    })
    .on("error", function (err) {
      // handle errors
      callback(err);
    });
}
}
