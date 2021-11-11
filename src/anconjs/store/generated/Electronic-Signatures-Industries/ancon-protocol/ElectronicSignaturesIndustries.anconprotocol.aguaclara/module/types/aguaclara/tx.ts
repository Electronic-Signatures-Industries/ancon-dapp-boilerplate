/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { AguaclaraPacketData } from '../aguaclara/packet'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.aguaclara'

export interface MsgSendMetadataOwnership {
  creator: string
  portId: string
  channelId: string
  data: AguaclaraPacketData | undefined
}

export interface MsgSendMetadataOwnershipResponse {
  cid: string
}

const baseMsgSendMetadataOwnership: object = { creator: '', portId: '', channelId: '' }

export const MsgSendMetadataOwnership = {
  encode(message: MsgSendMetadataOwnership, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.portId !== '') {
      writer.uint32(18).string(message.portId)
    }
    if (message.channelId !== '') {
      writer.uint32(26).string(message.channelId)
    }
    if (message.data !== undefined) {
      AguaclaraPacketData.encode(message.data, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSendMetadataOwnership {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSendMetadataOwnership } as MsgSendMetadataOwnership
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.portId = reader.string()
          break
        case 3:
          message.channelId = reader.string()
          break
        case 4:
          message.data = AguaclaraPacketData.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSendMetadataOwnership {
    const message = { ...baseMsgSendMetadataOwnership } as MsgSendMetadataOwnership
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId)
    } else {
      message.portId = ''
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId)
    } else {
      message.channelId = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = AguaclaraPacketData.fromJSON(object.data)
    } else {
      message.data = undefined
    }
    return message
  },

  toJSON(message: MsgSendMetadataOwnership): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.portId !== undefined && (obj.portId = message.portId)
    message.channelId !== undefined && (obj.channelId = message.channelId)
    message.data !== undefined && (obj.data = message.data ? AguaclaraPacketData.toJSON(message.data) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSendMetadataOwnership>): MsgSendMetadataOwnership {
    const message = { ...baseMsgSendMetadataOwnership } as MsgSendMetadataOwnership
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId
    } else {
      message.portId = ''
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId
    } else {
      message.channelId = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = AguaclaraPacketData.fromPartial(object.data)
    } else {
      message.data = undefined
    }
    return message
  }
}

const baseMsgSendMetadataOwnershipResponse: object = { cid: '' }

export const MsgSendMetadataOwnershipResponse = {
  encode(message: MsgSendMetadataOwnershipResponse, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSendMetadataOwnershipResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSendMetadataOwnershipResponse } as MsgSendMetadataOwnershipResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSendMetadataOwnershipResponse {
    const message = { ...baseMsgSendMetadataOwnershipResponse } as MsgSendMetadataOwnershipResponse
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgSendMetadataOwnershipResponse): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSendMetadataOwnershipResponse>): MsgSendMetadataOwnershipResponse {
    const message = { ...baseMsgSendMetadataOwnershipResponse } as MsgSendMetadataOwnershipResponse
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /** Create ancon metadata */
  SendMetadataOwnership(request: MsgSendMetadataOwnership): Promise<MsgSendMetadataOwnershipResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  SendMetadataOwnership(request: MsgSendMetadataOwnership): Promise<MsgSendMetadataOwnershipResponse> {
    const data = MsgSendMetadataOwnership.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.aguaclara.Msg', 'SendMetadataOwnership', data)
    return promise.then((data) => MsgSendMetadataOwnershipResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
