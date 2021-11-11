import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
/** BaseNFT defines a non-fungible token */
export interface BaseNFT {
    id: string;
    name: string;
    uri: string;
    data: string;
    owner: string;
    didOwner: string;
    price: number;
}
/** Denom defines a type of NFT */
export interface Denom {
    id: string;
    name: string;
    schema: string;
    creator: string;
    symbol: string;
    mintRestricted: boolean;
    updateRestricted: boolean;
}
/** IDCollection defines a type of collection with specified ID */
export interface IDCollection {
    denomId: string;
    tokenIds: string[];
}
/** Owner defines a type of owner */
export interface Owner {
    address: string;
    idCollections: IDCollection[];
}
/** Collection defines a type of collection */
export interface Collection {
    denom: Denom | undefined;
    nfts: BaseNFT[];
}
export declare const BaseNFT: {
    encode(message: BaseNFT, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): BaseNFT;
    fromJSON(object: any): BaseNFT;
    toJSON(message: BaseNFT): unknown;
    fromPartial(object: DeepPartial<BaseNFT>): BaseNFT;
};
export declare const Denom: {
    encode(message: Denom, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Denom;
    fromJSON(object: any): Denom;
    toJSON(message: Denom): unknown;
    fromPartial(object: DeepPartial<Denom>): Denom;
};
export declare const IDCollection: {
    encode(message: IDCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): IDCollection;
    fromJSON(object: any): IDCollection;
    toJSON(message: IDCollection): unknown;
    fromPartial(object: DeepPartial<IDCollection>): IDCollection;
};
export declare const Owner: {
    encode(message: Owner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Owner;
    fromJSON(object: any): Owner;
    toJSON(message: Owner): unknown;
    fromPartial(object: DeepPartial<Owner>): Owner;
};
export declare const Collection: {
    encode(message: Collection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Collection;
    fromJSON(object: any): Collection;
    toJSON(message: Collection): unknown;
    fromPartial(object: DeepPartial<Collection>): Collection;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
