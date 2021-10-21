/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** BaseNFT defines a non-fungible token */
export interface BaseNFT {
  id: string
  name: string
  uri: string
  data: string
  owner: string
  didOwner: string
  price: number
}

/** Denom defines a type of NFT */
export interface Denom {
  id: string
  name: string
  schema: string
  creator: string
  symbol: string
  mintRestricted: boolean
  updateRestricted: boolean
}

/** IDCollection defines a type of collection with specified ID */
export interface IDCollection {
  denomId: string
  tokenIds: string[]
}

/** Owner defines a type of owner */
export interface Owner {
  address: string
  idCollections: IDCollection[]
}

/** Collection defines a type of collection */
export interface Collection {
  denom: Denom | undefined
  nfts: BaseNFT[]
}

const baseBaseNFT: object = { id: '', name: '', uri: '', data: '', owner: '', didOwner: '', price: 0 }

export const BaseNFT = {
  encode(message: BaseNFT, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.uri !== '') {
      writer.uint32(26).string(message.uri)
    }
    if (message.data !== '') {
      writer.uint32(34).string(message.data)
    }
    if (message.owner !== '') {
      writer.uint32(42).string(message.owner)
    }
    if (message.didOwner !== '') {
      writer.uint32(50).string(message.didOwner)
    }
    if (message.price !== 0) {
      writer.uint32(56).uint64(message.price)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): BaseNFT {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseBaseNFT } as BaseNFT
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.uri = reader.string()
          break
        case 4:
          message.data = reader.string()
          break
        case 5:
          message.owner = reader.string()
          break
        case 6:
          message.didOwner = reader.string()
          break
        case 7:
          message.price = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BaseNFT {
    const message = { ...baseBaseNFT } as BaseNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = String(object.uri)
    } else {
      message.uri = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data)
    } else {
      message.data = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = String(object.didOwner)
    } else {
      message.didOwner = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price)
    } else {
      message.price = 0
    }
    return message
  },

  toJSON(message: BaseNFT): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.uri !== undefined && (obj.uri = message.uri)
    message.data !== undefined && (obj.data = message.data)
    message.owner !== undefined && (obj.owner = message.owner)
    message.didOwner !== undefined && (obj.didOwner = message.didOwner)
    message.price !== undefined && (obj.price = message.price)
    return obj
  },

  fromPartial(object: DeepPartial<BaseNFT>): BaseNFT {
    const message = { ...baseBaseNFT } as BaseNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = object.uri
    } else {
      message.uri = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = object.didOwner
    } else {
      message.didOwner = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = 0
    }
    return message
  }
}

const baseDenom: object = { id: '', name: '', schema: '', creator: '', symbol: '', mintRestricted: false, updateRestricted: false }

export const Denom = {
  encode(message: Denom, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.schema !== '') {
      writer.uint32(26).string(message.schema)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    if (message.symbol !== '') {
      writer.uint32(42).string(message.symbol)
    }
    if (message.mintRestricted === true) {
      writer.uint32(48).bool(message.mintRestricted)
    }
    if (message.updateRestricted === true) {
      writer.uint32(56).bool(message.updateRestricted)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Denom {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDenom } as Denom
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.schema = reader.string()
          break
        case 4:
          message.creator = reader.string()
          break
        case 5:
          message.symbol = reader.string()
          break
        case 6:
          message.mintRestricted = reader.bool()
          break
        case 7:
          message.updateRestricted = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Denom {
    const message = { ...baseDenom } as Denom
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.schema !== undefined && object.schema !== null) {
      message.schema = String(object.schema)
    } else {
      message.schema = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = String(object.symbol)
    } else {
      message.symbol = ''
    }
    if (object.mintRestricted !== undefined && object.mintRestricted !== null) {
      message.mintRestricted = Boolean(object.mintRestricted)
    } else {
      message.mintRestricted = false
    }
    if (object.updateRestricted !== undefined && object.updateRestricted !== null) {
      message.updateRestricted = Boolean(object.updateRestricted)
    } else {
      message.updateRestricted = false
    }
    return message
  },

  toJSON(message: Denom): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.schema !== undefined && (obj.schema = message.schema)
    message.creator !== undefined && (obj.creator = message.creator)
    message.symbol !== undefined && (obj.symbol = message.symbol)
    message.mintRestricted !== undefined && (obj.mintRestricted = message.mintRestricted)
    message.updateRestricted !== undefined && (obj.updateRestricted = message.updateRestricted)
    return obj
  },

  fromPartial(object: DeepPartial<Denom>): Denom {
    const message = { ...baseDenom } as Denom
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.schema !== undefined && object.schema !== null) {
      message.schema = object.schema
    } else {
      message.schema = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol
    } else {
      message.symbol = ''
    }
    if (object.mintRestricted !== undefined && object.mintRestricted !== null) {
      message.mintRestricted = object.mintRestricted
    } else {
      message.mintRestricted = false
    }
    if (object.updateRestricted !== undefined && object.updateRestricted !== null) {
      message.updateRestricted = object.updateRestricted
    } else {
      message.updateRestricted = false
    }
    return message
  }
}

const baseIDCollection: object = { denomId: '', tokenIds: '' }

export const IDCollection = {
  encode(message: IDCollection, writer: Writer = Writer.create()): Writer {
    if (message.denomId !== '') {
      writer.uint32(10).string(message.denomId)
    }
    for (const v of message.tokenIds) {
      writer.uint32(18).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): IDCollection {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseIDCollection } as IDCollection
    message.tokenIds = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string()
          break
        case 2:
          message.tokenIds.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): IDCollection {
    const message = { ...baseIDCollection } as IDCollection
    message.tokenIds = []
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    if (object.tokenIds !== undefined && object.tokenIds !== null) {
      for (const e of object.tokenIds) {
        message.tokenIds.push(String(e))
      }
    }
    return message
  },

  toJSON(message: IDCollection): unknown {
    const obj: any = {}
    message.denomId !== undefined && (obj.denomId = message.denomId)
    if (message.tokenIds) {
      obj.tokenIds = message.tokenIds.map((e) => e)
    } else {
      obj.tokenIds = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<IDCollection>): IDCollection {
    const message = { ...baseIDCollection } as IDCollection
    message.tokenIds = []
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    if (object.tokenIds !== undefined && object.tokenIds !== null) {
      for (const e of object.tokenIds) {
        message.tokenIds.push(e)
      }
    }
    return message
  }
}

const baseOwner: object = { address: '' }

export const Owner = {
  encode(message: Owner, writer: Writer = Writer.create()): Writer {
    if (message.address !== '') {
      writer.uint32(10).string(message.address)
    }
    for (const v of message.idCollections) {
      IDCollection.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Owner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOwner } as Owner
    message.idCollections = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string()
          break
        case 2:
          message.idCollections.push(IDCollection.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Owner {
    const message = { ...baseOwner } as Owner
    message.idCollections = []
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address)
    } else {
      message.address = ''
    }
    if (object.idCollections !== undefined && object.idCollections !== null) {
      for (const e of object.idCollections) {
        message.idCollections.push(IDCollection.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Owner): unknown {
    const obj: any = {}
    message.address !== undefined && (obj.address = message.address)
    if (message.idCollections) {
      obj.idCollections = message.idCollections.map((e) => (e ? IDCollection.toJSON(e) : undefined))
    } else {
      obj.idCollections = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<Owner>): Owner {
    const message = { ...baseOwner } as Owner
    message.idCollections = []
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address
    } else {
      message.address = ''
    }
    if (object.idCollections !== undefined && object.idCollections !== null) {
      for (const e of object.idCollections) {
        message.idCollections.push(IDCollection.fromPartial(e))
      }
    }
    return message
  }
}

const baseCollection: object = {}

export const Collection = {
  encode(message: Collection, writer: Writer = Writer.create()): Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.nfts) {
      BaseNFT.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Collection {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseCollection } as Collection
    message.nfts = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32())
          break
        case 2:
          message.nfts.push(BaseNFT.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Collection {
    const message = { ...baseCollection } as Collection
    message.nfts = []
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = Denom.fromJSON(object.denom)
    } else {
      message.denom = undefined
    }
    if (object.nfts !== undefined && object.nfts !== null) {
      for (const e of object.nfts) {
        message.nfts.push(BaseNFT.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Collection): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined)
    if (message.nfts) {
      obj.nfts = message.nfts.map((e) => (e ? BaseNFT.toJSON(e) : undefined))
    } else {
      obj.nfts = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<Collection>): Collection {
    const message = { ...baseCollection } as Collection
    message.nfts = []
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = Denom.fromPartial(object.denom)
    } else {
      message.denom = undefined
    }
    if (object.nfts !== undefined && object.nfts !== null) {
      for (const e of object.nfts) {
        message.nfts.push(BaseNFT.fromPartial(e))
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
