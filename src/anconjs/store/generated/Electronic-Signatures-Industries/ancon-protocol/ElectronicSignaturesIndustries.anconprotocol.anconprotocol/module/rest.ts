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

export interface AnconprotocolBaseNFT {
  id?: string;
  name?: string;
  uri?: string;
  data?: string;
  owner?: string;
  didOwner?: string;

  /** @format uint64 */
  price?: string;
}

export interface AnconprotocolCollection {
  denom?: AnconprotocolDenom;
  nfts?: AnconprotocolBaseNFT[];
}

export interface AnconprotocolDenom {
  id?: string;
  name?: string;
  schema?: string;
  creator?: string;
  symbol?: string;
  mintRestricted?: boolean;
  updateRestricted?: boolean;
}

export interface AnconprotocolIDCollection {
  denomId?: string;
  tokenIds?: string[];
}

/**
 * MsgBurnNFTResponse defines the Msg/BurnNFT response type.
 */
export type AnconprotocolMsgBurnNFTResponse = object;

export interface AnconprotocolMsgChangeOwnerResponse {
  identity?: string;
  owner?: string;

  /** @format uint64 */
  previousChange?: string;
}

export interface AnconprotocolMsgCreateDidResponse {
  cid?: string;
  did?: string;
}

/**
 * MsgEditNFTResponse defines the Msg/EditNFT response type.
 */
export type AnconprotocolMsgEditNFTResponse = object;

export interface AnconprotocolMsgGrantAttributeResponse {
  ok?: boolean;
}

export interface AnconprotocolMsgGrantDelegateResponse {
  /** @format byte */
  hash?: string;
}

/**
 * MsgIssueDenomResponse defines the Msg/IssueDenom response type.
 */
export type AnconprotocolMsgIssueDenomResponse = object;

export interface AnconprotocolMsgMetadataResponse {
  cid?: string;
}

/**
 * MsgMintNFTResponse defines the Msg/MintNFT response type.
 */
export type AnconprotocolMsgMintNFTResponse = object;

export interface AnconprotocolMsgMintTrustedContentResponse {
  /** @format uint64 */
  id?: string;
}

export interface AnconprotocolMsgMintTrustedResourceResponse {
  /** @format uint64 */
  id?: string;
}

export interface AnconprotocolMsgRevokeAttributeResponse {
  /** @format byte */
  hash?: string;
}

export interface AnconprotocolMsgRevokeDelegateResponse {
  /** @format byte */
  hash?: string;
}

export interface AnconprotocolMsgRevokeDidResponse {
  /** @format uint64 */
  id?: string;
}

/**
 * MsgTransferDenomResponse defines the Msg/TransferDenom response type.
 */
export type AnconprotocolMsgTransferDenomResponse = object;

/**
 * MsgTransferNFTResponse defines the Msg/TransferNFT response type.
 */
export type AnconprotocolMsgTransferNFTResponse = object;

export type AnconprotocolMsgUpdateDidResponse = object;

export interface AnconprotocolMsgUpdateMetadataOwnershipResponse {
  cid?: string;
}

export interface AnconprotocolOwner {
  address?: string;
  idCollections?: AnconprotocolIDCollection[];
}

export interface AnconprotocolQueryCollectionResponse {
  collection?: AnconprotocolCollection;

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface AnconprotocolQueryDenomResponse {
  denom?: AnconprotocolDenom;
}

export interface AnconprotocolQueryDenomsResponse {
  denoms?: AnconprotocolDenom[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export type AnconprotocolQueryDidWebResponse = object;

export type AnconprotocolQueryGetAttributesResponse = object;

export type AnconprotocolQueryGetDelegateResponse = object;

export type AnconprotocolQueryGetDidResponse = object;

export type AnconprotocolQueryIdentifyOwnerResponse = object;

export interface AnconprotocolQueryNFTResponse {
  nft?: AnconprotocolBaseNFT;
}

export interface AnconprotocolQueryOwnerResponse {
  owner?: AnconprotocolOwner;

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface AnconprotocolQueryProofResponse {
  root?: string;
  proof?: string;
}

export interface AnconprotocolQueryReadRoyaltyInfoResponse {
  receiver?: string;

  /** @format uint64 */
  royaltyAmount?: string;
}

export interface AnconprotocolQueryResourceResponse {
  data?: string;
}

/**
* `Any` contains an arbitrary serialized protocol buffer message along with a
URL that describes the type of the serialized message.

Protobuf library provides support to pack/unpack Any values in the form
of utility functions or additional generated methods of the Any type.

Example 1: Pack and unpack a message in C++.

    Foo foo = ...;
    Any any;
    any.PackFrom(foo);
    ...
    if (any.UnpackTo(&foo)) {
      ...
    }

Example 2: Pack and unpack a message in Java.

    Foo foo = ...;
    Any any = Any.pack(foo);
    ...
    if (any.is(Foo.class)) {
      foo = any.unpack(Foo.class);
    }

 Example 3: Pack and unpack a message in Python.

    foo = Foo(...)
    any = Any()
    any.Pack(foo)
    ...
    if any.Is(Foo.DESCRIPTOR):
      any.Unpack(foo)
      ...

 Example 4: Pack and unpack a message in Go

     foo := &pb.Foo{...}
     any, err := anypb.New(foo)
     if err != nil {
       ...
     }
     ...
     foo := &pb.Foo{}
     if err := any.UnmarshalTo(foo); err != nil {
       ...
     }

The pack methods provided by protobuf library will by default use
'type.googleapis.com/full.type.name' as the type URL and the unpack
methods only use the fully qualified type name after the last '/'
in the type URL, for example "foo.bar.com/x/y.z" will yield type
name "y.z".


JSON
====
The JSON representation of an `Any` value uses the regular
representation of the deserialized, embedded message, with an
additional field `@type` which contains the type URL. Example:

    package google.profile;
    message Person {
      string first_name = 1;
      string last_name = 2;
    }

    {
      "@type": "type.googleapis.com/google.profile.Person",
      "firstName": <string>,
      "lastName": <string>
    }

If the embedded message type is well-known and has a custom JSON
representation, that representation will be embedded adding a field
`value` which holds the custom JSON in addition to the `@type`
field. Example (for message [google.protobuf.Duration][]):

    {
      "@type": "type.googleapis.com/google.protobuf.Duration",
      "value": "1.212s"
    }
*/
export interface ProtobufAny {
  /**
   * A URL/resource name that uniquely identifies the type of the serialized
   * protocol buffer message. This string must contain at least
   * one "/" character. The last segment of the URL's path must represent
   * the fully qualified name of the type (as in
   * `path/google.protobuf.Duration`). The name should be in a canonical form
   * (e.g., leading "." is not accepted).
   *
   * In practice, teams usually precompile into the binary all types that they
   * expect it to use in the context of Any. However, for URLs which use the
   * scheme `http`, `https`, or no scheme, one can optionally set up a type
   * server that maps type URLs to message definitions as follows:
   *
   * * If no scheme is provided, `https` is assumed.
   * * An HTTP GET on the URL must yield a [google.protobuf.Type][]
   *   value in binary format, or produce an error.
   * * Applications are allowed to cache lookup results based on the
   *   URL, or have them precompiled into a binary to avoid any
   *   lookup. Therefore, binary compatibility needs to be preserved
   *   on changes to types. (Use versioned type names to manage
   *   breaking changes.)
   *
   * Note: this functionality is not currently available in the official
   * protobuf release, and it is not used for type URLs beginning with
   * type.googleapis.com.
   *
   * Schemes other than `http`, `https` (or the empty scheme) might be
   * used with implementation specific semantics.
   */
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  countTotal?: boolean;

  /** reverse is set to true if results are to be returned in the descending order. */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /** @format byte */
  nextKey?: string;

  /** @format uint64 */
  total?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
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
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
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

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title anconprotocol/did_registry.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryReadDelegate
   * @summary Queries a list of delegates items.
   * @request GET:/ancon/didregistry/delegates/{id}
   */
  queryReadDelegate = (id: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryGetDelegateResponse, RpcStatus>({
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
  queryIdentifyOwner = (address: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryIdentifyOwnerResponse, RpcStatus>({
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
  queryGetAttributes = (address: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryGetAttributesResponse, RpcStatus>({
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
   * @request GET:/ancon/didregistry/{name}
   */
  queryGetDidKey = (name: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryGetDidResponse, RpcStatus>({
      path: `/ancon/didregistry/${name}`,
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
  queryCollection = (
    denomId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<AnconprotocolQueryCollectionResponse, RpcStatus>({
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
  queryDenoms = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<AnconprotocolQueryDenomsResponse, RpcStatus>({
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
  queryDenom = (denomId: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryDenomResponse, RpcStatus>({
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
  queryOwner = (
    query?: {
      denomId?: string;
      owner?: string;
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.countTotal"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<AnconprotocolQueryOwnerResponse, RpcStatus>({
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
  queryGetNft = (denomId: string, tokenId: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryNFTResponse, RpcStatus>({
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
  queryReadMetadataProof = (cid: string, path: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryProofResponse, RpcStatus>({
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
  queryResource = (cid: string, query?: { path?: string }, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryResourceResponse, RpcStatus>({
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
  queryReadRoyaltyInfo = (cid: string, price: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryReadRoyaltyInfoResponse, RpcStatus>({
      path: `/ancon/royalty/${cid}/${price}`,
      method: "GET",
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
  queryReadWithPath = (cid: string, path: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryResourceResponse, RpcStatus>({
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
  queryResolveDidWeb = (name: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryDidWebResponse, RpcStatus>({
      path: `/user/${name}/did.json`,
      method: "GET",
      format: "json",
      ...params,
    });
}
