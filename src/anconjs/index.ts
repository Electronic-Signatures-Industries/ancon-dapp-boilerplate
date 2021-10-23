import { createKeplrWallet } from '@/views/dashboard/pages/wallet/KeplrWrapper'
import { fromBase64 } from '@cosmjs/encoding'
import { encodeSecp256k1Pubkey } from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import { stringToPath } from '@cosmjs/crypto'
import {
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
  Registry,
} from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { Wallet } from 'xdv-universal-wallet-core'
import {
  encoder,
  queryClient,
  registry,
} from './store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module'

global['fetch'] = require('node-fetch')

export interface MathWalletSigner {
  getIdentity(prefix: any): MathIdentityResponse
  forgetIdentity(): any
  requestSignature(transaction: any, network: any): any
  requestArbitrarySignature(
    account: any,
    message: any,
    title: string,
    onOff: boolean,
  ): any
}

export interface MathIdentityResponse {
  account: string
  blockchain: string
}

export class AnconWeb3Client {
  wallet: Wallet
  tm: Tendermint34Client

  msgService: any
  account: any
  ethersclient: ethers.Wallet
  connectedSigner: SigningStargateClient
  rpc: ethers.providers.JsonRpcProvider
  queryClient: any
  registry: Registry
  mathWalletNetwork: any
  apiUrl: string
  rpcUrl: string
  offlineSigner: any
  cosmosChainId: any
  /**
   * Register Msg imports
   */
  constructor(private web3Provider: any) {}

  getAccountIdentity() {
    const defaultAccount = this.web3Provider.defaultAccount
    return this.getEthAccountInfo(`0x37A232EB07A4FA8CA88FA6020F89773F6CA020A1`)
  }

  async signAndBroadcast(evmChainId: number, methodName: string, msg: any) {
    const defaultAccount =  `0x37A232EB07A4FA8CA88FA6020F89773F6CA020A1`//  this.web3Provider.defaultAccount
    const cosmosAccount = await this.getEthAccountInfo(defaultAccount)

    const encoded = encoder[methodName](msg)

    const acct = cosmosAccount.account_number
    const addr = cosmosAccount.address
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
    // Create Metadata Message request
    const txsignedhex = await this.connectedSigner.sign(
      addr,
      [encoded],
      fee,
      '',
      {
        accountNumber: acct,
        sequence,
        chainId: this.cosmosChainId,
      },
    )
    // Set it to Data in a ethereum tx / SendTxArgs
    const tx = {
      data: TxRaw.encode(txsignedhex).finish(),
      value: 0,
      chainId: evmChainId,
    }

    const raw = await this.ethersclient.signTransaction({ ...tx })
    const res = await this.rpc.send('ancon_sendRawTransaction', [raw])

    return res
  }

  async connect() {
    const client = await createKeplrWallet()
    this.offlineSigner = await DirectSecp256k1HdWallet.fromMnemonic(
      'lend lock kit kiss walnut flower expect text upset nut arrive hub waste stairs climb neither must crowd harvest network wife lizard shiver obtain',
      {
        prefix: 'ethm',
        hdPaths: [stringToPath(`m/44'/60'/0'/0`)],
      },
    )
    this.cosmosChainId = client.config.chainId
    this.rpcUrl = client.config.rpc
    this.apiUrl = client.config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    this.queryClient = await queryClient({
      addr: this.apiUrl,
    })

    this.rpc = new ethers.providers.JsonRpcProvider('http://ancon.did.pa:8545')
    this.ethersclient = ethers.Wallet.fromMnemonic(
      'lend lock kit kiss walnut flower expect text upset nut arrive hub waste stairs climb neither must crowd harvest network wife lizard shiver obtain',
      `m/44'/60'/0'/0`,
    )
    this.ethersclient.connect(this.rpc)
    this.connectedSigner = await SigningStargateClient.connectWithSigner(
      client.config.rpc,
      this.offlineSigner,
      {
        registry,
        prefix: 'ethm',
      },
    )
    return this
  }

  async getEthAccountInfo(defaultEthAddress: string): Promise<any> {
    const res = await (
      await fetch(
        this.apiUrl + `/ethermint/evm/v1/cosmos_account/` + defaultEthAddress,
      )
    ).json()
    console.log('RES JSON ', res)
    //const temp = res[0]
    return { ...res, address: res.cosmos_address }
  }
}
