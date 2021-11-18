import { Reader, Writer } from 'protobufjs/minimal';
import { AguaclaraPacketData } from '../aguaclara/packet';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.aguaclara";
export interface MsgSendMetadataOwnership {
    creator: string;
    portId: string;
    channelId: string;
    data: AguaclaraPacketData | undefined;
}
export interface MsgSendMetadataOwnershipResponse {
    cid: string;
}
export declare const MsgSendMetadataOwnership: {
    encode(message: MsgSendMetadataOwnership, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSendMetadataOwnership;
    fromJSON(object: any): MsgSendMetadataOwnership;
    toJSON(message: MsgSendMetadataOwnership): unknown;
    fromPartial(object: DeepPartial<MsgSendMetadataOwnership>): MsgSendMetadataOwnership;
};
export declare const MsgSendMetadataOwnershipResponse: {
    encode(message: MsgSendMetadataOwnershipResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSendMetadataOwnershipResponse;
    fromJSON(object: any): MsgSendMetadataOwnershipResponse;
    toJSON(message: MsgSendMetadataOwnershipResponse): unknown;
    fromPartial(object: DeepPartial<MsgSendMetadataOwnershipResponse>): MsgSendMetadataOwnershipResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** Create ancon metadata */
    SendMetadataOwnership(request: MsgSendMetadataOwnership): Promise<MsgSendMetadataOwnershipResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    SendMetadataOwnership(request: MsgSendMetadataOwnership): Promise<MsgSendMetadataOwnershipResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
