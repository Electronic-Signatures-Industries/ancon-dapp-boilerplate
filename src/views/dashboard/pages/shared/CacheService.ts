import find from 'pouchdb-find';
import PouchDB from 'pouchdb';

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
      .on("change", function(change) {
        // change.id contains the doc id, change.doc contains the doc
        if (change.deleted) {
          // document was deleted
        } else {
          callback(null, change);
          // document was added/modified
        }
      })
      .on("error", function(err) {
        // handle errors
        callback(err);
      });
  }
}
