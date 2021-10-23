import { createKeplrWallet } from '@/views/dashboard/pages/wallet/KeplrWrapper'
import { fromBase64 } from '@cosmjs/encoding'
import { encodeSecp256k1Pubkey } from '@cosmjs/amino'
import { Int53 } from '@cosmjs/math'
import { sha256, Secp256k1, stringToPath, pathToString } from '@cosmjs/crypto'
import {
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignBytes,
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
import { arrayify } from '@ethersproject/bytes'
import { encodeSecp256k1Signature } from '@cosmjs/launchpad'

global['fetch'] = require('node-fetch')

export class AnconWeb3Client {
  tm: Tendermint34Client

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
  /**
   * New client from mnemonic
   */
  constructor(
    private mnemonic: string,
    private provider: ethers.providers.JsonRpcProvider,
  ) {
    this.ethersclient = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0`)
    this.ethersclient.connect(this.provider)
    return this
  }

  /**
   * Gets Cosmos Account data
   * @returns
   */
  getAccountIdentity() {
    const defaultAccount = this.ethersclient.address
    return this.getEthAccountInfo(defaultAccount)
  }

  getSigner(): ethers.Signer {
    return this.ethersclient as ethers.Signer
  }

  async signAndBroadcast(
    evmChainId: number,
    methodName: string,
    msg: any,
    callback: any,
  ) {
    const defaultAccount = '0x37A232EB07A4FA8CA88FA6020F89773F6CA020A1'// this.ethersclient.address
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

    await callback({ signDoc })
    const signBytes = makeSignBytes(signDoc)

    const hashedMessage = sha256(signBytes)

    const sig = await Secp256k1.createSignature(hashedMessage, pk.privkey)
    const signatureBytes = new Uint8Array([...sig.r(32), ...sig.s(32)])
    const stdSignature = encodeSecp256k1Signature(
      Secp256k1.compressPubkey(pk.pubkey),
      signatureBytes,
    )

    const txsignedhex = TxRaw.fromPartial({
      bodyBytes: signDoc.bodyBytes,
      authInfoBytes: signDoc.authInfoBytes,
      signatures: [fromBase64(stdSignature.signature)],
    })
    // Set it to Data in a ethereum tx / SendTxArgs
    const tx = {
      data: TxRaw.encode(txsignedhex).finish(),
      value: 0,
      chainId: evmChainId,
    }

    await callback({ signDoc: null, tx, txsignedhex })
    const raw = await this.ethersclient.signTransaction({ ...tx })

    const res = await this.provider.send('ancon_sendRawTransaction', [raw])

    return res
  }

  async connect() {
    const hd = stringToPath(`m/44'/60'/0'/0`)
    const { config } = await createKeplrWallet()
    const signer = (this.offlineSigner = await DirectSecp256k1HdWallet.fromMnemonic(
      this.mnemonic,
      {
        prefix: 'ethm',
        hdPaths: [hd],
      },
    ))

    const a = pathToString(hd)

    this.cosmosChainId = config.chainId
    this.rpcUrl = config.rpc
    this.apiUrl = config.rest
    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    this.queryClient = await queryClient({
      addr: this.apiUrl,
    })

    this.connectedSigner = await SigningStargateClient.offline(signer, {
      registry,
      prefix: 'ethm',
    })
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
