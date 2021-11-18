import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
/** Data Source is a container of links which contains the data source to be offer */
export interface DataSource {
    parentCid: string;
    didIdentityOwner: string;
    anchors: string[];
    name: string;
    description: string;
    creator: string;
}
/**
 * Data Union represents a data provider.
 * It offers data sources with linkable dags to be available for
 * users of Ancon Data Union Marketplace
 */
export interface DataUnion {
    /** name */
    name: string;
    /** did identity */
    didIdentity: string;
    /** is active */
    active: boolean;
    creator: string;
}
/** Anchor connects a CID to an onchain record, in this a data source */
export interface Anchor {
    didIdentityOwner: string;
    link: string;
    parentCid: string;
    creator: string;
}
/** Pricing contains prices for fixed prices data sources */
export interface Pricing {
    didIdentityOwner: string;
    price: number;
    dataSourceRef: number;
    creator: string;
}
export interface MsgAddDataSource {
    dataSource: DataSource | undefined;
    creator: string;
}
export interface MsgAddDataSourceResponse {
    ok: boolean;
    cid: string;
}
export interface MsgRemoveDataSource {
    creator: string;
    cid: string;
}
export interface MsgRemoveDataSourceResponse {
    ok: boolean;
}
export interface MsgUpdateDataSource {
    creator: string;
    cid: string;
    name: string;
    description: string;
    anchors: number[];
}
export interface MsgUpdateDataSourceResponse {
    ok: boolean;
    cid: string;
}
export interface MsgAddDataUnion {
    dataUnion: DataUnion | undefined;
    creator: string;
}
export interface MsgAddDataUnionResponse {
}
export interface MsgRemoveDataUnion {
    creator: string;
    cid: string;
}
export interface MsgRemoveDataUnionResponse {
}
export interface MsgUpdateDataUnion {
    creator: string;
    cid: string;
    name: string;
}
export interface MsgUpdateDataUnionResponse {
}
export declare const DataSource: {
    encode(message: DataSource, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DataSource;
    fromJSON(object: any): DataSource;
    toJSON(message: DataSource): unknown;
    fromPartial(object: DeepPartial<DataSource>): DataSource;
};
export declare const DataUnion: {
    encode(message: DataUnion, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DataUnion;
    fromJSON(object: any): DataUnion;
    toJSON(message: DataUnion): unknown;
    fromPartial(object: DeepPartial<DataUnion>): DataUnion;
};
export declare const Anchor: {
    encode(message: Anchor, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Anchor;
    fromJSON(object: any): Anchor;
    toJSON(message: Anchor): unknown;
    fromPartial(object: DeepPartial<Anchor>): Anchor;
};
export declare const Pricing: {
    encode(message: Pricing, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Pricing;
    fromJSON(object: any): Pricing;
    toJSON(message: Pricing): unknown;
    fromPartial(object: DeepPartial<Pricing>): Pricing;
};
export declare const MsgAddDataSource: {
    encode(message: MsgAddDataSource, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddDataSource;
    fromJSON(object: any): MsgAddDataSource;
    toJSON(message: MsgAddDataSource): unknown;
    fromPartial(object: DeepPartial<MsgAddDataSource>): MsgAddDataSource;
};
export declare const MsgAddDataSourceResponse: {
    encode(message: MsgAddDataSourceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddDataSourceResponse;
    fromJSON(object: any): MsgAddDataSourceResponse;
    toJSON(message: MsgAddDataSourceResponse): unknown;
    fromPartial(object: DeepPartial<MsgAddDataSourceResponse>): MsgAddDataSourceResponse;
};
export declare const MsgRemoveDataSource: {
    encode(message: MsgRemoveDataSource, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataSource;
    fromJSON(object: any): MsgRemoveDataSource;
    toJSON(message: MsgRemoveDataSource): unknown;
    fromPartial(object: DeepPartial<MsgRemoveDataSource>): MsgRemoveDataSource;
};
export declare const MsgRemoveDataSourceResponse: {
    encode(message: MsgRemoveDataSourceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataSourceResponse;
    fromJSON(object: any): MsgRemoveDataSourceResponse;
    toJSON(message: MsgRemoveDataSourceResponse): unknown;
    fromPartial(object: DeepPartial<MsgRemoveDataSourceResponse>): MsgRemoveDataSourceResponse;
};
export declare const MsgUpdateDataSource: {
    encode(message: MsgUpdateDataSource, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataSource;
    fromJSON(object: any): MsgUpdateDataSource;
    toJSON(message: MsgUpdateDataSource): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDataSource>): MsgUpdateDataSource;
};
export declare const MsgUpdateDataSourceResponse: {
    encode(message: MsgUpdateDataSourceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataSourceResponse;
    fromJSON(object: any): MsgUpdateDataSourceResponse;
    toJSON(message: MsgUpdateDataSourceResponse): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDataSourceResponse>): MsgUpdateDataSourceResponse;
};
export declare const MsgAddDataUnion: {
    encode(message: MsgAddDataUnion, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddDataUnion;
    fromJSON(object: any): MsgAddDataUnion;
    toJSON(message: MsgAddDataUnion): unknown;
    fromPartial(object: DeepPartial<MsgAddDataUnion>): MsgAddDataUnion;
};
export declare const MsgAddDataUnionResponse: {
    encode(_: MsgAddDataUnionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddDataUnionResponse;
    fromJSON(_: any): MsgAddDataUnionResponse;
    toJSON(_: MsgAddDataUnionResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddDataUnionResponse>): MsgAddDataUnionResponse;
};
export declare const MsgRemoveDataUnion: {
    encode(message: MsgRemoveDataUnion, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataUnion;
    fromJSON(object: any): MsgRemoveDataUnion;
    toJSON(message: MsgRemoveDataUnion): unknown;
    fromPartial(object: DeepPartial<MsgRemoveDataUnion>): MsgRemoveDataUnion;
};
export declare const MsgRemoveDataUnionResponse: {
    encode(_: MsgRemoveDataUnionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataUnionResponse;
    fromJSON(_: any): MsgRemoveDataUnionResponse;
    toJSON(_: MsgRemoveDataUnionResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveDataUnionResponse>): MsgRemoveDataUnionResponse;
};
export declare const MsgUpdateDataUnion: {
    encode(message: MsgUpdateDataUnion, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataUnion;
    fromJSON(object: any): MsgUpdateDataUnion;
    toJSON(message: MsgUpdateDataUnion): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDataUnion>): MsgUpdateDataUnion;
};
export declare const MsgUpdateDataUnionResponse: {
    encode(_: MsgUpdateDataUnionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataUnionResponse;
    fromJSON(_: any): MsgUpdateDataUnionResponse;
    toJSON(_: MsgUpdateDataUnionResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateDataUnionResponse>): MsgUpdateDataUnionResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
