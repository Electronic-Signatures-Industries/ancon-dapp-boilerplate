/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "";
        this.securityData = null;
        this.securityWorker = null;
        this.abortControllers = new Map();
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
                data.append(key, input[key]);
                return data;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
            const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                    ...(requestParams.headers || {}),
                },
                signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
            }).then(async (response) => {
                const r = response;
                r.data = null;
                r.error = null;
                const data = await response[format]()
                    .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    }
                    else {
                        r.error = data;
                    }
                    return r;
                })
                    .catch((e) => {
                    r.error = e;
                    return r;
                });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data;
            });
        };
        Object.assign(this, apiConfig);
    }
    addQueryParam(query, key) {
        const value = query[key];
        return (encodeURIComponent(key) +
            "=" +
            encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`));
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => typeof query[key] === "object" && !Array.isArray(query[key])
            ? this.toQueryString(query[key])
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
}
/**
 * @title anconprotocol/data_union.proto
 * @version version not set
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryReadDelegate
         * @summary Queries a list of delegates items.
         * @request GET:/ancon/didregistry/delegates/{id}
         */
        this.queryReadDelegate = (id, params = {}) => this.request({
            path: `/ancon/didregistry/delegates/${id}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIdentifyOwner
         * @summary Queries a list of owners items.
         * @request GET:/ancon/didregistry/{address}
         */
        this.queryIdentifyOwner = (address, params = {}) => this.request({
            path: `/ancon/didregistry/${address}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGetAttributes
         * @summary Queries a list of Attributes items.
         * @request GET:/ancon/didregistry/{address}/attributes
         */
        this.queryGetAttributes = (address, params = {}) => this.request({
            path: `/ancon/didregistry/${address}/attributes`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGetDidKey
         * @request GET:/ancon/didregistry/{hashcid}
         */
        this.queryGetDidKey = (hashcid, params = {}) => this.request({
            path: `/ancon/didregistry/${hashcid}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryCollection
         * @summary Collection queries the NFTs of the specified denom
         * @request GET:/ancon/nft/collections/{denomId}
         */
        this.queryCollection = (denomId, query, params = {}) => this.request({
            path: `/ancon/nft/collections/${denomId}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDenoms
         * @summary Denoms queries all the denoms
         * @request GET:/ancon/nft/denoms
         */
        this.queryDenoms = (query, params = {}) => this.request({
            path: `/ancon/nft/denoms`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDenom
         * @summary Denom queries the definition of a given denom
         * @request GET:/ancon/nft/denoms/{denomId}
         */
        this.queryDenom = (denomId, params = {}) => this.request({
            path: `/ancon/nft/denoms/${denomId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryOwner
         * @summary Owner queries the NFTs of the specified owner
         * @request GET:/ancon/nft/nfts
         */
        this.queryOwner = (query, params = {}) => this.request({
            path: `/ancon/nft/nfts`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGetNft
         * @summary NFT queries the NFT for the given denom and token ID
         * @request GET:/ancon/nft/nfts/{denomId}/{tokenId}
         */
        this.queryGetNft = (denomId, tokenId, params = {}) => this.request({
            path: `/ancon/nft/nfts/${denomId}/${tokenId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryReadMetadataProof
         * @summary Reads metadata proofs
         * @request GET:/ancon/proof/{cid}/{path}
         */
        this.queryReadMetadataProof = (cid, path, params = {}) => this.request({
            path: `/ancon/proof/${cid}/${path}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryResource
         * @summary Queries a list of resource items.
         * @request GET:/ancon/resource/{cid}
         */
        this.queryResource = (cid, query, params = {}) => this.request({
            path: `/ancon/resource/${cid}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryReadRoyaltyInfo
         * @summary ReadRoyaltyInfo
         * @request GET:/ancon/royalty/{cid}/{price}
         */
        this.queryReadRoyaltyInfo = (cid, price, params = {}) => this.request({
            path: `/ancon/royalty/${cid}/${price}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryReadSchemaStoreResource
         * @request GET:/ancon/schemastore/{cid}
         */
        this.queryReadSchemaStoreResource = (cid, query, params = {}) => this.request({
            path: `/ancon/schemastore/${cid}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryReadWithPath
         * @summary Queries a list of resource items.
         * @request GET:/ancon/{cid}/{path}
         */
        this.queryReadWithPath = (cid, path, params = {}) => this.request({
            path: `/ancon/${cid}/${path}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryResolveDidWeb
         * @request GET:/user/{name}/did.json
         */
        this.queryResolveDidWeb = (name, params = {}) => this.request({
            path: `/user/${name}/did.json`,
            method: "GET",
            format: "json",
            ...params,
        });
    }
}
