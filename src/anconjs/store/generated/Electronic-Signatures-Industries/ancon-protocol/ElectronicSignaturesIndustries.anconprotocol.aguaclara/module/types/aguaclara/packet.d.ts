import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.aguaclara";
export interface AguaclaraPacketData {
    creator: string;
    tokenAddress: string;
    tokenId: string;
    didRecipient: string;
    toMetadata: string;
    hash: string;
    currentChainId: string;
    recipientChainId: string;
}
export interface NoData {
}
export declare const AguaclaraPacketData: {
    encode(message: AguaclaraPacketData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): AguaclaraPacketData;
    fromJSON(object: any): AguaclaraPacketData;
    toJSON(message: AguaclaraPacketData): unknown;
    fromPartial(object: DeepPartial<AguaclaraPacketData>): AguaclaraPacketData;
};
export declare const NoData: {
    encode(_: NoData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): NoData;
    fromJSON(_: any): NoData;
    toJSON(_: NoData): unknown;
    fromPartial(_: DeepPartial<NoData>): NoData;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
