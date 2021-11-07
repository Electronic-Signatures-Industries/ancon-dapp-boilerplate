import { AuthInfo, TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { fromBase64 } from '@cosmjs/encoding'
import { encodeSecp256k1Pubkey } from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import {
  EncodeObject,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
} from '@cosmjs/proto-signing'
import {
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
} from '@cosmjs/stargate'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import fetch from 'node-fetch'
import { Keplr, Key } from '@keplr-wallet/types'
import config from './anconConfig'
import { BroadcastMode } from '@cosmjs/launchpad'
import { hexlify } from '@ethersproject/bytes'
export { AnconWeb3Provider } from './anconProvider'
global['fetch'] = require('node-fetch')

/**
 * CosmJS Web3 Provider compatible with Keplr and Metamask
 */
export class CosmJSWeb3Provider {
  tm: Tendermint34Client
  public static HD_PATH = "m/44'/60'/0'/0/0"

  queryClient: any

  apiUrl: string
  rpcUrl: string
  cosmosChainId: any

  cosmosAccount: Key
  ethAccount: string
  evmChainId: number

  keplr: Keplr
  /**
   * New client from mnemonic
   */
  constructor(
    chainId: string,
    evmChainId: number,

    keplr: Keplr,
  ) {
    this.cosmosChainId = chainId
    this.keplr = keplr
    this.evmChainId = evmChainId

    return this
  }

  /**
   * Sign and broadcast dual chain (EVM / Cosmos), used only for Cosmos Msgs
   * @param msg Message to encode
   * @param fee Fee
   * @returns
   */
  async signAndBroadcast(msg: EncodeObject, fee: any) {

    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(this.cosmosAccount.pubKey),
    )
    const txBodyEncodeObject = TxBody.fromPartial({
      messages: [msg],
      memo: '',
    })

    const { sequence, account_number } = await this.getEthAccountInfo(
      this.ethAccount,
    )
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
    )
    
    const { signature, signed } = await this.keplr.signDirect(
      this.cosmosChainId,
      this.cosmosAccount.bech32Address,
      {
        bodyBytes: TxBody.encode(txBodyEncodeObject).finish(),
        authInfoBytes,
        chainId: this.cosmosChainId,                
        accountNumber: account_number,
      }      
    )

    const tx = TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    })
    return this.keplr.sendTx(
      this.cosmosChainId,
      TxRaw.encode(tx).finish(),
      BroadcastMode.Sync,
    )
  }

  /**
   * Connects provider
   * @returns
   */
  async connect(queryClientFromModule: any) {
    this.rpcUrl = config.rpc
    this.apiUrl = config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    const q = QueryClient.withExtensions(
      this.tm,
      setupAuthExtension,
      setupBankExtension,
    )
    this.cosmosAccount = await this.keplr.getKey(this.cosmosChainId)
    this.ethAccount = hexlify(this.cosmosAccount.address)
    this.queryClient = await queryClientFromModule({
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
