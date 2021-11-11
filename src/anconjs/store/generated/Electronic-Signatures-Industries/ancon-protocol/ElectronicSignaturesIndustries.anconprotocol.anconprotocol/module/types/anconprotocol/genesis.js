/* eslint-disable */
import { Collection } from '../anconprotocol/nft';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseGenesisState = {};
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        for (const v of message.collections) {
            Collection.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.collections = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collections.push(Collection.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.collections = [];
        if (object.collections !== undefined && object.collections !== null) {
            for (const e of object.collections) {
                message.collections.push(Collection.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.collections) {
            obj.collections = message.collections.map((e) => (e ? Collection.toJSON(e) : undefined));
        }
        else {
            obj.collections = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.collections = [];
        if (object.collections !== undefined && object.collections !== null) {
            for (const e of object.collections) {
                message.collections.push(Collection.fromPartial(e));
            }
        }
        return message;
    }
};
