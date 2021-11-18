/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseDataSource = { parentCid: '', didIdentityOwner: '', anchors: '', name: '', description: '', creator: '' };
export const DataSource = {
    encode(message, writer = Writer.create()) {
        if (message.parentCid !== '') {
            writer.uint32(10).string(message.parentCid);
        }
        if (message.didIdentityOwner !== '') {
            writer.uint32(18).string(message.didIdentityOwner);
        }
        for (const v of message.anchors) {
            writer.uint32(26).string(v);
        }
        if (message.name !== '') {
            writer.uint32(34).string(message.name);
        }
        if (message.description !== '') {
            writer.uint32(42).string(message.description);
        }
        if (message.creator !== '') {
            writer.uint32(50).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDataSource };
        message.anchors = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.parentCid = reader.string();
                    break;
                case 2:
                    message.didIdentityOwner = reader.string();
                    break;
                case 3:
                    message.anchors.push(reader.string());
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.description = reader.string();
                    break;
                case 6:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDataSource };
        message.anchors = [];
        if (object.parentCid !== undefined && object.parentCid !== null) {
            message.parentCid = String(object.parentCid);
        }
        else {
            message.parentCid = '';
        }
        if (object.didIdentityOwner !== undefined && object.didIdentityOwner !== null) {
            message.didIdentityOwner = String(object.didIdentityOwner);
        }
        else {
            message.didIdentityOwner = '';
        }
        if (object.anchors !== undefined && object.anchors !== null) {
            for (const e of object.anchors) {
                message.anchors.push(String(e));
            }
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.parentCid !== undefined && (obj.parentCid = message.parentCid);
        message.didIdentityOwner !== undefined && (obj.didIdentityOwner = message.didIdentityOwner);
        if (message.anchors) {
            obj.anchors = message.anchors.map((e) => e);
        }
        else {
            obj.anchors = [];
        }
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDataSource };
        message.anchors = [];
        if (object.parentCid !== undefined && object.parentCid !== null) {
            message.parentCid = object.parentCid;
        }
        else {
            message.parentCid = '';
        }
        if (object.didIdentityOwner !== undefined && object.didIdentityOwner !== null) {
            message.didIdentityOwner = object.didIdentityOwner;
        }
        else {
            message.didIdentityOwner = '';
        }
        if (object.anchors !== undefined && object.anchors !== null) {
            for (const e of object.anchors) {
                message.anchors.push(e);
            }
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseDataUnion = { name: '', didIdentity: '', active: false, creator: '' };
export const DataUnion = {
    encode(message, writer = Writer.create()) {
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.didIdentity !== '') {
            writer.uint32(18).string(message.didIdentity);
        }
        if (message.active === true) {
            writer.uint32(24).bool(message.active);
        }
        if (message.creator !== '') {
            writer.uint32(34).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDataUnion };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.didIdentity = reader.string();
                    break;
                case 3:
                    message.active = reader.bool();
                    break;
                case 4:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDataUnion };
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = String(object.didIdentity);
        }
        else {
            message.didIdentity = '';
        }
        if (object.active !== undefined && object.active !== null) {
            message.active = Boolean(object.active);
        }
        else {
            message.active = false;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity);
        message.active !== undefined && (obj.active = message.active);
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDataUnion };
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = object.didIdentity;
        }
        else {
            message.didIdentity = '';
        }
        if (object.active !== undefined && object.active !== null) {
            message.active = object.active;
        }
        else {
            message.active = false;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseAnchor = { didIdentityOwner: '', link: '', parentCid: '', creator: '' };
export const Anchor = {
    encode(message, writer = Writer.create()) {
        if (message.didIdentityOwner !== '') {
            writer.uint32(10).string(message.didIdentityOwner);
        }
        if (message.link !== '') {
            writer.uint32(18).string(message.link);
        }
        if (message.parentCid !== '') {
            writer.uint32(26).string(message.parentCid);
        }
        if (message.creator !== '') {
            writer.uint32(34).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAnchor };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.didIdentityOwner = reader.string();
                    break;
                case 2:
                    message.link = reader.string();
                    break;
                case 3:
                    message.parentCid = reader.string();
                    break;
                case 4:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseAnchor };
        if (object.didIdentityOwner !== undefined && object.didIdentityOwner !== null) {
            message.didIdentityOwner = String(object.didIdentityOwner);
        }
        else {
            message.didIdentityOwner = '';
        }
        if (object.link !== undefined && object.link !== null) {
            message.link = String(object.link);
        }
        else {
            message.link = '';
        }
        if (object.parentCid !== undefined && object.parentCid !== null) {
            message.parentCid = String(object.parentCid);
        }
        else {
            message.parentCid = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.didIdentityOwner !== undefined && (obj.didIdentityOwner = message.didIdentityOwner);
        message.link !== undefined && (obj.link = message.link);
        message.parentCid !== undefined && (obj.parentCid = message.parentCid);
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseAnchor };
        if (object.didIdentityOwner !== undefined && object.didIdentityOwner !== null) {
            message.didIdentityOwner = object.didIdentityOwner;
        }
        else {
            message.didIdentityOwner = '';
        }
        if (object.link !== undefined && object.link !== null) {
            message.link = object.link;
        }
        else {
            message.link = '';
        }
        if (object.parentCid !== undefined && object.parentCid !== null) {
            message.parentCid = object.parentCid;
        }
        else {
            message.parentCid = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const basePricing = { didIdentityOwner: '', price: 0, dataSourceRef: 0, creator: '' };
export const Pricing = {
    encode(message, writer = Writer.create()) {
        if (message.didIdentityOwner !== '') {
            writer.uint32(10).string(message.didIdentityOwner);
        }
        if (message.price !== 0) {
            writer.uint32(16).uint64(message.price);
        }
        if (message.dataSourceRef !== 0) {
            writer.uint32(24).uint64(message.dataSourceRef);
        }
        if (message.creator !== '') {
            writer.uint32(34).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePricing };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.didIdentityOwner = reader.string();
                    break;
                case 2:
                    message.price = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.dataSourceRef = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePricing };
        if (object.didIdentityOwner !== undefined && object.didIdentityOwner !== null) {
            message.didIdentityOwner = String(object.didIdentityOwner);
        }
        else {
            message.didIdentityOwner = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        if (object.dataSourceRef !== undefined && object.dataSourceRef !== null) {
            message.dataSourceRef = Number(object.dataSourceRef);
        }
        else {
            message.dataSourceRef = 0;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.didIdentityOwner !== undefined && (obj.didIdentityOwner = message.didIdentityOwner);
        message.price !== undefined && (obj.price = message.price);
        message.dataSourceRef !== undefined && (obj.dataSourceRef = message.dataSourceRef);
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePricing };
        if (object.didIdentityOwner !== undefined && object.didIdentityOwner !== null) {
            message.didIdentityOwner = object.didIdentityOwner;
        }
        else {
            message.didIdentityOwner = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        if (object.dataSourceRef !== undefined && object.dataSourceRef !== null) {
            message.dataSourceRef = object.dataSourceRef;
        }
        else {
            message.dataSourceRef = 0;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseMsgAddDataSource = { creator: '' };
export const MsgAddDataSource = {
    encode(message, writer = Writer.create()) {
        if (message.dataSource !== undefined) {
            DataSource.encode(message.dataSource, writer.uint32(10).fork()).ldelim();
        }
        if (message.creator !== '') {
            writer.uint32(18).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddDataSource };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dataSource = DataSource.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddDataSource };
        if (object.dataSource !== undefined && object.dataSource !== null) {
            message.dataSource = DataSource.fromJSON(object.dataSource);
        }
        else {
            message.dataSource = undefined;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.dataSource !== undefined && (obj.dataSource = message.dataSource ? DataSource.toJSON(message.dataSource) : undefined);
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddDataSource };
        if (object.dataSource !== undefined && object.dataSource !== null) {
            message.dataSource = DataSource.fromPartial(object.dataSource);
        }
        else {
            message.dataSource = undefined;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseMsgAddDataSourceResponse = { ok: false, cid: '' };
export const MsgAddDataSourceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        if (message.cid !== '') {
            writer.uint32(18).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddDataSourceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ok = reader.bool();
                    break;
                case 2:
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
        const message = { ...baseMsgAddDataSourceResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = Boolean(object.ok);
        }
        else {
            message.ok = false;
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
        message.ok !== undefined && (obj.ok = message.ok);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddDataSourceResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
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
const baseMsgRemoveDataSource = { creator: '', cid: '' };
export const MsgRemoveDataSource = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.cid !== '') {
            writer.uint32(18).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveDataSource };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
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
        const message = { ...baseMsgRemoveDataSource };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRemoveDataSource };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
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
const baseMsgRemoveDataSourceResponse = { ok: false };
export const MsgRemoveDataSourceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveDataSourceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ok = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRemoveDataSourceResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = Boolean(object.ok);
        }
        else {
            message.ok = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.ok !== undefined && (obj.ok = message.ok);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRemoveDataSourceResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
        }
        return message;
    }
};
const baseMsgUpdateDataSource = { creator: '', cid: '', name: '', description: '', anchors: 0 };
export const MsgUpdateDataSource = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.cid !== '') {
            writer.uint32(18).string(message.cid);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        if (message.description !== '') {
            writer.uint32(34).string(message.description);
        }
        writer.uint32(42).fork();
        for (const v of message.anchors) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDataSource };
        message.anchors = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cid = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
                    break;
                case 5:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.anchors.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.anchors.push(longToNumber(reader.uint64()));
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateDataSource };
        message.anchors = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = '';
        }
        if (object.anchors !== undefined && object.anchors !== null) {
            for (const e of object.anchors) {
                message.anchors.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cid !== undefined && (obj.cid = message.cid);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        if (message.anchors) {
            obj.anchors = message.anchors.map((e) => e);
        }
        else {
            obj.anchors = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDataSource };
        message.anchors = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = '';
        }
        if (object.anchors !== undefined && object.anchors !== null) {
            for (const e of object.anchors) {
                message.anchors.push(e);
            }
        }
        return message;
    }
};
const baseMsgUpdateDataSourceResponse = { ok: false, cid: '' };
export const MsgUpdateDataSourceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        if (message.cid !== '') {
            writer.uint32(18).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDataSourceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ok = reader.bool();
                    break;
                case 2:
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
        const message = { ...baseMsgUpdateDataSourceResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = Boolean(object.ok);
        }
        else {
            message.ok = false;
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
        message.ok !== undefined && (obj.ok = message.ok);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDataSourceResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
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
const baseMsgAddDataUnion = { creator: '' };
export const MsgAddDataUnion = {
    encode(message, writer = Writer.create()) {
        if (message.dataUnion !== undefined) {
            DataUnion.encode(message.dataUnion, writer.uint32(10).fork()).ldelim();
        }
        if (message.creator !== '') {
            writer.uint32(18).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddDataUnion };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.dataUnion = DataUnion.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddDataUnion };
        if (object.dataUnion !== undefined && object.dataUnion !== null) {
            message.dataUnion = DataUnion.fromJSON(object.dataUnion);
        }
        else {
            message.dataUnion = undefined;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.dataUnion !== undefined && (obj.dataUnion = message.dataUnion ? DataUnion.toJSON(message.dataUnion) : undefined);
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddDataUnion };
        if (object.dataUnion !== undefined && object.dataUnion !== null) {
            message.dataUnion = DataUnion.fromPartial(object.dataUnion);
        }
        else {
            message.dataUnion = undefined;
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseMsgAddDataUnionResponse = {};
export const MsgAddDataUnionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddDataUnionResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgAddDataUnionResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgAddDataUnionResponse };
        return message;
    }
};
const baseMsgRemoveDataUnion = { creator: '', cid: '' };
export const MsgRemoveDataUnion = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.cid !== '') {
            writer.uint32(18).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveDataUnion };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
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
        const message = { ...baseMsgRemoveDataUnion };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRemoveDataUnion };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
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
const baseMsgRemoveDataUnionResponse = {};
export const MsgRemoveDataUnionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveDataUnionResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgRemoveDataUnionResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgRemoveDataUnionResponse };
        return message;
    }
};
const baseMsgUpdateDataUnion = { creator: '', cid: '', name: '' };
export const MsgUpdateDataUnion = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.cid !== '') {
            writer.uint32(18).string(message.cid);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDataUnion };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cid = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateDataUnion };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cid !== undefined && (obj.cid = message.cid);
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDataUnion };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        return message;
    }
};
const baseMsgUpdateDataUnionResponse = {};
export const MsgUpdateDataUnionResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDataUnionResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgUpdateDataUnionResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateDataUnionResponse };
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
