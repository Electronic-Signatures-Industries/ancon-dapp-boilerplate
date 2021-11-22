import { ethToEvmos } from '@hanchon/ethermint-address-converter'
import { createKeplrWallet } from './KeplrWrapper'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import {
  decodeSignature,
  encodeSecp256k1Pubkey,
  encodeSecp256k1Signature,
} from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import {
  ExtendedSecp256k1Signature,
  Secp256k1Signature,
  Secp256k1,
} from '@cosmjs/crypto'
import {
  EncodeObject,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
  DirectSecp256k1HdWallet,
  Registry
} from '@cosmjs/proto-signing'
import {
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  SigningStargateClient,
} from '@cosmjs/stargate'
import {
  broadcastTxCommitSuccess,
  broadcastTxSyncSuccess,
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
  registry,
  queryClient,
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
import config from './anconConfig'
import { txClient } from 'anconjs/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module'
import { stringToPath } from '@cosmjs/crypto'

global['fetch'] = require('node-fetch')

export class AnconWeb3Client {
  tm: Tendermint34Client
  msgService: {[k: string]: {[v: string]: (...args) => any}}
  account: any
  connectedSigner: SigningStargateClient
  queryClient: any
  registry: Registry

  apiUrl: string
  rpcUrl: string
  offlineSigner: any
  cosmosChainId: any
  cosmosAccount: any
  pubkey: Uint8Array
  signer: DirectSecp256k1HdWallet
  /**
   * New client from mnemonic
   */
  constructor() {
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

  /**
   * Sign and broadcast
   * @param encoded Message to encode
   * @param fee UI purposes
   * @returns
   */
  async signAndBroadcast(encoded: any, fee: any) {
    const { account } = this.cosmosAccount

    // const pubkey = this.cosmosAccount.account.pub_key

      // const txBodyEncodeObject = {
      //   typeUrl: '/cosmos.tx.v1beta1.TxBody',
      //   value: {
      //     messages: [encoded],
      //     memo: '',
      //   },
      // } as EncodeObject
      // const txBodyBytes = registry.encode(txBodyEncodeObject)
      // const gasLimit = Int53.fromString(fee.gas).toNumber()
      // const authInfoBytes = makeAuthInfoBytes(
      //   [
      //     {
      //       pubkey,
      //       sequence: account.sequence,
      //     },
      //   ],
      //   fee.amount,
      //   gasLimit,
      //   1,
      // )
      // const signDoc = makeSignDoc(
      //   txBodyBytes,
      //   authInfoBytes,
      //   this.cosmosChainId,
      //   account.account_number,
      // )

      const params = await this.connectedSigner.getAccount(this.cosmosAccount.address)
    const Tx = await this.connectedSigner.sign(this.cosmosAccount.address, [encoded], fee, '', {
      accountNumber: params.accountNumber,
      sequence: params.sequence,
      chainId: this.cosmosChainId,
    })
    // const txsignedhex = TxRaw.fromPartial({
    //   bodyBytes: s.signed.bodyBytes,
    //   authInfoBytes: s.signed.authInfoBytes,
    //   signatures: [fromBase64(s.signature.signature)],
    // })
    const res = await this.tm.broadcastTxSync({tx: TxRaw.encode(Tx).finish()}) 
    debugger
    return broadcastTxSyncSuccess(res)

    // window.keplr.sendTx(
    //   this.cosmosChainId,
    //   TxRaw.encode(txsignedhex).finish(),
    //   BroadcastMode.Sync,
    // )
  }

  async connect(msgclients: Array<{name: string, client: any}>) {
    await createKeplrWallet()
    await window.keplr.enable(config.chainId);
    this.cosmosChainId = config.chainId
    this.rpcUrl = config.rpc
    this.apiUrl = config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    // const q = QueryClient.withExtensions(
    //   this.tm,
    //   setupAuthExtension,
    //   setupBankExtension,
    // )

    this.queryClient = await queryClient({
      addr: this.apiUrl,
    })

    this.msgService = {}

    this.signer = await DirectSecp256k1HdWallet.fromMnemonic(
      // keystore.mnemonic,
      //test dev mnemonic
      "lend lock kit kiss walnut flower expect text upset nut arrive hub waste stairs climb neither must crowd harvest network wife lizard shiver obtain",
      {
        prefix: 'cosmos',
        hdPaths: [stringToPath(`m/44'/118'/0'/0`)],
      },
    )

    this.cosmosAccount = (await this.signer.getAccounts())[0]
    
    // const signer = window.keplr.getOfflineSigner(this.cosmosChainId)
    for (const txcli of msgclients) {
      this.msgService[txcli.name] = await txcli.client(this.signer, {
        addr: this.rpcUrl,
      })
    }
    
    // const k = await window.keplr.getKey(this.cosmosChainId)
    
    // this.cosmosAccount = await this.getAccountInfo(k.bech32Address)
    // this.cosmosAccount.account.pub_key = encodePubkey(
      //   encodeSecp256k1Pubkey(Secp256k1.compressPubkey(k.pubKey)),
      // ) as any
      this.connectedSigner = await SigningStargateClient.connectWithSigner(
        this.rpcUrl,
        this.signer,
        {
          registry,
  
          prefix: 'cosmos',
        },
      )
      
    
    return this
  }

  async getAccountInfo(cosmosAddress: string): Promise<any> {
    const res2 = await (
      await fetch(
        this.apiUrl + `/cosmos/auth/v1beta1/accounts/` + cosmosAddress,
      )
    ).json()

    return { ...res2, address: res2.account.address }
  }
}
