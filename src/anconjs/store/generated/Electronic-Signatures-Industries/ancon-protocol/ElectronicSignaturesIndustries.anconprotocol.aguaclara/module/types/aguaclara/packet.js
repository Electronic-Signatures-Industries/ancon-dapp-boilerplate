/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.aguaclara';
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
const baseNoData = {};
export const NoData = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseNoData };
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
        const message = { ...baseNoData };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseNoData };
        return message;
    }
};
