import { createKeplrWallet } from '@/views/dashboard/pages/wallet/KeplrWrapper'
import { fromBase64 } from '@cosmjs/encoding'
import { encodeSecp256k1Pubkey } from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import {
  ExtendedSecp256k1Signature,
  sha256,
  Secp256k1,
  stringToPath,
  pathToString,
} from '@cosmjs/crypto'
import {
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
  Registry,
} from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'
import {
  pubkeyToAddress,
  pubkeyToRawAddress,
  rawSecp256k1PubkeyToRawAddress,
  Tendermint34Client,
} from '@cosmjs/tendermint-rpc'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { ethers, Transaction } from 'ethers'
import fetch from 'node-fetch'
import { Wallet } from 'xdv-universal-wallet-core'
import {
  encoder,
  queryClient,
  registry,
} from './store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module'
import { arrayify, hexValue } from '@ethersproject/bytes'
import { encodeSecp256k1Signature } from '@cosmjs/launchpad'
import Web3 from 'web3'
import { hexlify } from 'ethers/lib/utils'

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
  provider: ethers.providers.Provider
  /**
   * New client from mnemonic
   */
  constructor(wallet: ethers.Wallet) {
    this.ethersclient = wallet
    this.provider = wallet.provider
    return this
  }

  /**
   * Gets Cosmos Account data
   * @returns
   */
  getAccountIdentity() {
    const pub = Secp256k1.compressPubkey(
      arrayify(Web3.utils.hexToBytes(this.ethersclient.publicKey)),
    )
    const defaultAccount = ethers.utils.hexlify(
      pubkeyToRawAddress('secp256k1', pub),
    )
    return this.getEthAccountInfo(defaultAccount)
  }

  /**
   * Gets Ethereum address
   * @returns
   */
  getEthAccountIdentity() {
    const pub = Secp256k1.compressPubkey(
      arrayify(Web3.utils.hexToBytes(this.ethersclient.publicKey)),
    )
    return ethers.utils.hexlify(pubkeyToRawAddress('secp256k1', pub))
  }

  /**
   * Sign and broadcast dual chain (EVM / Cosmos), used only for Cosmos Msgs
   * @param evmChainId EVM Chain id
   * @param methodName Msg name
   * @param msg Message to encode
   * @param callback UI purposes
   * @returns
   */
  async signAndBroadcast(
    evmChainId: number,
    methodName: string,
    msg: any,
    callback: any,
  ) {
    const cosmosAccount = await this.getAccountIdentity()
    const encoded = encoder[methodName](msg)

    const acct = cosmosAccount.account_number
    const sequence = cosmosAccount.sequence
    const fee = {
      amount: [
        {
          denom: 'aphoton',
          amount: '4',
        },
      ],
      gas: '200000',
    }

    const pk = await Secp256k1.makeKeypair(
      arrayify(this.ethersclient.privateKey),
    )
    // Create Metadata Message request
    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(Secp256k1.compressPubkey(pk.pubkey)),
    )
    const txBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: {
        messages: [encoded],
        memo: '',
      },
    }
    const txBodyBytes = registry.encode(txBodyEncodeObject)
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
    )

    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      this.cosmosChainId,
      acct,
    )

    const signBytes = makeSignBytes(signDoc)

    const hashedMessage = sha256(signBytes)
    await callback({ sig: hexValue(hashedMessage) })

    const sig = await Secp256k1.createSignature(hashedMessage, pk.privkey)
    const signatureBytes = new Uint8Array([
      ...sig.r(32),
      ...sig.s(32),
      //sig.recovery,
    ])
    const stdSignature = encodeSecp256k1Signature(
      Secp256k1.compressPubkey(pk.pubkey),
      signatureBytes,
    )

    const txsignedhex = TxRaw.fromPartial({
      bodyBytes: signDoc.bodyBytes,
      authInfoBytes: signDoc.authInfoBytes,
      signatures: [fromBase64(stdSignature.signature)],
    })

    // Signs Ethereum TxData
    const tx = {
      data: TxRaw.encode(txsignedhex).finish(),
      value: 0,
      chainId: evmChainId,
    }

    await callback({ sig: hexValue(tx.data) })

    const raw = await this.ethersclient.signTransaction({ ...tx })
    const res = await this.provider.send('ancon_sendRawTransaction', [raw])

    return res
  }
  async signAndBroadcastEvm(data, evmChainId, options, callback) {
    const nonce = await this.ethersclient.getTransactionCount()
  
  
    // Signs Ethereum TxData
    const tx = {
      data,
      value: 0,
      nonce,
      chainId: evmChainId,
      ...options,
    } as Transaction
 
    await callback({ sig: tx.data })

    const raw = await this.ethersclient.signTransaction({ ...tx })
    const res = await this.provider.send('eth_sendRawTransaction', [raw])

    return res
  }
  async connect() {
    const { config } = await createKeplrWallet()
    this.cosmosChainId = config.chainId
    this.rpcUrl = config.rpc
    this.apiUrl = config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    this.queryClient = await queryClient({
      addr: this.apiUrl,
    })

    return this
  }

  async getEthAccountInfo(defaultEthAddress: string): Promise<any> {
    const res = await (
      await fetch(
        this.apiUrl + `/ethermint/evm/v1/cosmos_account/` + defaultEthAddress,
      )
    ).json()

    return { ...res, address: res.cosmos_address }
  }
}
