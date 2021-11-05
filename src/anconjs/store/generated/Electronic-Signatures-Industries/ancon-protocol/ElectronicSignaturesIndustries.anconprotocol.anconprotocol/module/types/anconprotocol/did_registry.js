/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseDIDOwner = { identity: '', owner: '', cid: '', didWebDeactivated: false, vanityName: '' };
export const DIDOwner = {
    encode(message, writer = Writer.create()) {
        if (message.identity !== '') {
            writer.uint32(10).string(message.identity);
        }
        if (message.owner !== '') {
            writer.uint32(18).string(message.owner);
        }
        if (message.cid !== '') {
            writer.uint32(26).string(message.cid);
        }
        if (message.didWebDeactivated === true) {
            writer.uint32(32).bool(message.didWebDeactivated);
        }
        if (message.vanityName !== '') {
            writer.uint32(42).string(message.vanityName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDIDOwner };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identity = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.cid = reader.string();
                    break;
                case 4:
                    message.didWebDeactivated = reader.bool();
                    break;
                case 5:
                    message.vanityName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDIDOwner };
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = String(object.identity);
        }
        else {
            message.identity = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        if (object.didWebDeactivated !== undefined && object.didWebDeactivated !== null) {
            message.didWebDeactivated = Boolean(object.didWebDeactivated);
        }
        else {
            message.didWebDeactivated = false;
        }
        if (object.vanityName !== undefined && object.vanityName !== null) {
            message.vanityName = String(object.vanityName);
        }
        else {
            message.vanityName = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.identity !== undefined && (obj.identity = message.identity);
        message.owner !== undefined && (obj.owner = message.owner);
        message.cid !== undefined && (obj.cid = message.cid);
        message.didWebDeactivated !== undefined && (obj.didWebDeactivated = message.didWebDeactivated);
        message.vanityName !== undefined && (obj.vanityName = message.vanityName);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDIDOwner };
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = object.identity;
        }
        else {
            message.identity = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        if (object.didWebDeactivated !== undefined && object.didWebDeactivated !== null) {
            message.didWebDeactivated = object.didWebDeactivated;
        }
        else {
            message.didWebDeactivated = false;
        }
        if (object.vanityName !== undefined && object.vanityName !== null) {
            message.vanityName = object.vanityName;
        }
        else {
            message.vanityName = '';
        }
        return message;
    }
};
const baseDIDWebRoute = { name: '', route: '', cid: '' };
export const DIDWebRoute = {
    encode(message, writer = Writer.create()) {
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.route !== '') {
            writer.uint32(18).string(message.route);
        }
        if (message.cid !== '') {
            writer.uint32(26).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDIDWebRoute };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.route = reader.string();
                    break;
                case 3:
                    message.cid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDIDWebRoute };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.route !== undefined && object.route !== null) {
            message.route = String(object.route);
        }
        else {
            message.route = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.route !== undefined && (obj.route = message.route);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDIDWebRoute };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.route !== undefined && object.route !== null) {
            message.route = object.route;
        }
        else {
            message.route = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        return message;
    }
};
const baseDelegate = { delegate: '', delegateType: '', validity: 0, creator: '', identity: '' };
export const Delegate = {
    encode(message, writer = Writer.create()) {
        if (message.delegate !== '') {
            writer.uint32(10).string(message.delegate);
        }
        if (message.delegateType !== '') {
            writer.uint32(18).string(message.delegateType);
        }
        if (message.validity !== 0) {
            writer.uint32(24).uint64(message.validity);
        }
        if (message.creator !== '') {
            writer.uint32(34).string(message.creator);
        }
        if (message.identity !== '') {
            writer.uint32(42).string(message.identity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDelegate };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegate = reader.string();
                    break;
                case 2:
                    message.delegateType = reader.string();
                    break;
                case 3:
                    message.validity = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.creator = reader.string();
                    break;
                case 5:
                    message.identity = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDelegate };
        if (object.delegate !== undefined && object.delegate !== null) {
            message.delegate = String(object.delegate);
        }
        else {
            message.delegate = '';
        }
        if (object.delegateType !== undefined && object.delegateType !== null) {
            message.delegateType = String(object.delegateType);
        }
        else {
            message.delegateType = '';
        }
        if (object.validity !== undefined && object.validity !== null) {
            message.validity = Number(object.validity);
        }
        else {
            message.validity = 0;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = String(object.identity);
        }
        else {
            message.identity = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegate !== undefined && (obj.delegate = message.delegate);
        message.delegateType !== undefined && (obj.delegateType = message.delegateType);
        message.validity !== undefined && (obj.validity = message.validity);
        message.creator !== undefined && (obj.creator = message.creator);
        message.identity !== undefined && (obj.identity = message.identity);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDelegate };
        if (object.delegate !== undefined && object.delegate !== null) {
            message.delegate = object.delegate;
        }
        else {
            message.delegate = '';
        }
        if (object.delegateType !== undefined && object.delegateType !== null) {
            message.delegateType = object.delegateType;
        }
        else {
            message.delegateType = '';
        }
        if (object.validity !== undefined && object.validity !== null) {
            message.validity = object.validity;
        }
        else {
            message.validity = 0;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = object.identity;
        }
        else {
            message.identity = '';
        }
        return message;
    }
};
const baseChange = { identity: '', owner: '', previousChange: 0 };
export const Change = {
    encode(message, writer = Writer.create()) {
        if (message.identity !== '') {
            writer.uint32(10).string(message.identity);
        }
        if (message.owner !== '') {
            writer.uint32(18).string(message.owner);
        }
        if (message.previousChange !== 0) {
            writer.uint32(24).uint64(message.previousChange);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseChange };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identity = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.previousChange = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseChange };
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = String(object.identity);
        }
        else {
            message.identity = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = '';
        }
        if (object.previousChange !== undefined && object.previousChange !== null) {
            message.previousChange = Number(object.previousChange);
        }
        else {
            message.previousChange = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.identity !== undefined && (obj.identity = message.identity);
        message.owner !== undefined && (obj.owner = message.owner);
        message.previousChange !== undefined && (obj.previousChange = message.previousChange);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseChange };
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = object.identity;
        }
        else {
            message.identity = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = '';
        }
        if (object.previousChange !== undefined && object.previousChange !== null) {
            message.previousChange = object.previousChange;
        }
        else {
            message.previousChange = 0;
        }
        return message;
    }
};
const baseAttribute = { identity: '' };
export const Attribute = {
    encode(message, writer = Writer.create()) {
        if (message.identity !== '') {
            writer.uint32(10).string(message.identity);
        }
        if (message.name.length !== 0) {
            writer.uint32(18).bytes(message.name);
        }
        if (message.value.length !== 0) {
            writer.uint32(26).bytes(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAttribute };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identity = reader.string();
                    break;
                case 2:
                    message.name = reader.bytes();
                    break;
                case 3:
                    message.value = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseAttribute };
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = String(object.identity);
        }
        else {
            message.identity = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = bytesFromBase64(object.name);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.identity !== undefined && (obj.identity = message.identity);
        message.name !== undefined && (obj.name = base64FromBytes(message.name !== undefined ? message.name : new Uint8Array()));
        message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseAttribute };
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = object.identity;
        }
        else {
            message.identity = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = new Uint8Array();
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = new Uint8Array();
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
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(''));
}
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
