import { Reader, Writer } from 'protobufjs/minimal';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { Owner, Collection, Denom, BaseNFT } from '../anconprotocol/nft';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface QueryDidWebRequest {
    name: string;
}
export interface QueryDidWebResponse {
}
export interface QueryProofMetadataRequest {
    cid: string;
    path: string;
}
export interface QueryProofResponse {
    root: string;
    proof: string;
}
export interface QueryGetDidRequest {
    name: string;
}
export interface QueryGetDidResponse {
}
export interface QueryReadDidKeyRequest {
    name: string;
}
export interface QueryReadDidKeyResponse {
}
export interface QueryReadRoyaltyInfo {
    cid: string;
    /** fee % * sales amount */
    price: string;
}
export interface QueryReadRoyaltyInfoResponse {
    receiver: string;
    /** fee % * sales amount */
    royaltyAmount: number;
}
/** QueryOwnerRequest is the request type for the Query/Owner RPC method */
export interface QueryOwnerRequest {
    denomId: string;
    owner: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryOwnerResponse is the response type for the Query/Owner RPC method */
export interface QueryOwnerResponse {
    owner: Owner | undefined;
    pagination: PageResponse | undefined;
}
/** QueryCollectionRequest is the request type for the Query/Collection RPC method */
export interface QueryCollectionRequest {
    denomId: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryCollectionResponse is the response type for the Query/Collection RPC method */
export interface QueryCollectionResponse {
    collection: Collection | undefined;
    pagination: PageResponse | undefined;
}
/** QueryDenomRequest is the request type for the Query/Denom RPC method */
export interface QueryDenomRequest {
    denomId: string;
}
/** QueryDenomResponse is the response type for the Query/Denom RPC method */
export interface QueryDenomResponse {
    denom: Denom | undefined;
}
/** QueryDenomsRequest is the request type for the Query/Denoms RPC method */
export interface QueryDenomsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryDenomsResponse is the response type for the Query/Denoms RPC method */
export interface QueryDenomsResponse {
    denoms: Denom[];
    pagination: PageResponse | undefined;
}
/** QueryNFTRequest is the request type for the Query/NFT RPC method */
export interface QueryNFTRequest {
    denomId: string;
    tokenId: string;
}
/** QueryNFTResponse is the response type for the Query/NFT RPC method */
export interface QueryNFTResponse {
    nft: BaseNFT | undefined;
}
export interface QueryGetDelegateRequest {
    id: string;
}
export interface QueryGetDelegateResponse {
}
export interface QueryNonceRequest {
    id: string;
}
export interface QueryNonceResponse {
}
export interface QueryGetAttributesResponse {
}
export interface QueryIdentifyOwnerResponse {
}
export interface QueryGetAttributesRequest {
    address: string;
}
export interface QueryIdentifyOwnerRequest {
    address: string;
}
export interface QueryOwnersResponse {
}
export interface QueryResourceRequest {
    cid: string;
    path: string;
}
export interface QueryResourceResponse {
    data: string;
}
export declare const QueryDidWebRequest: {
    encode(message: QueryDidWebRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDidWebRequest;
    fromJSON(object: any): QueryDidWebRequest;
    toJSON(message: QueryDidWebRequest): unknown;
    fromPartial(object: DeepPartial<QueryDidWebRequest>): QueryDidWebRequest;
};
export declare const QueryDidWebResponse: {
    encode(_: QueryDidWebResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDidWebResponse;
    fromJSON(_: any): QueryDidWebResponse;
    toJSON(_: QueryDidWebResponse): unknown;
    fromPartial(_: DeepPartial<QueryDidWebResponse>): QueryDidWebResponse;
};
export declare const QueryProofMetadataRequest: {
    encode(message: QueryProofMetadataRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryProofMetadataRequest;
    fromJSON(object: any): QueryProofMetadataRequest;
    toJSON(message: QueryProofMetadataRequest): unknown;
    fromPartial(object: DeepPartial<QueryProofMetadataRequest>): QueryProofMetadataRequest;
};
export declare const QueryProofResponse: {
    encode(message: QueryProofResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryProofResponse;
    fromJSON(object: any): QueryProofResponse;
    toJSON(message: QueryProofResponse): unknown;
    fromPartial(object: DeepPartial<QueryProofResponse>): QueryProofResponse;
};
export declare const QueryGetDidRequest: {
    encode(message: QueryGetDidRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDidRequest;
    fromJSON(object: any): QueryGetDidRequest;
    toJSON(message: QueryGetDidRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetDidRequest>): QueryGetDidRequest;
};
export declare const QueryGetDidResponse: {
    encode(_: QueryGetDidResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDidResponse;
    fromJSON(_: any): QueryGetDidResponse;
    toJSON(_: QueryGetDidResponse): unknown;
    fromPartial(_: DeepPartial<QueryGetDidResponse>): QueryGetDidResponse;
};
export declare const QueryReadDidKeyRequest: {
    encode(message: QueryReadDidKeyRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryReadDidKeyRequest;
    fromJSON(object: any): QueryReadDidKeyRequest;
    toJSON(message: QueryReadDidKeyRequest): unknown;
    fromPartial(object: DeepPartial<QueryReadDidKeyRequest>): QueryReadDidKeyRequest;
};
export declare const QueryReadDidKeyResponse: {
    encode(_: QueryReadDidKeyResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryReadDidKeyResponse;
    fromJSON(_: any): QueryReadDidKeyResponse;
    toJSON(_: QueryReadDidKeyResponse): unknown;
    fromPartial(_: DeepPartial<QueryReadDidKeyResponse>): QueryReadDidKeyResponse;
};
export declare const QueryReadRoyaltyInfo: {
    encode(message: QueryReadRoyaltyInfo, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryReadRoyaltyInfo;
    fromJSON(object: any): QueryReadRoyaltyInfo;
    toJSON(message: QueryReadRoyaltyInfo): unknown;
    fromPartial(object: DeepPartial<QueryReadRoyaltyInfo>): QueryReadRoyaltyInfo;
};
export declare const QueryReadRoyaltyInfoResponse: {
    encode(message: QueryReadRoyaltyInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryReadRoyaltyInfoResponse;
    fromJSON(object: any): QueryReadRoyaltyInfoResponse;
    toJSON(message: QueryReadRoyaltyInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryReadRoyaltyInfoResponse>): QueryReadRoyaltyInfoResponse;
};
export declare const QueryOwnerRequest: {
    encode(message: QueryOwnerRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnerRequest;
    fromJSON(object: any): QueryOwnerRequest;
    toJSON(message: QueryOwnerRequest): unknown;
    fromPartial(object: DeepPartial<QueryOwnerRequest>): QueryOwnerRequest;
};
export declare const QueryOwnerResponse: {
    encode(message: QueryOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnerResponse;
    fromJSON(object: any): QueryOwnerResponse;
    toJSON(message: QueryOwnerResponse): unknown;
    fromPartial(object: DeepPartial<QueryOwnerResponse>): QueryOwnerResponse;
};
export declare const QueryCollectionRequest: {
    encode(message: QueryCollectionRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCollectionRequest;
    fromJSON(object: any): QueryCollectionRequest;
    toJSON(message: QueryCollectionRequest): unknown;
    fromPartial(object: DeepPartial<QueryCollectionRequest>): QueryCollectionRequest;
};
export declare const QueryCollectionResponse: {
    encode(message: QueryCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCollectionResponse;
    fromJSON(object: any): QueryCollectionResponse;
    toJSON(message: QueryCollectionResponse): unknown;
    fromPartial(object: DeepPartial<QueryCollectionResponse>): QueryCollectionResponse;
};
export declare const QueryDenomRequest: {
    encode(message: QueryDenomRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomRequest;
    fromJSON(object: any): QueryDenomRequest;
    toJSON(message: QueryDenomRequest): unknown;
    fromPartial(object: DeepPartial<QueryDenomRequest>): QueryDenomRequest;
};
export declare const QueryDenomResponse: {
    encode(message: QueryDenomResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomResponse;
    fromJSON(object: any): QueryDenomResponse;
    toJSON(message: QueryDenomResponse): unknown;
    fromPartial(object: DeepPartial<QueryDenomResponse>): QueryDenomResponse;
};
export declare const QueryDenomsRequest: {
    encode(message: QueryDenomsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomsRequest;
    fromJSON(object: any): QueryDenomsRequest;
    toJSON(message: QueryDenomsRequest): unknown;
    fromPartial(object: DeepPartial<QueryDenomsRequest>): QueryDenomsRequest;
};
export declare const QueryDenomsResponse: {
    encode(message: QueryDenomsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomsResponse;
    fromJSON(object: any): QueryDenomsResponse;
    toJSON(message: QueryDenomsResponse): unknown;
    fromPartial(object: DeepPartial<QueryDenomsResponse>): QueryDenomsResponse;
};
export declare const QueryNFTRequest: {
    encode(message: QueryNFTRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNFTRequest;
    fromJSON(object: any): QueryNFTRequest;
    toJSON(message: QueryNFTRequest): unknown;
    fromPartial(object: DeepPartial<QueryNFTRequest>): QueryNFTRequest;
};
export declare const QueryNFTResponse: {
    encode(message: QueryNFTResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNFTResponse;
    fromJSON(object: any): QueryNFTResponse;
    toJSON(message: QueryNFTResponse): unknown;
    fromPartial(object: DeepPartial<QueryNFTResponse>): QueryNFTResponse;
};
export declare const QueryGetDelegateRequest: {
    encode(message: QueryGetDelegateRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDelegateRequest;
    fromJSON(object: any): QueryGetDelegateRequest;
    toJSON(message: QueryGetDelegateRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetDelegateRequest>): QueryGetDelegateRequest;
};
export declare const QueryGetDelegateResponse: {
    encode(_: QueryGetDelegateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDelegateResponse;
    fromJSON(_: any): QueryGetDelegateResponse;
    toJSON(_: QueryGetDelegateResponse): unknown;
    fromPartial(_: DeepPartial<QueryGetDelegateResponse>): QueryGetDelegateResponse;
};
export declare const QueryNonceRequest: {
    encode(message: QueryNonceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNonceRequest;
    fromJSON(object: any): QueryNonceRequest;
    toJSON(message: QueryNonceRequest): unknown;
    fromPartial(object: DeepPartial<QueryNonceRequest>): QueryNonceRequest;
};
export declare const QueryNonceResponse: {
    encode(_: QueryNonceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNonceResponse;
    fromJSON(_: any): QueryNonceResponse;
    toJSON(_: QueryNonceResponse): unknown;
    fromPartial(_: DeepPartial<QueryNonceResponse>): QueryNonceResponse;
};
export declare const QueryGetAttributesResponse: {
    encode(_: QueryGetAttributesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesResponse;
    fromJSON(_: any): QueryGetAttributesResponse;
    toJSON(_: QueryGetAttributesResponse): unknown;
    fromPartial(_: DeepPartial<QueryGetAttributesResponse>): QueryGetAttributesResponse;
};
export declare const QueryIdentifyOwnerResponse: {
    encode(_: QueryIdentifyOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryIdentifyOwnerResponse;
    fromJSON(_: any): QueryIdentifyOwnerResponse;
    toJSON(_: QueryIdentifyOwnerResponse): unknown;
    fromPartial(_: DeepPartial<QueryIdentifyOwnerResponse>): QueryIdentifyOwnerResponse;
};
export declare const QueryGetAttributesRequest: {
    encode(message: QueryGetAttributesRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesRequest;
    fromJSON(object: any): QueryGetAttributesRequest;
    toJSON(message: QueryGetAttributesRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetAttributesRequest>): QueryGetAttributesRequest;
};
export declare const QueryIdentifyOwnerRequest: {
    encode(message: QueryIdentifyOwnerRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryIdentifyOwnerRequest;
    fromJSON(object: any): QueryIdentifyOwnerRequest;
    toJSON(message: QueryIdentifyOwnerRequest): unknown;
    fromPartial(object: DeepPartial<QueryIdentifyOwnerRequest>): QueryIdentifyOwnerRequest;
};
export declare const QueryOwnersResponse: {
    encode(_: QueryOwnersResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnersResponse;
    fromJSON(_: any): QueryOwnersResponse;
    toJSON(_: QueryOwnersResponse): unknown;
    fromPartial(_: DeepPartial<QueryOwnersResponse>): QueryOwnersResponse;
};
export declare const QueryResourceRequest: {
    encode(message: QueryResourceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResourceRequest;
    fromJSON(object: any): QueryResourceRequest;
    toJSON(message: QueryResourceRequest): unknown;
    fromPartial(object: DeepPartial<QueryResourceRequest>): QueryResourceRequest;
};
export declare const QueryResourceResponse: {
    encode(message: QueryResourceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResourceResponse;
    fromJSON(object: any): QueryResourceResponse;
    toJSON(message: QueryResourceResponse): unknown;
    fromPartial(object: DeepPartial<QueryResourceResponse>): QueryResourceResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** ReadRoyaltyInfo */
    ReadRoyaltyInfo(request: QueryReadRoyaltyInfo): Promise<QueryReadRoyaltyInfoResponse>;
    /** Queries a list of resource items. */
    ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /** Reads metadata proofs */
    ReadMetadataProof(request: QueryProofMetadataRequest): Promise<QueryProofResponse>;
    /** Queries a list of owners items. */
    IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse>;
    /** Queries a list of Attributes items. */
    GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse>;
    /** Queries a list of resource items. */
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /** Queries a list of delegates items. */
    ReadDelegate(request: QueryGetDelegateRequest): Promise<QueryGetDelegateResponse>;
    /** Owner queries the NFTs of the specified owner */
    Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse>;
    /** Collection queries the NFTs of the specified denom */
    Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
    /** Denom queries the definition of a given denom */
    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
    /** Denoms queries all the denoms */
    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
    /** NFT queries the NFT for the given denom and token ID */
    GetNft(request: QueryNFTRequest): Promise<QueryNFTResponse>;
    ResolveDidWeb(request: QueryDidWebRequest): Promise<QueryDidWebResponse>;
    GetDidKey(request: QueryGetDidRequest): Promise<QueryGetDidResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    ReadRoyaltyInfo(request: QueryReadRoyaltyInfo): Promise<QueryReadRoyaltyInfoResponse>;
    ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    ReadMetadataProof(request: QueryProofMetadataRequest): Promise<QueryProofResponse>;
    IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse>;
    GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse>;
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    ReadDelegate(request: QueryGetDelegateRequest): Promise<QueryGetDelegateResponse>;
    Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse>;
    Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
    GetNft(request: QueryNFTRequest): Promise<QueryNFTResponse>;
    ResolveDidWeb(request: QueryDidWebRequest): Promise<QueryDidWebResponse>;
    GetDidKey(request: QueryGetDidRequest): Promise<QueryGetDidResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
