/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseRoyaltyInfo = { updateCount: 0, receiver: '', royaltyFeePercentage: 0, metadataUri: '', denomId: '' };
export const RoyaltyInfo = {
    encode(message, writer = Writer.create()) {
        if (message.updateCount !== 0) {
            writer.uint32(8).uint64(message.updateCount);
        }
        if (message.receiver !== '') {
            writer.uint32(18).string(message.receiver);
        }
        if (message.royaltyFeePercentage !== 0) {
            writer.uint32(24).uint64(message.royaltyFeePercentage);
        }
        if (message.metadataUri !== '') {
            writer.uint32(34).string(message.metadataUri);
        }
        if (message.denomId !== '') {
            writer.uint32(42).string(message.denomId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseRoyaltyInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updateCount = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.receiver = reader.string();
                    break;
                case 3:
                    message.royaltyFeePercentage = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.metadataUri = reader.string();
                    break;
                case 5:
                    message.denomId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseRoyaltyInfo };
        if (object.updateCount !== undefined && object.updateCount !== null) {
            message.updateCount = Number(object.updateCount);
        }
        else {
            message.updateCount = 0;
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = String(object.receiver);
        }
        else {
            message.receiver = '';
        }
        if (object.royaltyFeePercentage !== undefined && object.royaltyFeePercentage !== null) {
            message.royaltyFeePercentage = Number(object.royaltyFeePercentage);
        }
        else {
            message.royaltyFeePercentage = 0;
        }
        if (object.metadataUri !== undefined && object.metadataUri !== null) {
            message.metadataUri = String(object.metadataUri);
        }
        else {
            message.metadataUri = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.updateCount !== undefined && (obj.updateCount = message.updateCount);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.royaltyFeePercentage !== undefined && (obj.royaltyFeePercentage = message.royaltyFeePercentage);
        message.metadataUri !== undefined && (obj.metadataUri = message.metadataUri);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseRoyaltyInfo };
        if (object.updateCount !== undefined && object.updateCount !== null) {
            message.updateCount = object.updateCount;
        }
        else {
            message.updateCount = 0;
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = object.receiver;
        }
        else {
            message.receiver = '';
        }
        if (object.royaltyFeePercentage !== undefined && object.royaltyFeePercentage !== null) {
            message.royaltyFeePercentage = object.royaltyFeePercentage;
        }
        else {
            message.royaltyFeePercentage = 0;
        }
        if (object.metadataUri !== undefined && object.metadataUri !== null) {
            message.metadataUri = object.metadataUri;
        }
        else {
            message.metadataUri = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        return message;
    }
};
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
