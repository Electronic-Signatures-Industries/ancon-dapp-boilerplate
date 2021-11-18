import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface DIDOwner {
    didIdentity: string;
    owner: string;
    cid: string;
    vanityName: string;
}
export interface DIDWebRoute {
    name: string;
    route: string;
    cid: string;
    didWebDeactivated: boolean;
    didIdentity: string;
}
export interface DIDDelegate {
    delegate: string;
    delegateType: string;
    validity: number;
    creator: string;
    didIdentity: string;
}
export interface DIDAttribute {
    didIdentity: string;
    name: string[];
    value: string[];
}
export declare const DIDOwner: {
    encode(message: DIDOwner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DIDOwner;
    fromJSON(object: any): DIDOwner;
    toJSON(message: DIDOwner): unknown;
    fromPartial(object: DeepPartial<DIDOwner>): DIDOwner;
};
export declare const DIDWebRoute: {
    encode(message: DIDWebRoute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DIDWebRoute;
    fromJSON(object: any): DIDWebRoute;
    toJSON(message: DIDWebRoute): unknown;
    fromPartial(object: DeepPartial<DIDWebRoute>): DIDWebRoute;
};
export declare const DIDDelegate: {
    encode(message: DIDDelegate, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DIDDelegate;
    fromJSON(object: any): DIDDelegate;
    toJSON(message: DIDDelegate): unknown;
    fromPartial(object: DeepPartial<DIDDelegate>): DIDDelegate;
};
export declare const DIDAttribute: {
    encode(message: DIDAttribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DIDAttribute;
    fromJSON(object: any): DIDAttribute;
    toJSON(message: DIDAttribute): unknown;
    fromPartial(object: DeepPartial<DIDAttribute>): DIDAttribute;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
