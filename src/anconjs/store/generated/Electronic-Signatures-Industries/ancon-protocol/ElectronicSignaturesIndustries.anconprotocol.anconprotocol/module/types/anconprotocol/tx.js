/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { MsgAddDataSourceResponse, MsgRemoveDataSourceResponse, MsgUpdateDataSourceResponse, MsgAddDataUnionResponse, MsgRemoveDataUnionResponse, MsgUpdateDataUnionResponse, MsgAddDataSource, MsgRemoveDataSource, MsgUpdateDataSource, MsgAddDataUnion, MsgRemoveDataUnion, MsgUpdateDataUnion } from '../anconprotocol/data_union';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseMsgUpdateMetadataOwnership = {
    hash: '',
    previousOwner: '',
    newOwner: '',
    currentChainId: '',
    recipientChainId: '',
    sender: '',
    tokenAddress: '',
    tokenId: ''
};
export const MsgUpdateMetadataOwnership = {
    encode(message, writer = Writer.create()) {
        if (message.hash !== '') {
            writer.uint32(10).string(message.hash);
        }
        if (message.previousOwner !== '') {
            writer.uint32(18).string(message.previousOwner);
        }
        if (message.newOwner !== '') {
            writer.uint32(26).string(message.newOwner);
        }
        if (message.currentChainId !== '') {
            writer.uint32(34).string(message.currentChainId);
        }
        if (message.recipientChainId !== '') {
            writer.uint32(42).string(message.recipientChainId);
        }
        if (message.sender !== '') {
            writer.uint32(50).string(message.sender);
        }
        if (message.tokenAddress !== '') {
            writer.uint32(58).string(message.tokenAddress);
        }
        if (message.tokenId !== '') {
            writer.uint32(66).string(message.tokenId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateMetadataOwnership };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                case 2:
                    message.previousOwner = reader.string();
                    break;
                case 3:
                    message.newOwner = reader.string();
                    break;
                case 4:
                    message.currentChainId = reader.string();
                    break;
                case 5:
                    message.recipientChainId = reader.string();
                    break;
                case 6:
                    message.sender = reader.string();
                    break;
                case 7:
                    message.tokenAddress = reader.string();
                    break;
                case 8:
                    message.tokenId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateMetadataOwnership };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = String(object.hash);
        }
        else {
            message.hash = '';
        }
        if (object.previousOwner !== undefined && object.previousOwner !== null) {
            message.previousOwner = String(object.previousOwner);
        }
        else {
            message.previousOwner = '';
        }
        if (object.newOwner !== undefined && object.newOwner !== null) {
            message.newOwner = String(object.newOwner);
        }
        else {
            message.newOwner = '';
        }
        if (object.currentChainId !== undefined && object.currentChainId !== null) {
            message.currentChainId = String(object.currentChainId);
        }
        else {
            message.currentChainId = '';
        }
        if (object.recipientChainId !== undefined && object.recipientChainId !== null) {
            message.recipientChainId = String(object.recipientChainId);
        }
        else {
            message.recipientChainId = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.tokenAddress !== undefined && object.tokenAddress !== null) {
            message.tokenAddress = String(object.tokenAddress);
        }
        else {
            message.tokenAddress = '';
        }
        if (object.tokenId !== undefined && object.tokenId !== null) {
            message.tokenId = String(object.tokenId);
        }
        else {
            message.tokenId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = message.hash);
        message.previousOwner !== undefined && (obj.previousOwner = message.previousOwner);
        message.newOwner !== undefined && (obj.newOwner = message.newOwner);
        message.currentChainId !== undefined && (obj.currentChainId = message.currentChainId);
        message.recipientChainId !== undefined && (obj.recipientChainId = message.recipientChainId);
        message.sender !== undefined && (obj.sender = message.sender);
        message.tokenAddress !== undefined && (obj.tokenAddress = message.tokenAddress);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateMetadataOwnership };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = '';
        }
        if (object.previousOwner !== undefined && object.previousOwner !== null) {
            message.previousOwner = object.previousOwner;
        }
        else {
            message.previousOwner = '';
        }
        if (object.newOwner !== undefined && object.newOwner !== null) {
            message.newOwner = object.newOwner;
        }
        else {
            message.newOwner = '';
        }
        if (object.currentChainId !== undefined && object.currentChainId !== null) {
            message.currentChainId = object.currentChainId;
        }
        else {
            message.currentChainId = '';
        }
        if (object.recipientChainId !== undefined && object.recipientChainId !== null) {
            message.recipientChainId = object.recipientChainId;
        }
        else {
            message.recipientChainId = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.tokenAddress !== undefined && object.tokenAddress !== null) {
            message.tokenAddress = object.tokenAddress;
        }
        else {
            message.tokenAddress = '';
        }
        if (object.tokenId !== undefined && object.tokenId !== null) {
            message.tokenId = object.tokenId;
        }
        else {
            message.tokenId = '';
        }
        return message;
    }
};
const baseMsgSchemaStore = { creator: '', path: '', codec: '', isJsonSchema: false };
export const MsgSchemaStore = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.path !== '') {
            writer.uint32(18).string(message.path);
        }
        if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
        }
        if (message.codec !== '') {
            writer.uint32(34).string(message.codec);
        }
        if (message.isJsonSchema === true) {
            writer.uint32(40).bool(message.isJsonSchema);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSchemaStore };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                case 3:
                    message.data = reader.bytes();
                    break;
                case 4:
                    message.codec = reader.string();
                    break;
                case 5:
                    message.isJsonSchema = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSchemaStore };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.codec !== undefined && object.codec !== null) {
            message.codec = String(object.codec);
        }
        else {
            message.codec = '';
        }
        if (object.isJsonSchema !== undefined && object.isJsonSchema !== null) {
            message.isJsonSchema = Boolean(object.isJsonSchema);
        }
        else {
            message.isJsonSchema = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.path !== undefined && (obj.path = message.path);
        message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.codec !== undefined && (obj.codec = message.codec);
        message.isJsonSchema !== undefined && (obj.isJsonSchema = message.isJsonSchema);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSchemaStore };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        if (object.codec !== undefined && object.codec !== null) {
            message.codec = object.codec;
        }
        else {
            message.codec = '';
        }
        if (object.isJsonSchema !== undefined && object.isJsonSchema !== null) {
            message.isJsonSchema = object.isJsonSchema;
        }
        else {
            message.isJsonSchema = false;
        }
        return message;
    }
};
const baseMsgSchemaStoreResponse = { cid: '' };
export const MsgSchemaStoreResponse = {
    encode(message, writer = Writer.create()) {
        if (message.cid !== '') {
            writer.uint32(10).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSchemaStoreResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseMsgSchemaStoreResponse };
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
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSchemaStoreResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        return message;
    }
};
const baseMsgUpdateMetadataOwnershipResponse = { metadataRef: '', packetRef: '' };
export const MsgUpdateMetadataOwnershipResponse = {
    encode(message, writer = Writer.create()) {
        if (message.metadataRef !== '') {
            writer.uint32(10).string(message.metadataRef);
        }
        if (message.packetRef !== '') {
            writer.uint32(18).string(message.packetRef);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateMetadataOwnershipResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadataRef = reader.string();
                    break;
                case 2:
                    message.packetRef = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdateMetadataOwnershipResponse };
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        if (object.packetRef !== undefined && object.packetRef !== null) {
            message.packetRef = String(object.packetRef);
        }
        else {
            message.packetRef = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.packetRef !== undefined && (obj.packetRef = message.packetRef);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateMetadataOwnershipResponse };
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        if (object.packetRef !== undefined && object.packetRef !== null) {
            message.packetRef = object.packetRef;
        }
        else {
            message.packetRef = '';
        }
        return message;
    }
};
const baseMsgRegisterRelay = { sender: '', chain: '', alg: '', pub: '' };
export const MsgRegisterRelay = {
    encode(message, writer = Writer.create()) {
        if (message.sender !== '') {
            writer.uint32(10).string(message.sender);
        }
        if (message.chain !== '') {
            writer.uint32(18).string(message.chain);
        }
        if (message.alg !== '') {
            writer.uint32(26).string(message.alg);
        }
        if (message.pub !== '') {
            writer.uint32(34).string(message.pub);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRegisterRelay };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.chain = reader.string();
                    break;
                case 3:
                    message.alg = reader.string();
                    break;
                case 4:
                    message.pub = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRegisterRelay };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.chain !== undefined && object.chain !== null) {
            message.chain = String(object.chain);
        }
        else {
            message.chain = '';
        }
        if (object.alg !== undefined && object.alg !== null) {
            message.alg = String(object.alg);
        }
        else {
            message.alg = '';
        }
        if (object.pub !== undefined && object.pub !== null) {
            message.pub = String(object.pub);
        }
        else {
            message.pub = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.chain !== undefined && (obj.chain = message.chain);
        message.alg !== undefined && (obj.alg = message.alg);
        message.pub !== undefined && (obj.pub = message.pub);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRegisterRelay };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.chain !== undefined && object.chain !== null) {
            message.chain = object.chain;
        }
        else {
            message.chain = '';
        }
        if (object.alg !== undefined && object.alg !== null) {
            message.alg = object.alg;
        }
        else {
            message.alg = '';
        }
        if (object.pub !== undefined && object.pub !== null) {
            message.pub = object.pub;
        }
        else {
            message.pub = '';
        }
        return message;
    }
};
const baseMsgRegisterRelayResponse = { id: '' };
export const MsgRegisterRelayResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRegisterRelayResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRegisterRelayResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRegisterRelayResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        return message;
    }
};
const baseMsgCreateDid = { creator: '', vanityName: '', didType: '' };
export const MsgCreateDid = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.vanityName !== '') {
            writer.uint32(18).string(message.vanityName);
        }
        if (message.didType !== '') {
            writer.uint32(26).string(message.didType);
        }
        if (message.publicKeyBytes.length !== 0) {
            writer.uint32(34).bytes(message.publicKeyBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateDid };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.vanityName = reader.string();
                    break;
                case 3:
                    message.didType = reader.string();
                    break;
                case 4:
                    message.publicKeyBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateDid };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.vanityName !== undefined && object.vanityName !== null) {
            message.vanityName = String(object.vanityName);
        }
        else {
            message.vanityName = '';
        }
        if (object.didType !== undefined && object.didType !== null) {
            message.didType = String(object.didType);
        }
        else {
            message.didType = '';
        }
        if (object.publicKeyBytes !== undefined && object.publicKeyBytes !== null) {
            message.publicKeyBytes = bytesFromBase64(object.publicKeyBytes);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.vanityName !== undefined && (obj.vanityName = message.vanityName);
        message.didType !== undefined && (obj.didType = message.didType);
        message.publicKeyBytes !== undefined &&
            (obj.publicKeyBytes = base64FromBytes(message.publicKeyBytes !== undefined ? message.publicKeyBytes : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateDid };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.vanityName !== undefined && object.vanityName !== null) {
            message.vanityName = object.vanityName;
        }
        else {
            message.vanityName = '';
        }
        if (object.didType !== undefined && object.didType !== null) {
            message.didType = object.didType;
        }
        else {
            message.didType = '';
        }
        if (object.publicKeyBytes !== undefined && object.publicKeyBytes !== null) {
            message.publicKeyBytes = object.publicKeyBytes;
        }
        else {
            message.publicKeyBytes = new Uint8Array();
        }
        return message;
    }
};
const baseMsgCreateDidResponse = { cid: '', did: '', url: '' };
export const MsgCreateDidResponse = {
    encode(message, writer = Writer.create()) {
        if (message.cid !== '') {
            writer.uint32(10).string(message.cid);
        }
        if (message.did !== '') {
            writer.uint32(18).string(message.did);
        }
        if (message.url !== '') {
            writer.uint32(26).string(message.url);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateDidResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cid = reader.string();
                    break;
                case 2:
                    message.did = reader.string();
                    break;
                case 3:
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateDidResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = String(object.url);
        }
        else {
            message.url = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cid !== undefined && (obj.cid = message.cid);
        message.did !== undefined && (obj.did = message.did);
        message.url !== undefined && (obj.url = message.url);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateDidResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.url !== undefined && object.url !== null) {
            message.url = object.url;
        }
        else {
            message.url = '';
        }
        return message;
    }
};
const baseMsgUpdateDid = { creator: '', did: '', metadata: '', cid: '' };
export const MsgUpdateDid = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.did !== '') {
            writer.uint32(18).string(message.did);
        }
        if (message.metadata !== '') {
            writer.uint32(26).string(message.metadata);
        }
        if (message.cid !== '') {
            writer.uint32(34).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDid };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.did = reader.string();
                    break;
                case 3:
                    message.metadata = reader.string();
                    break;
                case 4:
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
        const message = { ...baseMsgUpdateDid };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = String(object.metadata);
        }
        else {
            message.metadata = '';
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
        message.did !== undefined && (obj.did = message.did);
        message.metadata !== undefined && (obj.metadata = message.metadata);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateDid };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        else {
            message.metadata = '';
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
const baseMsgUpdateDidResponse = {};
export const MsgUpdateDidResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateDidResponse };
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
        const message = { ...baseMsgUpdateDidResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateDidResponse };
        return message;
    }
};
const baseMsgRevokeDid = { creator: '', did: '', metadata: '', cid: '' };
export const MsgRevokeDid = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.did !== '') {
            writer.uint32(18).string(message.did);
        }
        if (message.metadata !== '') {
            writer.uint32(26).string(message.metadata);
        }
        if (message.cid !== '') {
            writer.uint32(34).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRevokeDid };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.did = reader.string();
                    break;
                case 3:
                    message.metadata = reader.string();
                    break;
                case 4:
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
        const message = { ...baseMsgRevokeDid };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = String(object.metadata);
        }
        else {
            message.metadata = '';
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
        message.did !== undefined && (obj.did = message.did);
        message.metadata !== undefined && (obj.metadata = message.metadata);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRevokeDid };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        else {
            message.metadata = '';
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
const baseMsgRevokeDidResponse = { ok: false };
export const MsgRevokeDidResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRevokeDidResponse };
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
        const message = { ...baseMsgRevokeDidResponse };
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
        const message = { ...baseMsgRevokeDidResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
        }
        return message;
    }
};
const baseMsgMintTrustedContent = {
    creator: '',
    metadataRef: '',
    denomId: '',
    name: '',
    recipient: '',
    didOwner: '',
    lazyMint: false,
    price: 0,
    r: '',
    s: '',
    v: 0
};
export const MsgMintTrustedContent = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.metadataRef !== '') {
            writer.uint32(18).string(message.metadataRef);
        }
        if (message.denomId !== '') {
            writer.uint32(26).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(34).string(message.name);
        }
        if (message.recipient !== '') {
            writer.uint32(42).string(message.recipient);
        }
        if (message.didOwner !== '') {
            writer.uint32(50).string(message.didOwner);
        }
        if (message.lazyMint === true) {
            writer.uint32(56).bool(message.lazyMint);
        }
        if (message.price !== 0) {
            writer.uint32(64).uint64(message.price);
        }
        if (message.r !== '') {
            writer.uint32(74).string(message.r);
        }
        if (message.s !== '') {
            writer.uint32(82).string(message.s);
        }
        if (message.v !== 0) {
            writer.uint32(88).uint64(message.v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintTrustedContent };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.metadataRef = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.recipient = reader.string();
                    break;
                case 6:
                    message.didOwner = reader.string();
                    break;
                case 7:
                    message.lazyMint = reader.bool();
                    break;
                case 8:
                    message.price = longToNumber(reader.uint64());
                    break;
                case 9:
                    message.r = reader.string();
                    break;
                case 10:
                    message.s = reader.string();
                    break;
                case 11:
                    message.v = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintTrustedContent };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = String(object.didOwner);
        }
        else {
            message.didOwner = '';
        }
        if (object.lazyMint !== undefined && object.lazyMint !== null) {
            message.lazyMint = Boolean(object.lazyMint);
        }
        else {
            message.lazyMint = false;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        if (object.r !== undefined && object.r !== null) {
            message.r = String(object.r);
        }
        else {
            message.r = '';
        }
        if (object.s !== undefined && object.s !== null) {
            message.s = String(object.s);
        }
        else {
            message.s = '';
        }
        if (object.v !== undefined && object.v !== null) {
            message.v = Number(object.v);
        }
        else {
            message.v = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.lazyMint !== undefined && (obj.lazyMint = message.lazyMint);
        message.price !== undefined && (obj.price = message.price);
        message.r !== undefined && (obj.r = message.r);
        message.s !== undefined && (obj.s = message.s);
        message.v !== undefined && (obj.v = message.v);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintTrustedContent };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = object.didOwner;
        }
        else {
            message.didOwner = '';
        }
        if (object.lazyMint !== undefined && object.lazyMint !== null) {
            message.lazyMint = object.lazyMint;
        }
        else {
            message.lazyMint = false;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        if (object.r !== undefined && object.r !== null) {
            message.r = object.r;
        }
        else {
            message.r = '';
        }
        if (object.s !== undefined && object.s !== null) {
            message.s = object.s;
        }
        else {
            message.s = '';
        }
        if (object.v !== undefined && object.v !== null) {
            message.v = object.v;
        }
        else {
            message.v = 0;
        }
        return message;
    }
};
const baseMsgMintTrustedContentResponse = { id: 0 };
export const MsgMintTrustedContentResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintTrustedContentResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintTrustedContentResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintTrustedContentResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    }
};
const baseMsgSendCrossMintTrusted = {
    creator: '',
    metadataRef: '',
    denomId: '',
    name: '',
    recipient: '',
    didOwner: '',
    lazyMint: false,
    price: 0,
    metaTransaction: '',
    destinationDomain: 0
};
export const MsgSendCrossMintTrusted = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.metadataRef !== '') {
            writer.uint32(18).string(message.metadataRef);
        }
        if (message.denomId !== '') {
            writer.uint32(26).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(34).string(message.name);
        }
        if (message.recipient !== '') {
            writer.uint32(42).string(message.recipient);
        }
        if (message.didOwner !== '') {
            writer.uint32(50).string(message.didOwner);
        }
        if (message.lazyMint === true) {
            writer.uint32(56).bool(message.lazyMint);
        }
        if (message.price !== 0) {
            writer.uint32(64).uint64(message.price);
        }
        if (message.metaTransaction !== '') {
            writer.uint32(74).string(message.metaTransaction);
        }
        if (message.destinationDomain !== 0) {
            writer.uint32(80).uint64(message.destinationDomain);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSendCrossMintTrusted };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.metadataRef = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.recipient = reader.string();
                    break;
                case 6:
                    message.didOwner = reader.string();
                    break;
                case 7:
                    message.lazyMint = reader.bool();
                    break;
                case 8:
                    message.price = longToNumber(reader.uint64());
                    break;
                case 9:
                    message.metaTransaction = reader.string();
                    break;
                case 10:
                    message.destinationDomain = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSendCrossMintTrusted };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = String(object.didOwner);
        }
        else {
            message.didOwner = '';
        }
        if (object.lazyMint !== undefined && object.lazyMint !== null) {
            message.lazyMint = Boolean(object.lazyMint);
        }
        else {
            message.lazyMint = false;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        if (object.metaTransaction !== undefined && object.metaTransaction !== null) {
            message.metaTransaction = String(object.metaTransaction);
        }
        else {
            message.metaTransaction = '';
        }
        if (object.destinationDomain !== undefined && object.destinationDomain !== null) {
            message.destinationDomain = Number(object.destinationDomain);
        }
        else {
            message.destinationDomain = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.lazyMint !== undefined && (obj.lazyMint = message.lazyMint);
        message.price !== undefined && (obj.price = message.price);
        message.metaTransaction !== undefined && (obj.metaTransaction = message.metaTransaction);
        message.destinationDomain !== undefined && (obj.destinationDomain = message.destinationDomain);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSendCrossMintTrusted };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = object.didOwner;
        }
        else {
            message.didOwner = '';
        }
        if (object.lazyMint !== undefined && object.lazyMint !== null) {
            message.lazyMint = object.lazyMint;
        }
        else {
            message.lazyMint = false;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        if (object.metaTransaction !== undefined && object.metaTransaction !== null) {
            message.metaTransaction = object.metaTransaction;
        }
        else {
            message.metaTransaction = '';
        }
        if (object.destinationDomain !== undefined && object.destinationDomain !== null) {
            message.destinationDomain = object.destinationDomain;
        }
        else {
            message.destinationDomain = 0;
        }
        return message;
    }
};
const baseMsgSendCrossMintTrustedResponse = { id: 0 };
export const MsgSendCrossMintTrustedResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSendCrossMintTrustedResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSendCrossMintTrustedResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSendCrossMintTrustedResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    }
};
const baseMsgMintSwapResponse = { id: 0 };
export const MsgMintSwapResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintSwapResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintSwapResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintSwapResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    }
};
const baseMsgMintSwap = {
    creator: '',
    metadataRef: '',
    denomId: '',
    name: '',
    recipient: '',
    didOwner: '',
    destinationDenomId: '',
    price: 0,
    r: '',
    s: '',
    v: 0
};
export const MsgMintSwap = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.metadataRef !== '') {
            writer.uint32(18).string(message.metadataRef);
        }
        if (message.denomId !== '') {
            writer.uint32(26).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(34).string(message.name);
        }
        if (message.recipient !== '') {
            writer.uint32(42).string(message.recipient);
        }
        if (message.didOwner !== '') {
            writer.uint32(50).string(message.didOwner);
        }
        if (message.destinationDenomId !== '') {
            writer.uint32(58).string(message.destinationDenomId);
        }
        if (message.price !== 0) {
            writer.uint32(64).uint64(message.price);
        }
        if (message.r !== '') {
            writer.uint32(74).string(message.r);
        }
        if (message.s !== '') {
            writer.uint32(82).string(message.s);
        }
        if (message.v !== 0) {
            writer.uint32(88).uint64(message.v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintSwap };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.metadataRef = reader.string();
                    break;
                case 3:
                    message.denomId = reader.string();
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.recipient = reader.string();
                    break;
                case 6:
                    message.didOwner = reader.string();
                    break;
                case 7:
                    message.destinationDenomId = reader.string();
                    break;
                case 8:
                    message.price = longToNumber(reader.uint64());
                    break;
                case 9:
                    message.r = reader.string();
                    break;
                case 10:
                    message.s = reader.string();
                    break;
                case 11:
                    message.v = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = String(object.didOwner);
        }
        else {
            message.didOwner = '';
        }
        if (object.destinationDenomId !== undefined && object.destinationDenomId !== null) {
            message.destinationDenomId = String(object.destinationDenomId);
        }
        else {
            message.destinationDenomId = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        if (object.r !== undefined && object.r !== null) {
            message.r = String(object.r);
        }
        else {
            message.r = '';
        }
        if (object.s !== undefined && object.s !== null) {
            message.s = String(object.s);
        }
        else {
            message.s = '';
        }
        if (object.v !== undefined && object.v !== null) {
            message.v = Number(object.v);
        }
        else {
            message.v = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.destinationDenomId !== undefined && (obj.destinationDenomId = message.destinationDenomId);
        message.price !== undefined && (obj.price = message.price);
        message.r !== undefined && (obj.r = message.r);
        message.s !== undefined && (obj.s = message.s);
        message.v !== undefined && (obj.v = message.v);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = object.didOwner;
        }
        else {
            message.didOwner = '';
        }
        if (object.destinationDenomId !== undefined && object.destinationDenomId !== null) {
            message.destinationDenomId = object.destinationDenomId;
        }
        else {
            message.destinationDenomId = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        if (object.r !== undefined && object.r !== null) {
            message.r = object.r;
        }
        else {
            message.r = '';
        }
        if (object.s !== undefined && object.s !== null) {
            message.s = object.s;
        }
        else {
            message.s = '';
        }
        if (object.v !== undefined && object.v !== null) {
            message.v = object.v;
        }
        else {
            message.v = 0;
        }
        return message;
    }
};
const baseMsgInitiateSwap = { creator: '' };
export const MsgInitiateSwap = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgInitiateSwap };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseMsgInitiateSwap };
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
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgInitiateSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseMsgInitiateSwapResponse = { relayTo: 0, voucher: '', key: '' };
export const MsgInitiateSwapResponse = {
    encode(message, writer = Writer.create()) {
        if (message.relayTo !== 0) {
            writer.uint32(8).uint64(message.relayTo);
        }
        if (message.voucher !== '') {
            writer.uint32(18).string(message.voucher);
        }
        if (message.key !== '') {
            writer.uint32(26).string(message.key);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgInitiateSwapResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.relayTo = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.voucher = reader.string();
                    break;
                case 3:
                    message.key = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgInitiateSwapResponse };
        if (object.relayTo !== undefined && object.relayTo !== null) {
            message.relayTo = Number(object.relayTo);
        }
        else {
            message.relayTo = 0;
        }
        if (object.voucher !== undefined && object.voucher !== null) {
            message.voucher = String(object.voucher);
        }
        else {
            message.voucher = '';
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.relayTo !== undefined && (obj.relayTo = message.relayTo);
        message.voucher !== undefined && (obj.voucher = message.voucher);
        message.key !== undefined && (obj.key = message.key);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgInitiateSwapResponse };
        if (object.relayTo !== undefined && object.relayTo !== null) {
            message.relayTo = object.relayTo;
        }
        else {
            message.relayTo = 0;
        }
        if (object.voucher !== undefined && object.voucher !== null) {
            message.voucher = object.voucher;
        }
        else {
            message.voucher = '';
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        else {
            message.key = '';
        }
        return message;
    }
};
const baseMsgClaimSwap = { creator: '', did: '', metadata: '', cid: '' };
export const MsgClaimSwap = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.did !== '') {
            writer.uint32(18).string(message.did);
        }
        if (message.metadata !== '') {
            writer.uint32(26).string(message.metadata);
        }
        if (message.cid !== '') {
            writer.uint32(34).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgClaimSwap };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.did = reader.string();
                    break;
                case 3:
                    message.metadata = reader.string();
                    break;
                case 4:
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
        const message = { ...baseMsgClaimSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = String(object.metadata);
        }
        else {
            message.metadata = '';
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
        message.did !== undefined && (obj.did = message.did);
        message.metadata !== undefined && (obj.metadata = message.metadata);
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgClaimSwap };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        else {
            message.metadata = '';
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
const baseMsgClaimSwapResponse = { id: 0 };
export const MsgClaimSwapResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgClaimSwapResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgClaimSwapResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgClaimSwapResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    }
};
const baseMsgMintTrustedResource = {
    creator: '',
    metadataRef: '',
    didOwner: '',
    denomId: '',
    name: '',
    recipient: '',
    resourceWhitelistAccess: '',
    resourceLocation: '',
    lazyMint: false,
    price: 0,
    r: '',
    s: '',
    v: 0
};
export const MsgMintTrustedResource = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.metadataRef !== '') {
            writer.uint32(18).string(message.metadataRef);
        }
        if (message.didOwner !== '') {
            writer.uint32(26).string(message.didOwner);
        }
        if (message.denomId !== '') {
            writer.uint32(34).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(42).string(message.name);
        }
        if (message.recipient !== '') {
            writer.uint32(50).string(message.recipient);
        }
        for (const v of message.resourceWhitelistAccess) {
            writer.uint32(58).string(v);
        }
        if (message.resourceLocation !== '') {
            writer.uint32(66).string(message.resourceLocation);
        }
        if (message.lazyMint === true) {
            writer.uint32(72).bool(message.lazyMint);
        }
        if (message.price !== 0) {
            writer.uint32(80).uint64(message.price);
        }
        if (message.r !== '') {
            writer.uint32(90).string(message.r);
        }
        if (message.s !== '') {
            writer.uint32(98).string(message.s);
        }
        if (message.v !== 0) {
            writer.uint32(104).uint64(message.v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintTrustedResource };
        message.resourceWhitelistAccess = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.metadataRef = reader.string();
                    break;
                case 3:
                    message.didOwner = reader.string();
                    break;
                case 4:
                    message.denomId = reader.string();
                    break;
                case 5:
                    message.name = reader.string();
                    break;
                case 6:
                    message.recipient = reader.string();
                    break;
                case 7:
                    message.resourceWhitelistAccess.push(reader.string());
                    break;
                case 8:
                    message.resourceLocation = reader.string();
                    break;
                case 9:
                    message.lazyMint = reader.bool();
                    break;
                case 10:
                    message.price = longToNumber(reader.uint64());
                    break;
                case 11:
                    message.r = reader.string();
                    break;
                case 12:
                    message.s = reader.string();
                    break;
                case 13:
                    message.v = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintTrustedResource };
        message.resourceWhitelistAccess = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = String(object.didOwner);
        }
        else {
            message.didOwner = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        if (object.resourceWhitelistAccess !== undefined && object.resourceWhitelistAccess !== null) {
            for (const e of object.resourceWhitelistAccess) {
                message.resourceWhitelistAccess.push(String(e));
            }
        }
        if (object.resourceLocation !== undefined && object.resourceLocation !== null) {
            message.resourceLocation = String(object.resourceLocation);
        }
        else {
            message.resourceLocation = '';
        }
        if (object.lazyMint !== undefined && object.lazyMint !== null) {
            message.lazyMint = Boolean(object.lazyMint);
        }
        else {
            message.lazyMint = false;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        if (object.r !== undefined && object.r !== null) {
            message.r = String(object.r);
        }
        else {
            message.r = '';
        }
        if (object.s !== undefined && object.s !== null) {
            message.s = String(object.s);
        }
        else {
            message.s = '';
        }
        if (object.v !== undefined && object.v !== null) {
            message.v = Number(object.v);
        }
        else {
            message.v = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        if (message.resourceWhitelistAccess) {
            obj.resourceWhitelistAccess = message.resourceWhitelistAccess.map((e) => e);
        }
        else {
            obj.resourceWhitelistAccess = [];
        }
        message.resourceLocation !== undefined && (obj.resourceLocation = message.resourceLocation);
        message.lazyMint !== undefined && (obj.lazyMint = message.lazyMint);
        message.price !== undefined && (obj.price = message.price);
        message.r !== undefined && (obj.r = message.r);
        message.s !== undefined && (obj.s = message.s);
        message.v !== undefined && (obj.v = message.v);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintTrustedResource };
        message.resourceWhitelistAccess = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = object.didOwner;
        }
        else {
            message.didOwner = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        if (object.resourceWhitelistAccess !== undefined && object.resourceWhitelistAccess !== null) {
            for (const e of object.resourceWhitelistAccess) {
                message.resourceWhitelistAccess.push(e);
            }
        }
        if (object.resourceLocation !== undefined && object.resourceLocation !== null) {
            message.resourceLocation = object.resourceLocation;
        }
        else {
            message.resourceLocation = '';
        }
        if (object.lazyMint !== undefined && object.lazyMint !== null) {
            message.lazyMint = object.lazyMint;
        }
        else {
            message.lazyMint = false;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        if (object.r !== undefined && object.r !== null) {
            message.r = object.r;
        }
        else {
            message.r = '';
        }
        if (object.s !== undefined && object.s !== null) {
            message.s = object.s;
        }
        else {
            message.s = '';
        }
        if (object.v !== undefined && object.v !== null) {
            message.v = object.v;
        }
        else {
            message.v = 0;
        }
        return message;
    }
};
const baseMsgMintTrustedResourceResponse = { id: 0 };
export const MsgMintTrustedResourceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintTrustedResourceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintTrustedResourceResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintTrustedResourceResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    }
};
const baseMsgRoyaltyInfo = { creator: '', id: '', receiver: '', royaltyFeePercentage: 0, metadataRef: '', denomId: '' };
export const MsgRoyaltyInfo = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== '') {
            writer.uint32(18).string(message.id);
        }
        if (message.receiver !== '') {
            writer.uint32(26).string(message.receiver);
        }
        if (message.royaltyFeePercentage !== 0) {
            writer.uint32(32).uint64(message.royaltyFeePercentage);
        }
        if (message.metadataRef !== '') {
            writer.uint32(42).string(message.metadataRef);
        }
        if (message.denomId !== '') {
            writer.uint32(50).string(message.denomId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRoyaltyInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.receiver = reader.string();
                    break;
                case 4:
                    message.royaltyFeePercentage = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.metadataRef = reader.string();
                    break;
                case 6:
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
        const message = { ...baseMsgRoyaltyInfo };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
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
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.royaltyFeePercentage !== undefined && (obj.royaltyFeePercentage = message.royaltyFeePercentage);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRoyaltyInfo };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
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
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
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
const baseMsgRoyaltyInfoResponse = { receiver: '', royaltyFeePercentage: 0, metadataRef: '' };
export const MsgRoyaltyInfoResponse = {
    encode(message, writer = Writer.create()) {
        if (message.receiver !== '') {
            writer.uint32(10).string(message.receiver);
        }
        if (message.royaltyFeePercentage !== 0) {
            writer.uint32(16).uint64(message.royaltyFeePercentage);
        }
        if (message.metadataRef !== '') {
            writer.uint32(26).string(message.metadataRef);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRoyaltyInfoResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.receiver = reader.string();
                    break;
                case 2:
                    message.royaltyFeePercentage = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.metadataRef = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRoyaltyInfoResponse };
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
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.royaltyFeePercentage !== undefined && (obj.royaltyFeePercentage = message.royaltyFeePercentage);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRoyaltyInfoResponse };
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
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        return message;
    }
};
const baseMsgIssueDenom = { id: '', name: '', schema: '', sender: '', symbol: '', mintRestricted: false, updateRestricted: false };
export const MsgIssueDenom = {
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
        if (message.sender !== '') {
            writer.uint32(34).string(message.sender);
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
        const message = { ...baseMsgIssueDenom };
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
                    message.sender = reader.string();
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
        const message = { ...baseMsgIssueDenom };
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
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
        message.sender !== undefined && (obj.sender = message.sender);
        message.symbol !== undefined && (obj.symbol = message.symbol);
        message.mintRestricted !== undefined && (obj.mintRestricted = message.mintRestricted);
        message.updateRestricted !== undefined && (obj.updateRestricted = message.updateRestricted);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgIssueDenom };
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
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
const baseMsgIssueDenomResponse = {};
export const MsgIssueDenomResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgIssueDenomResponse };
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
        const message = { ...baseMsgIssueDenomResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgIssueDenomResponse };
        return message;
    }
};
const baseMsgTransferNFT = { id: '', denomId: '', name: '', uri: '', data: '', sender: '', recipient: '' };
export const MsgTransferNFT = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.denomId !== '') {
            writer.uint32(18).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        if (message.uri !== '') {
            writer.uint32(34).string(message.uri);
        }
        if (message.data !== '') {
            writer.uint32(42).string(message.data);
        }
        if (message.sender !== '') {
            writer.uint32(50).string(message.sender);
        }
        if (message.recipient !== '') {
            writer.uint32(58).string(message.recipient);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTransferNFT };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.denomId = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.uri = reader.string();
                    break;
                case 5:
                    message.data = reader.string();
                    break;
                case 6:
                    message.sender = reader.string();
                    break;
                case 7:
                    message.recipient = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgTransferNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.data !== undefined && (obj.data = message.data);
        message.sender !== undefined && (obj.sender = message.sender);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgTransferNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        return message;
    }
};
const baseMsgChangeOwnerResponse = { didIdentity: '', owner: '', previousChange: 0 };
export const MsgChangeOwnerResponse = {
    encode(message, writer = Writer.create()) {
        if (message.didIdentity !== '') {
            writer.uint32(10).string(message.didIdentity);
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
        const message = { ...baseMsgChangeOwnerResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.didIdentity = reader.string();
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
        const message = { ...baseMsgChangeOwnerResponse };
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = String(object.didIdentity);
        }
        else {
            message.didIdentity = '';
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
        message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity);
        message.owner !== undefined && (obj.owner = message.owner);
        message.previousChange !== undefined && (obj.previousChange = message.previousChange);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgChangeOwnerResponse };
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = object.didIdentity;
        }
        else {
            message.didIdentity = '';
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
const baseMsgChangeOwner = { creator: '', newOwner: '' };
export const MsgChangeOwner = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.newOwner !== '') {
            writer.uint32(18).string(message.newOwner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgChangeOwner };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.newOwner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgChangeOwner };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.newOwner !== undefined && object.newOwner !== null) {
            message.newOwner = String(object.newOwner);
        }
        else {
            message.newOwner = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.newOwner !== undefined && (obj.newOwner = message.newOwner);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgChangeOwner };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.newOwner !== undefined && object.newOwner !== null) {
            message.newOwner = object.newOwner;
        }
        else {
            message.newOwner = '';
        }
        return message;
    }
};
const baseMsgGrantDelegate = { delegate: '', delegateType: '', validity: 0, creator: '', didIdentity: '' };
export const MsgGrantDelegate = {
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
        if (message.didIdentity !== '') {
            writer.uint32(42).string(message.didIdentity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgGrantDelegate };
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
                    message.didIdentity = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgGrantDelegate };
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
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = String(object.didIdentity);
        }
        else {
            message.didIdentity = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegate !== undefined && (obj.delegate = message.delegate);
        message.delegateType !== undefined && (obj.delegateType = message.delegateType);
        message.validity !== undefined && (obj.validity = message.validity);
        message.creator !== undefined && (obj.creator = message.creator);
        message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgGrantDelegate };
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
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = object.didIdentity;
        }
        else {
            message.didIdentity = '';
        }
        return message;
    }
};
const baseMsgGrantDelegateResponse = { ok: false };
export const MsgGrantDelegateResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgGrantDelegateResponse };
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
        const message = { ...baseMsgGrantDelegateResponse };
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
        const message = { ...baseMsgGrantDelegateResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
        }
        return message;
    }
};
const baseMsgRevokeDelegate = { delegate: '', delegateType: '', validity: 0, creator: '', didIdentity: '' };
export const MsgRevokeDelegate = {
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
        if (message.didIdentity !== '') {
            writer.uint32(42).string(message.didIdentity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRevokeDelegate };
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
                    message.didIdentity = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRevokeDelegate };
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
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = String(object.didIdentity);
        }
        else {
            message.didIdentity = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegate !== undefined && (obj.delegate = message.delegate);
        message.delegateType !== undefined && (obj.delegateType = message.delegateType);
        message.validity !== undefined && (obj.validity = message.validity);
        message.creator !== undefined && (obj.creator = message.creator);
        message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRevokeDelegate };
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
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = object.didIdentity;
        }
        else {
            message.didIdentity = '';
        }
        return message;
    }
};
const baseMsgRevokeDelegateResponse = { ok: false };
export const MsgRevokeDelegateResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRevokeDelegateResponse };
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
        const message = { ...baseMsgRevokeDelegateResponse };
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
        const message = { ...baseMsgRevokeDelegateResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
        }
        return message;
    }
};
const baseMsgSetAttribute = { didIdentity: '', actor: '', creator: '', name: '', value: '', validity: 0 };
export const MsgSetAttribute = {
    encode(message, writer = Writer.create()) {
        if (message.didIdentity !== '') {
            writer.uint32(10).string(message.didIdentity);
        }
        if (message.actor !== '') {
            writer.uint32(18).string(message.actor);
        }
        if (message.creator !== '') {
            writer.uint32(26).string(message.creator);
        }
        for (const v of message.name) {
            writer.uint32(34).string(v);
        }
        for (const v of message.value) {
            writer.uint32(42).string(v);
        }
        if (message.validity !== 0) {
            writer.uint32(48).uint64(message.validity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetAttribute };
        message.name = [];
        message.value = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.didIdentity = reader.string();
                    break;
                case 2:
                    message.actor = reader.string();
                    break;
                case 3:
                    message.creator = reader.string();
                    break;
                case 4:
                    message.name.push(reader.string());
                    break;
                case 5:
                    message.value.push(reader.string());
                    break;
                case 6:
                    message.validity = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetAttribute };
        message.name = [];
        message.value = [];
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = String(object.didIdentity);
        }
        else {
            message.didIdentity = '';
        }
        if (object.actor !== undefined && object.actor !== null) {
            message.actor = String(object.actor);
        }
        else {
            message.actor = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.name !== undefined && object.name !== null) {
            for (const e of object.name) {
                message.name.push(String(e));
            }
        }
        if (object.value !== undefined && object.value !== null) {
            for (const e of object.value) {
                message.value.push(String(e));
            }
        }
        if (object.validity !== undefined && object.validity !== null) {
            message.validity = Number(object.validity);
        }
        else {
            message.validity = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity);
        message.actor !== undefined && (obj.actor = message.actor);
        message.creator !== undefined && (obj.creator = message.creator);
        if (message.name) {
            obj.name = message.name.map((e) => e);
        }
        else {
            obj.name = [];
        }
        if (message.value) {
            obj.value = message.value.map((e) => e);
        }
        else {
            obj.value = [];
        }
        message.validity !== undefined && (obj.validity = message.validity);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetAttribute };
        message.name = [];
        message.value = [];
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = object.didIdentity;
        }
        else {
            message.didIdentity = '';
        }
        if (object.actor !== undefined && object.actor !== null) {
            message.actor = object.actor;
        }
        else {
            message.actor = '';
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.name !== undefined && object.name !== null) {
            for (const e of object.name) {
                message.name.push(e);
            }
        }
        if (object.value !== undefined && object.value !== null) {
            for (const e of object.value) {
                message.value.push(e);
            }
        }
        if (object.validity !== undefined && object.validity !== null) {
            message.validity = object.validity;
        }
        else {
            message.validity = 0;
        }
        return message;
    }
};
const baseMsgSetAttributeResponse = { ok: false };
export const MsgSetAttributeResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetAttributeResponse };
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
        const message = { ...baseMsgSetAttributeResponse };
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
        const message = { ...baseMsgSetAttributeResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
        }
        return message;
    }
};
const baseMsgRevokeAttribute = { didIdentity: '', actor: '', creator: '' };
export const MsgRevokeAttribute = {
    encode(message, writer = Writer.create()) {
        if (message.didIdentity !== '') {
            writer.uint32(10).string(message.didIdentity);
        }
        if (message.actor !== '') {
            writer.uint32(18).string(message.actor);
        }
        if (message.name.length !== 0) {
            writer.uint32(26).bytes(message.name);
        }
        if (message.value.length !== 0) {
            writer.uint32(34).bytes(message.value);
        }
        if (message.creator !== '') {
            writer.uint32(42).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRevokeAttribute };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.didIdentity = reader.string();
                    break;
                case 2:
                    message.actor = reader.string();
                    break;
                case 3:
                    message.name = reader.bytes();
                    break;
                case 4:
                    message.value = reader.bytes();
                    break;
                case 5:
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
        const message = { ...baseMsgRevokeAttribute };
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = String(object.didIdentity);
        }
        else {
            message.didIdentity = '';
        }
        if (object.actor !== undefined && object.actor !== null) {
            message.actor = String(object.actor);
        }
        else {
            message.actor = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = bytesFromBase64(object.name);
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
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
        message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity);
        message.actor !== undefined && (obj.actor = message.actor);
        message.name !== undefined && (obj.name = base64FromBytes(message.name !== undefined ? message.name : new Uint8Array()));
        message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRevokeAttribute };
        if (object.didIdentity !== undefined && object.didIdentity !== null) {
            message.didIdentity = object.didIdentity;
        }
        else {
            message.didIdentity = '';
        }
        if (object.actor !== undefined && object.actor !== null) {
            message.actor = object.actor;
        }
        else {
            message.actor = '';
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
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        return message;
    }
};
const baseMsgRevokeAttributeResponse = { ok: false };
export const MsgRevokeAttributeResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ok === true) {
            writer.uint32(8).bool(message.ok);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRevokeAttributeResponse };
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
        const message = { ...baseMsgRevokeAttributeResponse };
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
        const message = { ...baseMsgRevokeAttributeResponse };
        if (object.ok !== undefined && object.ok !== null) {
            message.ok = object.ok;
        }
        else {
            message.ok = false;
        }
        return message;
    }
};
const baseMsgTransferNFTResponse = {};
export const MsgTransferNFTResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTransferNFTResponse };
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
        const message = { ...baseMsgTransferNFTResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgTransferNFTResponse };
        return message;
    }
};
const baseMsgEditNFT = { id: '', denomId: '', name: '', uri: '', data: '', sender: '' };
export const MsgEditNFT = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.denomId !== '') {
            writer.uint32(18).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        if (message.uri !== '') {
            writer.uint32(34).string(message.uri);
        }
        if (message.data !== '') {
            writer.uint32(42).string(message.data);
        }
        if (message.sender !== '') {
            writer.uint32(50).string(message.sender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgEditNFT };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.denomId = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.uri = reader.string();
                    break;
                case 5:
                    message.data = reader.string();
                    break;
                case 6:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgEditNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.data !== undefined && (obj.data = message.data);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgEditNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        return message;
    }
};
const baseMsgEditNFTResponse = {};
export const MsgEditNFTResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgEditNFTResponse };
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
        const message = { ...baseMsgEditNFTResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgEditNFTResponse };
        return message;
    }
};
const baseMsgMintNFT = { id: '', denomId: '', name: '', uri: '', data: '', sender: '', recipient: '' };
export const MsgMintNFT = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.denomId !== '') {
            writer.uint32(18).string(message.denomId);
        }
        if (message.name !== '') {
            writer.uint32(26).string(message.name);
        }
        if (message.uri !== '') {
            writer.uint32(34).string(message.uri);
        }
        if (message.data !== '') {
            writer.uint32(42).string(message.data);
        }
        if (message.sender !== '') {
            writer.uint32(50).string(message.sender);
        }
        if (message.recipient !== '') {
            writer.uint32(58).string(message.recipient);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintNFT };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.denomId = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.uri = reader.string();
                    break;
                case 5:
                    message.data = reader.string();
                    break;
                case 6:
                    message.sender = reader.string();
                    break;
                case 7:
                    message.recipient = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.data !== undefined && (obj.data = message.data);
        message.sender !== undefined && (obj.sender = message.sender);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
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
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        return message;
    }
};
const baseMsgMintNFTResponse = {};
export const MsgMintNFTResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintNFTResponse };
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
        const message = { ...baseMsgMintNFTResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgMintNFTResponse };
        return message;
    }
};
const baseMsgBurnNFT = { id: '', denomId: '', sender: '' };
export const MsgBurnNFT = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.denomId !== '') {
            writer.uint32(18).string(message.denomId);
        }
        if (message.sender !== '') {
            writer.uint32(26).string(message.sender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBurnNFT };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.denomId = reader.string();
                    break;
                case 3:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgBurnNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = String(object.denomId);
        }
        else {
            message.denomId = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.denomId !== undefined && (obj.denomId = message.denomId);
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgBurnNFT };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.denomId !== undefined && object.denomId !== null) {
            message.denomId = object.denomId;
        }
        else {
            message.denomId = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        return message;
    }
};
const baseMsgBurnNFTResponse = {};
export const MsgBurnNFTResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBurnNFTResponse };
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
        const message = { ...baseMsgBurnNFTResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgBurnNFTResponse };
        return message;
    }
};
const baseMsgTransferDenom = { id: '', sender: '', recipient: '' };
export const MsgTransferDenom = {
    encode(message, writer = Writer.create()) {
        if (message.id !== '') {
            writer.uint32(10).string(message.id);
        }
        if (message.sender !== '') {
            writer.uint32(18).string(message.sender);
        }
        if (message.recipient !== '') {
            writer.uint32(26).string(message.recipient);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTransferDenom };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.sender = reader.string();
                    break;
                case 3:
                    message.recipient = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgTransferDenom };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.sender !== undefined && (obj.sender = message.sender);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgTransferDenom };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
        }
        return message;
    }
};
const baseMsgTransferDenomResponse = {};
export const MsgTransferDenomResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTransferDenomResponse };
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
        const message = { ...baseMsgTransferDenomResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgTransferDenomResponse };
        return message;
    }
};
const baseMsgFileMetadataResponse = {};
export const MsgFileMetadataResponse = {
    encode(message, writer = Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFileMetadataResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFileMetadataResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = bytesFromBase64(object.hash);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFileMetadataResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = new Uint8Array();
        }
        return message;
    }
};
const baseMsgMetadata = {
    creator: '',
    name: '',
    description: '',
    image: '',
    owner: '',
    parent: '',
    additionalSources: '',
    links: '',
    verifiedCredentialRef: '',
    did: '',
    from: '',
    enableIpldForestAccess: false,
    factRef: ''
};
export const MsgMetadata = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== '') {
            writer.uint32(18).string(message.name);
        }
        if (message.description !== '') {
            writer.uint32(26).string(message.description);
        }
        if (message.image !== '') {
            writer.uint32(34).string(message.image);
        }
        if (message.owner !== '') {
            writer.uint32(42).string(message.owner);
        }
        if (message.parent !== '') {
            writer.uint32(50).string(message.parent);
        }
        for (const v of message.additionalSources) {
            writer.uint32(58).string(v);
        }
        for (const v of message.links) {
            writer.uint32(66).string(v);
        }
        if (message.verifiedCredentialRef !== '') {
            writer.uint32(74).string(message.verifiedCredentialRef);
        }
        if (message.did !== '') {
            writer.uint32(82).string(message.did);
        }
        if (message.from !== '') {
            writer.uint32(90).string(message.from);
        }
        if (message.enableIpldForestAccess === true) {
            writer.uint32(96).bool(message.enableIpldForestAccess);
        }
        if (message.factRef !== '') {
            writer.uint32(106).string(message.factRef);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMetadata };
        message.additionalSources = [];
        message.links = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.image = reader.string();
                    break;
                case 5:
                    message.owner = reader.string();
                    break;
                case 6:
                    message.parent = reader.string();
                    break;
                case 7:
                    message.additionalSources.push(reader.string());
                    break;
                case 8:
                    message.links.push(reader.string());
                    break;
                case 9:
                    message.verifiedCredentialRef = reader.string();
                    break;
                case 10:
                    message.did = reader.string();
                    break;
                case 11:
                    message.from = reader.string();
                    break;
                case 12:
                    message.enableIpldForestAccess = reader.bool();
                    break;
                case 13:
                    message.factRef = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMetadata };
        message.additionalSources = [];
        message.links = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
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
        if (object.image !== undefined && object.image !== null) {
            message.image = String(object.image);
        }
        else {
            message.image = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = '';
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = String(object.parent);
        }
        else {
            message.parent = '';
        }
        if (object.additionalSources !== undefined && object.additionalSources !== null) {
            for (const e of object.additionalSources) {
                message.additionalSources.push(String(e));
            }
        }
        if (object.links !== undefined && object.links !== null) {
            for (const e of object.links) {
                message.links.push(String(e));
            }
        }
        if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
            message.verifiedCredentialRef = String(object.verifiedCredentialRef);
        }
        else {
            message.verifiedCredentialRef = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        }
        else {
            message.from = '';
        }
        if (object.enableIpldForestAccess !== undefined && object.enableIpldForestAccess !== null) {
            message.enableIpldForestAccess = Boolean(object.enableIpldForestAccess);
        }
        else {
            message.enableIpldForestAccess = false;
        }
        if (object.factRef !== undefined && object.factRef !== null) {
            message.factRef = String(object.factRef);
        }
        else {
            message.factRef = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.image !== undefined && (obj.image = message.image);
        message.owner !== undefined && (obj.owner = message.owner);
        message.parent !== undefined && (obj.parent = message.parent);
        if (message.additionalSources) {
            obj.additionalSources = message.additionalSources.map((e) => e);
        }
        else {
            obj.additionalSources = [];
        }
        if (message.links) {
            obj.links = message.links.map((e) => e);
        }
        else {
            obj.links = [];
        }
        message.verifiedCredentialRef !== undefined && (obj.verifiedCredentialRef = message.verifiedCredentialRef);
        message.did !== undefined && (obj.did = message.did);
        message.from !== undefined && (obj.from = message.from);
        message.enableIpldForestAccess !== undefined && (obj.enableIpldForestAccess = message.enableIpldForestAccess);
        message.factRef !== undefined && (obj.factRef = message.factRef);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMetadata };
        message.additionalSources = [];
        message.links = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
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
        if (object.image !== undefined && object.image !== null) {
            message.image = object.image;
        }
        else {
            message.image = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = '';
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = object.parent;
        }
        else {
            message.parent = '';
        }
        if (object.additionalSources !== undefined && object.additionalSources !== null) {
            for (const e of object.additionalSources) {
                message.additionalSources.push(e);
            }
        }
        if (object.links !== undefined && object.links !== null) {
            for (const e of object.links) {
                message.links.push(e);
            }
        }
        if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
            message.verifiedCredentialRef = object.verifiedCredentialRef;
        }
        else {
            message.verifiedCredentialRef = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        }
        else {
            message.from = '';
        }
        if (object.enableIpldForestAccess !== undefined && object.enableIpldForestAccess !== null) {
            message.enableIpldForestAccess = object.enableIpldForestAccess;
        }
        else {
            message.enableIpldForestAccess = false;
        }
        if (object.factRef !== undefined && object.factRef !== null) {
            message.factRef = object.factRef;
        }
        else {
            message.factRef = '';
        }
        return message;
    }
};
const baseMsgMetadataResponse = { cid: '' };
export const MsgMetadataResponse = {
    encode(message, writer = Writer.create()) {
        if (message.cid !== '') {
            writer.uint32(10).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMetadataResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseMsgMetadataResponse };
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
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMetadataResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        return message;
    }
};
const baseMsgFile = { creator: '', path: '', content: '', mode: '', time: '', contentType: '', did: '', from: '' };
export const MsgFile = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.path !== '') {
            writer.uint32(18).string(message.path);
        }
        if (message.content !== '') {
            writer.uint32(26).string(message.content);
        }
        if (message.mode !== '') {
            writer.uint32(34).string(message.mode);
        }
        if (message.time !== '') {
            writer.uint32(42).string(message.time);
        }
        if (message.contentType !== '') {
            writer.uint32(50).string(message.contentType);
        }
        if (message.did !== '') {
            writer.uint32(58).string(message.did);
        }
        if (message.from !== '') {
            writer.uint32(66).string(message.from);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFile };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                case 4:
                    message.mode = reader.string();
                    break;
                case 5:
                    message.time = reader.string();
                    break;
                case 6:
                    message.contentType = reader.string();
                    break;
                case 7:
                    message.did = reader.string();
                    break;
                case 8:
                    message.from = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFile };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = String(object.content);
        }
        else {
            message.content = '';
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = String(object.mode);
        }
        else {
            message.mode = '';
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = String(object.time);
        }
        else {
            message.time = '';
        }
        if (object.contentType !== undefined && object.contentType !== null) {
            message.contentType = String(object.contentType);
        }
        else {
            message.contentType = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        }
        else {
            message.from = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.path !== undefined && (obj.path = message.path);
        message.content !== undefined && (obj.content = message.content);
        message.mode !== undefined && (obj.mode = message.mode);
        message.time !== undefined && (obj.time = message.time);
        message.contentType !== undefined && (obj.contentType = message.contentType);
        message.did !== undefined && (obj.did = message.did);
        message.from !== undefined && (obj.from = message.from);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFile };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = object.content;
        }
        else {
            message.content = '';
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = '';
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = object.time;
        }
        else {
            message.time = '';
        }
        if (object.contentType !== undefined && object.contentType !== null) {
            message.contentType = object.contentType;
        }
        else {
            message.contentType = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        }
        else {
            message.from = '';
        }
        return message;
    }
};
const baseMsgFileResponse = { hash: '' };
export const MsgFileResponse = {
    encode(message, writer = Writer.create()) {
        if (message.hash !== '') {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFileResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFileResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = String(object.hash);
        }
        else {
            message.hash = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = message.hash);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFileResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = '';
        }
        return message;
    }
};
const baseMsgSendMetadataOwnership = { creator: '' };
export const MsgSendMetadataOwnership = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.data !== undefined) {
            AguaclaraPacketData.encode(message.data, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSendMetadataOwnership };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.data = AguaclaraPacketData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSendMetadataOwnership };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = AguaclaraPacketData.fromJSON(object.data);
        }
        else {
            message.data = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.data !== undefined && (obj.data = message.data ? AguaclaraPacketData.toJSON(message.data) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSendMetadataOwnership };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = AguaclaraPacketData.fromPartial(object.data);
        }
        else {
            message.data = undefined;
        }
        return message;
    }
};
const baseMsgSendMetadataOwnershipResponse = { cid: '' };
export const MsgSendMetadataOwnershipResponse = {
    encode(message, writer = Writer.create()) {
        if (message.cid !== '') {
            writer.uint32(10).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSendMetadataOwnershipResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseMsgSendMetadataOwnershipResponse };
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
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSendMetadataOwnershipResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        return message;
    }
};
const baseAguaclaraPacketData = {
    creator: '',
    tokenAddress: '',
    tokenId: '',
    didRecipient: '',
    toMetadata: '',
    hash: '',
    currentChainId: '',
    recipientChainId: ''
};
export const AguaclaraPacketData = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.tokenAddress !== '') {
            writer.uint32(18).string(message.tokenAddress);
        }
        if (message.tokenId !== '') {
            writer.uint32(26).string(message.tokenId);
        }
        if (message.didRecipient !== '') {
            writer.uint32(34).string(message.didRecipient);
        }
        if (message.toMetadata !== '') {
            writer.uint32(42).string(message.toMetadata);
        }
        if (message.hash !== '') {
            writer.uint32(50).string(message.hash);
        }
        if (message.currentChainId !== '') {
            writer.uint32(58).string(message.currentChainId);
        }
        if (message.recipientChainId !== '') {
            writer.uint32(66).string(message.recipientChainId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAguaclaraPacketData };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.tokenAddress = reader.string();
                    break;
                case 3:
                    message.tokenId = reader.string();
                    break;
                case 4:
                    message.didRecipient = reader.string();
                    break;
                case 5:
                    message.toMetadata = reader.string();
                    break;
                case 6:
                    message.hash = reader.string();
                    break;
                case 7:
                    message.currentChainId = reader.string();
                    break;
                case 8:
                    message.recipientChainId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseAguaclaraPacketData };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.tokenAddress !== undefined && object.tokenAddress !== null) {
            message.tokenAddress = String(object.tokenAddress);
        }
        else {
            message.tokenAddress = '';
        }
        if (object.tokenId !== undefined && object.tokenId !== null) {
            message.tokenId = String(object.tokenId);
        }
        else {
            message.tokenId = '';
        }
        if (object.didRecipient !== undefined && object.didRecipient !== null) {
            message.didRecipient = String(object.didRecipient);
        }
        else {
            message.didRecipient = '';
        }
        if (object.toMetadata !== undefined && object.toMetadata !== null) {
            message.toMetadata = String(object.toMetadata);
        }
        else {
            message.toMetadata = '';
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = String(object.hash);
        }
        else {
            message.hash = '';
        }
        if (object.currentChainId !== undefined && object.currentChainId !== null) {
            message.currentChainId = String(object.currentChainId);
        }
        else {
            message.currentChainId = '';
        }
        if (object.recipientChainId !== undefined && object.recipientChainId !== null) {
            message.recipientChainId = String(object.recipientChainId);
        }
        else {
            message.recipientChainId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.tokenAddress !== undefined && (obj.tokenAddress = message.tokenAddress);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        message.didRecipient !== undefined && (obj.didRecipient = message.didRecipient);
        message.toMetadata !== undefined && (obj.toMetadata = message.toMetadata);
        message.hash !== undefined && (obj.hash = message.hash);
        message.currentChainId !== undefined && (obj.currentChainId = message.currentChainId);
        message.recipientChainId !== undefined && (obj.recipientChainId = message.recipientChainId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseAguaclaraPacketData };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.tokenAddress !== undefined && object.tokenAddress !== null) {
            message.tokenAddress = object.tokenAddress;
        }
        else {
            message.tokenAddress = '';
        }
        if (object.tokenId !== undefined && object.tokenId !== null) {
            message.tokenId = object.tokenId;
        }
        else {
            message.tokenId = '';
        }
        if (object.didRecipient !== undefined && object.didRecipient !== null) {
            message.didRecipient = object.didRecipient;
        }
        else {
            message.didRecipient = '';
        }
        if (object.toMetadata !== undefined && object.toMetadata !== null) {
            message.toMetadata = object.toMetadata;
        }
        else {
            message.toMetadata = '';
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = '';
        }
        if (object.currentChainId !== undefined && object.currentChainId !== null) {
            message.currentChainId = object.currentChainId;
        }
        else {
            message.currentChainId = '';
        }
        if (object.recipientChainId !== undefined && object.recipientChainId !== null) {
            message.recipientChainId = object.recipientChainId;
        }
        else {
            message.recipientChainId = '';
        }
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    SchemaStore(request) {
        const data = MsgSchemaStore.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'SchemaStore', data);
        return promise.then((data) => MsgSchemaStoreResponse.decode(new Reader(data)));
    }
    AddDataSource(request) {
        const data = MsgAddDataSource.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'AddDataSource', data);
        return promise.then((data) => MsgAddDataSourceResponse.decode(new Reader(data)));
    }
    RemoveDataSource(request) {
        const data = MsgRemoveDataSource.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RemoveDataSource', data);
        return promise.then((data) => MsgRemoveDataSourceResponse.decode(new Reader(data)));
    }
    UpdateDataSource(request) {
        const data = MsgUpdateDataSource.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'UpdateDataSource', data);
        return promise.then((data) => MsgUpdateDataSourceResponse.decode(new Reader(data)));
    }
    AddDataUnion(request) {
        const data = MsgAddDataUnion.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'AddDataUnion', data);
        return promise.then((data) => MsgAddDataUnionResponse.decode(new Reader(data)));
    }
    RemoveDataUnion(request) {
        const data = MsgRemoveDataUnion.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RemoveDataUnion', data);
        return promise.then((data) => MsgRemoveDataUnionResponse.decode(new Reader(data)));
    }
    UpdateDataUnion(request) {
        const data = MsgUpdateDataUnion.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'UpdateDataUnion', data);
        return promise.then((data) => MsgUpdateDataUnionResponse.decode(new Reader(data)));
    }
    SendMetadataOwnership(request) {
        const data = MsgSendMetadataOwnership.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'SendMetadataOwnership', data);
        return promise.then((data) => MsgSendMetadataOwnershipResponse.decode(new Reader(data)));
    }
    CreateDid(request) {
        const data = MsgCreateDid.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'CreateDid', data);
        return promise.then((data) => MsgCreateDidResponse.decode(new Reader(data)));
    }
    UpdateDid(request) {
        const data = MsgUpdateDid.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'UpdateDid', data);
        return promise.then((data) => MsgUpdateDidResponse.decode(new Reader(data)));
    }
    RevokeDid(request) {
        const data = MsgRevokeDid.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RevokeDid', data);
        return promise.then((data) => MsgRevokeDidResponse.decode(new Reader(data)));
    }
    RoyaltyInfo(request) {
        const data = MsgRoyaltyInfo.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RoyaltyInfo', data);
        return promise.then((data) => MsgRoyaltyInfoResponse.decode(new Reader(data)));
    }
    ChangeOwner(request) {
        const data = MsgChangeOwner.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'ChangeOwner', data);
        return promise.then((data) => MsgChangeOwnerResponse.decode(new Reader(data)));
    }
    RevokeDelegate(request) {
        const data = MsgRevokeDelegate.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RevokeDelegate', data);
        return promise.then((data) => MsgRevokeDelegateResponse.decode(new Reader(data)));
    }
    GrantDelegate(request) {
        const data = MsgGrantDelegate.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'GrantDelegate', data);
        return promise.then((data) => MsgGrantDelegateResponse.decode(new Reader(data)));
    }
    GrantAttribute(request) {
        const data = MsgSetAttribute.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'GrantAttribute', data);
        return promise.then((data) => MsgSetAttributeResponse.decode(new Reader(data)));
    }
    RevokeAttribute(request) {
        const data = MsgRevokeAttribute.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RevokeAttribute', data);
        return promise.then((data) => MsgRevokeAttributeResponse.decode(new Reader(data)));
    }
    Metadata(request) {
        const data = MsgMetadata.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'Metadata', data);
        return promise.then((data) => MsgMetadataResponse.decode(new Reader(data)));
    }
    IssueDenom(request) {
        const data = MsgIssueDenom.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'IssueDenom', data);
        return promise.then((data) => MsgIssueDenomResponse.decode(new Reader(data)));
    }
    MintNFT(request) {
        const data = MsgMintNFT.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'MintNFT', data);
        return promise.then((data) => MsgMintNFTResponse.decode(new Reader(data)));
    }
    EditNFT(request) {
        const data = MsgEditNFT.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'EditNFT', data);
        return promise.then((data) => MsgEditNFTResponse.decode(new Reader(data)));
    }
    TransferNFT(request) {
        const data = MsgTransferNFT.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'TransferNFT', data);
        return promise.then((data) => MsgTransferNFTResponse.decode(new Reader(data)));
    }
    BurnNFT(request) {
        const data = MsgBurnNFT.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'BurnNFT', data);
        return promise.then((data) => MsgBurnNFTResponse.decode(new Reader(data)));
    }
    TransferDenom(request) {
        const data = MsgTransferDenom.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'TransferDenom', data);
        return promise.then((data) => MsgTransferDenomResponse.decode(new Reader(data)));
    }
    MintTrustedContent(request) {
        const data = MsgMintTrustedContent.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'MintTrustedContent', data);
        return promise.then((data) => MsgMintTrustedContentResponse.decode(new Reader(data)));
    }
    MintTrustedResource(request) {
        const data = MsgMintTrustedResource.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'MintTrustedResource', data);
        return promise.then((data) => MsgMintTrustedResourceResponse.decode(new Reader(data)));
    }
    UpdateMetadataOwnership(request) {
        const data = MsgUpdateMetadataOwnership.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'UpdateMetadataOwnership', data);
        return promise.then((data) => MsgUpdateMetadataOwnershipResponse.decode(new Reader(data)));
    }
}
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
