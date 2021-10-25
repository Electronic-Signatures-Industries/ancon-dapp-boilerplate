import {
  ethToEthermint,
  ethermintToEth,
} from '@hanchon/ethermint-address-converter'
import { createKeplrWallet } from './KeplrWrapper'
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
import {
  AuthExtension,
  BankExtension,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  SigningStargateClient,
  StargateClient,
} from '@cosmjs/stargate'
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
import {
  encodeSecp256k1Signature,
  MintExtension,
  setupMintExtension,
} from '@cosmjs/launchpad'
import Web3 from 'web3'
import { hexlify, keccak256 } from 'ethers/lib/utils'
import { MsgEthereumTxResponse } from './store/generated/tharsis/ethermint/ethermint.evm.v1/module/types/ethermint/evm/v1/tx'
import { EthCallRequest } from './store/generated/tharsis/ethermint/ethermint.evm.v1/module/types/ethermint/evm/v1/query'
import ethermintEvmV1 from './store/generated/tharsis/ethermint/ethermint.evm.v1'
import { EthAccount } from './ethAccount'
import { accountFromAny } from './accounts'
import { serialize } from '@ethersproject/transactions'

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
  /**
   * New client from mnemonic
   */
  constructor(wallet: ethers.providers.Web3Provider) {
    this.provider = wallet
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
    return this.ethAccount
    //   return ethers.utils.hexlify(pubkeyToRawAddress('secp256k1', pub))
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
    const encoded = encoder[methodName](msg)

    const fee = {
      amount: [
        {
          denom: 'aphoton',
          amount: '4',
        },
      ],
      gas: '200000',
    }
    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(this.cosmosAccount.pubkey),
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
      [{ pubkey, sequence: this.cosmosAccount.sequence }],
      fee.amount,
      gasLimit,
    )
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      'anconprotocol_9000-1',
      this.cosmosAccount.accountNumber,
    )
    const { signature, signed } = await this.offlineSigner.signDirect(
      this.cosmosAccount.address,
      signDoc,
    )
    const txsignedhex = TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    })

    // Signs Ethereum TxData
    const tx = {
      data: TxRaw.encode(txsignedhex).finish(),
      value: 0,
      chainId: evmChainId,
    }

    await callback({ sig: hexValue(tx.data) })

    const raw = await this.provider
      .getSigner()
      .signMessage(keccak256(serialize(tx)))
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

    const raw = await this.provider
      .getSigner()
      .signMessage(keccak256(serialize(tx)))
    const res = await this.provider.send('eth_sendRawTransaction', [raw])

    return res
  }
  async connect() {
    const { config, accounts, offlineSigner } = await createKeplrWallet()
    this.cosmosChainId = config.chainId
    this.rpcUrl = config.rpc
    this.apiUrl = config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    const q = QueryClient.withExtensions(
      this.tm,
      setupAuthExtension,
      setupBankExtension,
    )

    this.ethAccount = ethermintToEth(accounts[0].address)
    this.queryClient = q
    // query = setupAuthExtension(this.queryClient)
    const anyAccount = await q.auth.account(accounts[0].address)
    this.cosmosAccount = accountFromAny(anyAccount)
    this.connectedSigner = await SigningStargateClient.connectWithSigner(
      this.rpcUrl,
      offlineSigner,
      { registry, prefix: 'ethm' },
    )

    debugger
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
