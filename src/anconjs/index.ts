import { ethToEvmos } from '@hanchon/ethermint-address-converter'
import { createKeplrWallet } from './KeplrWrapper'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import {
  decodeSignature,
  encodeSecp256k1Pubkey,
  encodeSecp256k1Signature,
} from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import { ExtendedSecp256k1Signature,Secp256k1Signature, Secp256k1 } from '@cosmjs/crypto'
import {
  EncodeObject,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
  Registry,
} from '@cosmjs/proto-signing'
import {
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  SigningStargateClient,
} from '@cosmjs/stargate'
import {
  pubkeyToAddress,
  pubkeyToRawAddress,
  Tendermint34Client,
} from '@cosmjs/tendermint-rpc'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { ethers, Transaction } from 'ethers'
import fetch from 'node-fetch'
import {
  hashPersonalMessage,
  ecrecover,
  ecsign,
  intToBuffer,
  intToHex,
  toRpcSig,
  toCompactSig,
  fromRpcSig,
  pubToAddress,
} from 'ethereumjs-util'
import {
  encoder,
  queryClient,
  registry,
} from './store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module'
import {
  arrayify,
  hexlify,
  joinSignature,
  splitSignature,
} from '@ethersproject/bytes'
import { Interface, keccak256, sha256 } from 'ethers/lib/utils'
import {
  computeAddress,
  serialize,
  UnsignedTransaction,
} from '@ethersproject/transactions'
import Web3 from 'web3'
import key from 'ipfs-core/src/components/key'
import { BroadcastMode, makeStdTx, StdTx } from '@cosmjs/launchpad'
import { LegacyTx } from './store/generated/tharsis/ethermint/ethermint.evm.v1'
import {
  ExtensionOptionsEthereumTx,
  MsgEthereumTx,
} from './store/generated/tharsis/ethermint/ethermint.evm.v1/module/types/ethermint/evm/v1/tx'

global['fetch'] = require('node-fetch')

export class AnconWeb3Client {
  tm: Tendermint34Client
  public static HD_PATH = "m/44'/60'/0'/0/0"
  msgService: any
  account: any
  ethersclient: ethers.Wallet
  connectedSigner: SigningStargateClient
  rpc: ethers.providers.JsonRpcProvider
  queryClient: any
  registry: Registry

  apiUrl: string
  rpcUrl: string
  offlineSigner: any
  cosmosChainId: any
  provider: ethers.providers.Web3Provider
  cosmosAccount: any
  ethAccount: string
  pubkey: Uint8Array
  sender: ethers.providers.JsonRpcProvider
  /**
   * New client from mnemonic
   */
  constructor(
    url: string,
    wallet: ethers.providers.Web3Provider,
    web3defaultAccount: string,
  ) {
    this.provider = wallet
    this.ethAccount = web3defaultAccount
    this.sender = new ethers.providers.JsonRpcProvider(url)

    return this
  }

  async getPublicKey() {
    const key = await window.keplr.getKey(this.cosmosChainId)
    console.log(
      pubkeyToAddress('secp256k1', key.pubKey),
      hexlify(key.address),
      key.bech32Address,
    )

    return key.pubKey
  }

  addContract(abi: any, address: string): { methods: {}; address: string } {
    const contract = new Interface(abi)
    const m = Object.entries(contract.functions).map((v) => {
      return {
        [v[0]]: (...values) => {
          const hex = contract.encodeFunctionData(v[1], values)
          return {
            send: async (opts, fee: any) => {
              const legtx = {
                typeUrl: '/ethermint.evm.v1.LegacyTx',
                value: LegacyTx.fromPartial({
                  ...opts,
                  gas: '200000',
                  gasPrice: '200000',
                  from: this.ethAccount,
                  to: address,
                  data: arrayify(hex),
                }),
              }
              const sig = await this.signEVM(legtx, fee)
              const tx = MsgEthereumTx.fromPartial({
                data: {
                  typeUrl: '/ethermint.evm.v1.LegacyTx',
                  value: LegacyTx.encode(
                    LegacyTx.fromPartial({
                      ...opts,
                      r: sig.r,
                      s: sig.s,

                      v: 9000*2+35,
                      //                      v: arrayify(sig.v),
                      gas: '200000',
                      gasPrice: '200000',
                      from: this.ethAccount,
                      to: address,
                      data: arrayify(hex),
                    }),
                  ).finish(),
                },
              })

              const transaction = {
                typeUrl: '/ethermint.evm.v1.MsgEthereumTx',
                value: tx,
              }

              return this.signAndBroadcast(transaction, fee)
            },
          }
        },
      }
    })
    let methods = {}
    const values = m.values()
    let item = values.next()
    while (!item.done) {
      // item.value as {[k: string]: any}

      methods = { ...methods, getters: {}, ...item.value }
      item = values.next()
    }

    return { methods: methods, address }
  }

  /**
   * Sign and broadcast dual chain (EVM / Cosmos), used only for Cosmos Msgs
   * @param evmChainId EVM Chain id
   * @param methodName Msg name
   * @param msg Message to encode
   * @param callback UI purposes
   * @returns
   */
  async signAndBroadcast(encoded: any, fee: any) {
    const { account } = await this.getEthAccountInfo(this.ethAccount)

    const pubkey = this.cosmosAccount.account.base_account.pub_key

    const txBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: {
        messages: [encoded],
        memo: '',
      },
    } as EncodeObject
    const txBodyBytes = registry.encode(txBodyEncodeObject)
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [
        {
          pubkey,
          sequence: account.base_account.sequence,
        },
      ],
      fee.amount,
      gasLimit,
      1,
    )
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      this.cosmosChainId,
      account.base_account.account_number,
    )

    const s = await window.keplr.signDirect(
      this.cosmosChainId,
      this.cosmosAccount.address,
      signDoc,
    )
    const txsignedhex = TxRaw.fromPartial({
      bodyBytes: s.signed.bodyBytes,
      authInfoBytes: s.signed.authInfoBytes,
      signatures: [fromBase64(s.signature.signature)],
    })

    return window.keplr.sendTx(
      this.cosmosChainId,
      TxRaw.encode(txsignedhex).finish(),
      BroadcastMode.Sync,
    )
  }
  async signEVM(encoded: any, fee: any) {
    const { account } = await this.getEthAccountInfo(this.ethAccount)

    const pubkey = this.cosmosAccount.account.base_account.pub_key

    const txBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: {
        messages: [encoded],
        memo: '',
      },
    } as EncodeObject
    const txBodyBytes = registry.encode(txBodyEncodeObject)
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [
        {
          pubkey,
          sequence: account.base_account.sequence,
        },
      ],
      fee.amount,
      gasLimit,
      1,
    )
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      this.cosmosChainId,
      account.base_account.account_number,
    )

    const s = await window.keplr.signDirect(
      this.cosmosChainId,
      this.cosmosAccount.address,
      signDoc,
    )

    const sig = Secp256k1Signature.fromFixedLength(decodeSignature(s.signature).signature)

    return sig.data
  }
  async connect() {
    const { config } = await createKeplrWallet()

    this.cosmosChainId = config.chainId
    this.rpcUrl = config.rpc
    this.apiUrl = config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    const q = QueryClient.withExtensions(
      this.tm,
      setupAuthExtension,
      setupBankExtension,
    )

    this.queryClient = await queryClient({
      addr: this.apiUrl,
    })

    const k = await window.keplr.getKey(this.cosmosChainId)
    this.ethAccount = hexlify(k.address)
    this.cosmosAccount = await this.getAccountInfo(k.bech32Address)
    this.cosmosAccount.account.base_account.pub_key = encodePubkey(
      encodeSecp256k1Pubkey(Secp256k1.compressPubkey(k.pubKey)),
    ) as any
    registry.register('/ethermint.evm.v1.MsgEthereumTx', MsgEthereumTx)
    registry.register('/ethermint.evm.v1.LegacyTx', LegacyTx)
    return this
  }

  async getEthAccountInfo(defaultEthAddress: string): Promise<any> {
    const res = await (
      await fetch(
        this.apiUrl + `/ethermint/evm/v1/cosmos_account/` + defaultEthAddress,
      )
    ).json()
    const res2 = await (
      await fetch(
        this.apiUrl + `/cosmos/auth/v1beta1/accounts/` + res.cosmos_address,
      )
    ).json()
    return { ...res2 }
  }

  async getAccountInfo(cosmosAddress: string): Promise<any> {
    const res2 = await (
      await fetch(
        this.apiUrl + `/cosmos/auth/v1beta1/accounts/` + cosmosAddress,
      )
    ).json()

    return { ...res2, address: res2.account.base_account.address }
  }
}
