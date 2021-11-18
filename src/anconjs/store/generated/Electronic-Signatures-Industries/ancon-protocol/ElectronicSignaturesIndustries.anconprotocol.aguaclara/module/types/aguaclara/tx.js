/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
import { AguaclaraPacketData } from '../aguaclara/packet';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.aguaclara';
const baseMsgSendMetadataOwnership = { creator: '', portId: '', channelId: '' };
export const MsgSendMetadataOwnership = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.portId !== '') {
            writer.uint32(18).string(message.portId);
        }
        if (message.channelId !== '') {
            writer.uint32(26).string(message.channelId);
        }
        if (message.data !== undefined) {
            AguaclaraPacketData.encode(message.data, writer.uint32(34).fork()).ldelim();
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
                    message.portId = reader.string();
                    break;
                case 3:
                    message.channelId = reader.string();
                    break;
                case 4:
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
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = String(object.portId);
        }
        else {
            message.portId = '';
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = '';
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
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
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
        if (object.portId !== undefined && object.portId !== null) {
            message.portId = object.portId;
        }
        else {
            message.portId = '';
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = object.channelId;
        }
        else {
            message.channelId = '';
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
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    SendMetadataOwnership(request) {
        const data = MsgSendMetadataOwnership.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.aguaclara.Msg', 'SendMetadataOwnership', data);
        return promise.then((data) => MsgSendMetadataOwnershipResponse.decode(new Reader(data)));
    }
}
