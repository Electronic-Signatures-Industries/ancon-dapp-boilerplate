/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

export interface DIDOwner {
  didIdentity: string
  owner: string
  cid: string
  vanityName: string
}

export interface DIDWebRoute {
  name: string
  route: string
  cid: string
  didWebDeactivated: boolean
  didIdentity: string
}

export interface DIDDelegate {
  delegate: string
  delegateType: string
  validity: number
  creator: string
  didIdentity: string
}

export interface DIDAttribute {
  didIdentity: string
  name: string[]
  value: string[]
}

const baseDIDOwner: object = { didIdentity: '', owner: '', cid: '', vanityName: '' }

export const DIDOwner = {
  encode(message: DIDOwner, writer: Writer = Writer.create()): Writer {
    if (message.didIdentity !== '') {
      writer.uint32(10).string(message.didIdentity)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.cid !== '') {
      writer.uint32(26).string(message.cid)
    }
    if (message.vanityName !== '') {
      writer.uint32(34).string(message.vanityName)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DIDOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDIDOwner } as DIDOwner
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.didIdentity = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.cid = reader.string()
          break
        case 4:
          message.vanityName = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DIDOwner {
    const message = { ...baseDIDOwner } as DIDOwner
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = String(object.didIdentity)
    } else {
      message.didIdentity = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.vanityName !== undefined && object.vanityName !== null) {
      message.vanityName = String(object.vanityName)
    } else {
      message.vanityName = ''
    }
    return message
  },

  toJSON(message: DIDOwner): unknown {
    const obj: any = {}
    message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity)
    message.owner !== undefined && (obj.owner = message.owner)
    message.cid !== undefined && (obj.cid = message.cid)
    message.vanityName !== undefined && (obj.vanityName = message.vanityName)
    return obj
  },

  fromPartial(object: DeepPartial<DIDOwner>): DIDOwner {
    const message = { ...baseDIDOwner } as DIDOwner
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = object.didIdentity
    } else {
      message.didIdentity = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.vanityName !== undefined && object.vanityName !== null) {
      message.vanityName = object.vanityName
    } else {
      message.vanityName = ''
    }
    return message
  }
}

const baseDIDWebRoute: object = { name: '', route: '', cid: '', didWebDeactivated: false, didIdentity: '' }

export const DIDWebRoute = {
  encode(message: DIDWebRoute, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    if (message.route !== '') {
      writer.uint32(18).string(message.route)
    }
    if (message.cid !== '') {
      writer.uint32(26).string(message.cid)
    }
    if (message.didWebDeactivated === true) {
      writer.uint32(32).bool(message.didWebDeactivated)
    }
    if (message.didIdentity !== '') {
      writer.uint32(42).string(message.didIdentity)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DIDWebRoute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDIDWebRoute } as DIDWebRoute
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        case 2:
          message.route = reader.string()
          break
        case 3:
          message.cid = reader.string()
          break
        case 4:
          message.didWebDeactivated = reader.bool()
          break
        case 5:
          message.didIdentity = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DIDWebRoute {
    const message = { ...baseDIDWebRoute } as DIDWebRoute
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.route !== undefined && object.route !== null) {
      message.route = String(object.route)
    } else {
      message.route = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.didWebDeactivated !== undefined && object.didWebDeactivated !== null) {
      message.didWebDeactivated = Boolean(object.didWebDeactivated)
    } else {
      message.didWebDeactivated = false
    }
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = String(object.didIdentity)
    } else {
      message.didIdentity = ''
    }
    return message
  },

  toJSON(message: DIDWebRoute): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    message.route !== undefined && (obj.route = message.route)
    message.cid !== undefined && (obj.cid = message.cid)
    message.didWebDeactivated !== undefined && (obj.didWebDeactivated = message.didWebDeactivated)
    message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity)
    return obj
  },

  fromPartial(object: DeepPartial<DIDWebRoute>): DIDWebRoute {
    const message = { ...baseDIDWebRoute } as DIDWebRoute
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.route !== undefined && object.route !== null) {
      message.route = object.route
    } else {
      message.route = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.didWebDeactivated !== undefined && object.didWebDeactivated !== null) {
      message.didWebDeactivated = object.didWebDeactivated
    } else {
      message.didWebDeactivated = false
    }
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = object.didIdentity
    } else {
      message.didIdentity = ''
    }
    return message
  }
}

const baseDIDDelegate: object = { delegate: '', delegateType: '', validity: 0, creator: '', didIdentity: '' }

export const DIDDelegate = {
  encode(message: DIDDelegate, writer: Writer = Writer.create()): Writer {
    if (message.delegate !== '') {
      writer.uint32(10).string(message.delegate)
    }
    if (message.delegateType !== '') {
      writer.uint32(18).string(message.delegateType)
    }
    if (message.validity !== 0) {
      writer.uint32(24).uint64(message.validity)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    if (message.didIdentity !== '') {
      writer.uint32(42).string(message.didIdentity)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DIDDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDIDDelegate } as DIDDelegate
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.delegate = reader.string()
          break
        case 2:
          message.delegateType = reader.string()
          break
        case 3:
          message.validity = longToNumber(reader.uint64() as Long)
          break
        case 4:
          message.creator = reader.string()
          break
        case 5:
          message.didIdentity = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DIDDelegate {
    const message = { ...baseDIDDelegate } as DIDDelegate
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = String(object.delegate)
    } else {
      message.delegate = ''
    }
    if (object.delegateType !== undefined && object.delegateType !== null) {
      message.delegateType = String(object.delegateType)
    } else {
      message.delegateType = ''
    }
    if (object.validity !== undefined && object.validity !== null) {
      message.validity = Number(object.validity)
    } else {
      message.validity = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = String(object.didIdentity)
    } else {
      message.didIdentity = ''
    }
    return message
  },

  toJSON(message: DIDDelegate): unknown {
    const obj: any = {}
    message.delegate !== undefined && (obj.delegate = message.delegate)
    message.delegateType !== undefined && (obj.delegateType = message.delegateType)
    message.validity !== undefined && (obj.validity = message.validity)
    message.creator !== undefined && (obj.creator = message.creator)
    message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity)
    return obj
  },

  fromPartial(object: DeepPartial<DIDDelegate>): DIDDelegate {
    const message = { ...baseDIDDelegate } as DIDDelegate
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = object.delegate
    } else {
      message.delegate = ''
    }
    if (object.delegateType !== undefined && object.delegateType !== null) {
      message.delegateType = object.delegateType
    } else {
      message.delegateType = ''
    }
    if (object.validity !== undefined && object.validity !== null) {
      message.validity = object.validity
    } else {
      message.validity = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = object.didIdentity
    } else {
      message.didIdentity = ''
    }
    return message
  }
}

const baseDIDAttribute: object = { didIdentity: '', name: '', value: '' }

export const DIDAttribute = {
  encode(message: DIDAttribute, writer: Writer = Writer.create()): Writer {
    if (message.didIdentity !== '') {
      writer.uint32(10).string(message.didIdentity)
    }
    for (const v of message.name) {
      writer.uint32(18).string(v!)
    }
    for (const v of message.value) {
      writer.uint32(26).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DIDAttribute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDIDAttribute } as DIDAttribute
    message.name = []
    message.value = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.didIdentity = reader.string()
          break
        case 2:
          message.name.push(reader.string())
          break
        case 3:
          message.value.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DIDAttribute {
    const message = { ...baseDIDAttribute } as DIDAttribute
    message.name = []
    message.value = []
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = String(object.didIdentity)
    } else {
      message.didIdentity = ''
    }
    if (object.name !== undefined && object.name !== null) {
      for (const e of object.name) {
        message.name.push(String(e))
      }
    }
    if (object.value !== undefined && object.value !== null) {
      for (const e of object.value) {
        message.value.push(String(e))
      }
    }
    return message
  },

  toJSON(message: DIDAttribute): unknown {
    const obj: any = {}
    message.didIdentity !== undefined && (obj.didIdentity = message.didIdentity)
    if (message.name) {
      obj.name = message.name.map((e) => e)
    } else {
      obj.name = []
    }
    if (message.value) {
      obj.value = message.value.map((e) => e)
    } else {
      obj.value = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<DIDAttribute>): DIDAttribute {
    const message = { ...baseDIDAttribute } as DIDAttribute
    message.name = []
    message.value = []
    if (object.didIdentity !== undefined && object.didIdentity !== null) {
      message.didIdentity = object.didIdentity
    } else {
      message.didIdentity = ''
    }
    if (object.name !== undefined && object.name !== null) {
      for (const e of object.name) {
        message.name.push(e)
      }
    }
    if (object.value !== undefined && object.value !== null) {
      for (const e of object.value) {
        message.value.push(e)
      }
    }
    return message
  }
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
