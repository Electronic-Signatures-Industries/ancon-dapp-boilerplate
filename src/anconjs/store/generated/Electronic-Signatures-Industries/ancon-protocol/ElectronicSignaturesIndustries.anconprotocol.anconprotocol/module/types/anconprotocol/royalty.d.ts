import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface RoyaltyInfo {
    updateCount: number;
    receiver: string;
    royaltyFeePercentage: number;
    metadataUri: string;
    denomId: string;
}
export declare const RoyaltyInfo: {
    encode(message: RoyaltyInfo, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RoyaltyInfo;
    fromJSON(object: any): RoyaltyInfo;
    toJSON(message: RoyaltyInfo): unknown;
    fromPartial(object: DeepPartial<RoyaltyInfo>): RoyaltyInfo;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
