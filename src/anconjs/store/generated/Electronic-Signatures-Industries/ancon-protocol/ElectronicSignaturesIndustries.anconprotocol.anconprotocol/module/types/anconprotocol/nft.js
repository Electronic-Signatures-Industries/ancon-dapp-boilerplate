/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseBaseNFT = { id: '', name: '', uri: '', data: '', owner: '', didOwner: '', price: 0 };
export const BaseNFT = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.name !== '') {
            writer.uint32(18).string(message.name);
        }
        if (message.uri !== '') {
            writer.uint32(26).string(message.uri);
        }
        if (message.data !== '') {
            writer.uint32(34).string(message.data);
        }
        if (message.owner !== '') {
            writer.uint32(42).string(message.owner);
        }
        if (message.didOwner !== '') {
            writer.uint32(50).string(message.didOwner);
        }
        if (message.price !== 0) {
            writer.uint32(56).uint64(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseBaseNFT };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.uri = reader.string();
                    break;
                case 4:
                    message.data = reader.string();
                    break;
                case 5:
                    message.owner = reader.string();
                    break;
                case 6:
                    message.didOwner = reader.string();
                    break;
                case 7:
                    message.price = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseBaseNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.uri !== undefined && object.uri !== null) {
            message.uri = String(object.uri);
        }
        else {
            message.uri = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = String(object.data);
        }
        else {
            message.data = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = String(object.didOwner);
        }
        else {
            message.didOwner = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.data !== undefined && (obj.data = message.data);
        message.owner !== undefined && (obj.owner = message.owner);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.price !== undefined && (obj.price = message.price);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseBaseNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.uri !== undefined && object.uri !== null) {
            message.uri = object.uri;
        }
        else {
            message.uri = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = object.didOwner;
        }
        else {
            message.didOwner = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        return message;
    }
};
const baseDenom = { id: '', name: '', schema: '', creator: '', symbol: '', mintRestricted: false, updateRestricted: false };
export const Denom = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.name !== '') {
            writer.uint32(18).string(message.name);
        }
        if (message.schema !== '') {
            writer.uint32(26).string(message.schema);
        }
        if (message.creator !== '') {
            writer.uint32(34).string(message.creator);
        }
        if (message.symbol !== '') {
            writer.uint32(42).string(message.symbol);
        }
        if (message.mintRestricted === true) {
            writer.uint32(48).bool(message.mintRestricted);
        }
        if (message.updateRestricted === true) {
            writer.uint32(56).bool(message.updateRestricted);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDenom };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.schema = reader.string();
                    break;
                case 4:
                    message.creator = reader.string();
                    break;
                case 5:
                    message.symbol = reader.string();
                    break;
                case 6:
                    message.mintRestricted = reader.bool();
                    break;
                case 7:
                    message.updateRestricted = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDenom };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.schema !== undefined && object.schema !== null) {
            message.schema = String(object.schema);
        }
        else {
            message.schema = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.symbol !== undefined && object.symbol !== null) {
            message.symbol = String(object.symbol);
        }
        else {
            message.symbol = '';
        }
        if (object.mintRestricted !== undefined && object.mintRestricted !== null) {
            message.mintRestricted = Boolean(object.mintRestricted);
        }
        else {
            message.mintRestricted = false;
        }
        if (object.updateRestricted !== undefined && object.updateRestricted !== null) {
            message.updateRestricted = Boolean(object.updateRestricted);
        }
        else {
            message.updateRestricted = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.schema !== undefined && (obj.schema = message.schema);
        message.creator !== undefined && (obj.creator = message.creator);
        message.symbol !== undefined && (obj.symbol = message.symbol);
        message.mintRestricted !== undefined && (obj.mintRestricted = message.mintRestricted);
        message.updateRestricted !== undefined && (obj.updateRestricted = message.updateRestricted);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDenom };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.schema !== undefined && object.schema !== null) {
            message.schema = object.schema;
        }
        else {
            message.schema = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.symbol !== undefined && object.symbol !== null) {
            message.symbol = object.symbol;
        }
        else {
            message.symbol = '';
        }
        if (object.mintRestricted !== undefined && object.mintRestricted !== null) {
            message.mintRestricted = object.mintRestricted;
        }
        else {
            message.mintRestricted = false;
        }
        if (object.updateRestricted !== undefined && object.updateRestricted !== null) {
            message.updateRestricted = object.updateRestricted;
        }
        else {
            message.updateRestricted = false;
        }
        return message;
    }
};
const baseIDCollection = { denomId: '', tokenIds: '' };
export const IDCollection = {
    encode(message, writer = Writer.create()) {
        if (message.denomId !== '') {
            writer.uint32(10).string(message.denomId);
        }
        for (const v of message.tokenIds) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIDCollection };
        message.tokenIds = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denomId = reader.string();
                    break;
                case 2:
                    message.tokenIds.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseIDCollection };
        message.tokenIds = [];
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        if (object.tokenIds !== undefined && object.tokenIds !== null) {
            for (const e of object.tokenIds) {
                message.tokenIds.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.denomId !== undefined && (obj.denomId = message.denomId);
        if (message.tokenIds) {
            obj.tokenIds = message.tokenIds.map((e) => e);
        }
        else {
            obj.tokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIDCollection };
        message.tokenIds = [];
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        if (object.tokenIds !== undefined && object.tokenIds !== null) {
            for (const e of object.tokenIds) {
                message.tokenIds.push(e);
            }
        }
        return message;
    }
};
const baseOwner = { address: '' };
export const Owner = {
    encode(message, writer = Writer.create()) {
        if (message.address !== '') {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.idCollections) {
            IDCollection.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseOwner };
        message.idCollections = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.idCollections.push(IDCollection.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseOwner };
        message.idCollections = [];
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = '';
        }
        if (object.idCollections !== undefined && object.idCollections !== null) {
            for (const e of object.idCollections) {
                message.idCollections.push(IDCollection.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        if (message.idCollections) {
            obj.idCollections = message.idCollections.map((e) => (e ? IDCollection.toJSON(e) : undefined));
        }
        else {
            obj.idCollections = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseOwner };
        message.idCollections = [];
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = '';
        }
        if (object.idCollections !== undefined && object.idCollections !== null) {
            for (const e of object.idCollections) {
                message.idCollections.push(IDCollection.fromPartial(e));
            }
        }
        return message;
    }
};
const baseCollection = {};
export const Collection = {
    encode(message, writer = Writer.create()) {
        if (message.denom !== undefined) {
            Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.nfts) {
            BaseNFT.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCollection };
        message.nfts = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = Denom.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nfts.push(BaseNFT.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCollection };
        message.nfts = [];
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = Denom.fromJSON(object.denom);
        }
        else {
            message.denom = undefined;
        }
        if (object.nfts !== undefined && object.nfts !== null) {
            for (const e of object.nfts) {
                message.nfts.push(BaseNFT.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
        if (message.nfts) {
            obj.nfts = message.nfts.map((e) => (e ? BaseNFT.toJSON(e) : undefined));
        }
        else {
            obj.nfts = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCollection };
        message.nfts = [];
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = Denom.fromPartial(object.denom);
        }
        else {
            message.denom = undefined;
        }
        if (object.nfts !== undefined && object.nfts !== null) {
            for (const e of object.nfts) {
                message.nfts.push(BaseNFT.fromPartial(e));
            }
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
