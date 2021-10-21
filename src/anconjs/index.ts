import { stringToPath } from '@cosmjs/crypto'
import {
  DirectSecp256k1HdWallet, OfflineSigner,
  Registry
} from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { Subject, Subscription } from 'rxjs'
import { KeystoreDbModel, Wallet } from 'xdv-universal-wallet-core'
import {
  queryClient,
  registry, txClient
} from './store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module'
import {
  MsgFile,
  MsgFileResponse, MsgMetadataResponse
} from './store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module/types/anconprotocol/tx'

global['fetch'] = require('node-fetch')

export class AnconWeb3Client {
  wallet: Wallet
  tm: Tendermint34Client

  msgService: any
  account: any
  offlineSigner: SigningStargateClient
  ethersclient: ethers.Wallet
  connectedSigner: SigningStargateClient
  rpc: ethers.providers.JsonRpcProvider
  queryClient: any
  registry: Registry
  /**
   * Register Msg imports
   */
  constructor(
    isWeb: boolean,
    private apiUrl: string,
    private rpcUrl: string,
    private ethereumUrl: string,
    private defaultEthAddress: string,
    private defaultCosmosAddress: string,
    private web3Provider: any,
    private signer?: OfflineSigner,
  ) {
    this.wallet = new Wallet({ isWeb })
  }

  /**
   * Creates a wallet account
   * @param accountName Account name
   * @param passphrase Passphrase
   */
  /**
   * Creates a wallet
   * @param accountName Account name
   * @param passphrase Passphrase
   * @returns
   */
  async createWallet(accountName: string, passphrase: string) {
    await this.wallet.open(accountName, passphrase)

    const acct = (await this.wallet.getAccount()) as any
    let walletId: string

    if (acct.keystores.length === 0) {
      walletId = await this.wallet.addWallet()
    } else {
      walletId = acct.keystores[0].walletId
    }

    const wallet = await this.wallet.createES256K({
      passphrase: passphrase,
      walletId: walletId,
    })

    return wallet as any
  }

  /**
   * Imports an existing seed phrase
   * @param accountName Account name
   * @param passphrase Passphrase
   * @param mnemonic Seed phrase
   * @returns
   */
  async importWallet(
    accountName: string,
    passphrase: string,
    mnemonic: string,
  ) {
    await this.wallet.open(accountName, passphrase)

    const acct = (await this.wallet.getAccount()) as any

    if (acct.keystores.length > 0) {
      // already imported
      return this.wallet
    }

    const walletId = await this.wallet.addWallet({
      mnemonic,
    })

    const wallet = await this.wallet.createES256K({
      passphrase: passphrase,
      walletId: walletId,
    })

    return wallet as any
  }

  async sign(
    accountNumber: any,
    address: string,
    chainId: string,
    sequence,
    fee: any,
    encoded,
  ) {
    console.log(address, fee, accountNumber, sequence,chainId)
    const raw = await this.connectedSigner.sign(address, [encoded], fee, '', {
      accountNumber,
      sequence,
      chainId,
    })

    return TxRaw.encode(raw).finish()
  }

  async signAndBroadcast(
    chainId: string,
    evmChainId: number,
    methodName: string,
    msg: any,
    fee: any,
    defaultAccount: string,
  ) {
    const accounts = await this.signer.getAccounts()

    //const keyringAccount = { ...accounts[defaultAccountIndex] }
    const cosmosAccount = await this.getEthAccountInfo(defaultAccount)

    const encoded = this.msgService[methodName](msg)

    // curl -X GET "http://localhost:1317/ethermint/evm/v1/cosmos_account/32A21C1BB6E7C20F547E930B53DAC57F42CD25F6" -H  "accept: application/json"
    const acct = cosmosAccount.account_number
    const addr = cosmosAccount.address
    const sequence = cosmosAccount.sequence

    const txsignedhex = await this.sign(
      acct,
      addr,
      chainId,
      sequence,
      fee,
      encoded,
    )

    // Set it to Data in a ethereum tx / SendTxArgs
    const tx = {
      data: txsignedhex,
      value: 0,
      chainId: evmChainId,
    }

    const raw = await this.ethersclient.signTransaction({ ...tx })
    const res = await this.rpc.send('ancon_sendRawTransaction', [raw])

    return res
  }

  async create(accountName: string, passphrase: string, mnemonic?: string) {
    let signer = this.signer as DirectSecp256k1HdWallet
    if (!this.signer) {
      const resp = await this.wallet.open(accountName, passphrase)
      const acct = (await this.wallet.getAccount(accountName)) as any
      let walletId = ''
      if (acct.keystores.length === 0) {
        walletId = await this.wallet.addWallet({
          mnemonic,
        })
      } else {
        walletId = acct.keystores[0].walletId
      }

      const keystore = await acct.keystores.find(
        (k: KeystoreDbModel) => k.walletId === walletId,
      )
      this.rpc = new ethers.providers.Web3Provider(this.web3Provider)
      // this.ethersclient = new ethers.Wallet()
      this.ethersclient.connect(this.rpc)
      this.signer = signer = await DirectSecp256k1HdWallet.fromMnemonic(
        keystore.mnemonic,
        {
          prefix: 'ethm',
          hdPaths: [stringToPath(`m/44'/60'/0'/0`)],
        },
      )
    }

    this.tm = await Tendermint34Client.connect(this.rpcUrl)
    this.queryClient = await queryClient({
      addr: this.apiUrl,
    })
    this.connectedSigner = await SigningStargateClient.connectWithSigner(
      `ws://localhost:26657`,
      signer,
      {
        registry,
        prefix: 'ethm',
      },
    )
    this.registry = registry
    const msgCli = await txClient(signer, {
      addr: this.rpcUrl,
    })
    this.msgService = msgCli

    return this
  }

  /**
   * Add Ancon Metadata
   * @param name Identifies the asset to which this token represents.
   * @param description Describes the asset to which this token represents.
   * @param image A URI pointing to a resource with mime type image/* representing the asset to which this token represents.
   * @param sources Current intellectual property.
   * @param owner The owner is a DID identifier.
   * @param parent Direct ascendant of the current intellectual property.
   * @param verifiedCredentialRef Is the verified credential for the metadata
   * @param links Sample of references included in the current intellectual property
   * @param creator
   * @param did
   * @param from
   */
  async executeMetadata({
    name,
    description,
    image,
    sources,
    owner,
    parent,
    verifiedCredentialRef,
    links,
    creator,
    did,
    from,
    fee,
  }) {
    const metadata = {
      name: name,
      description: description,
      image: image,
      sources: sources,
      owner: owner,
      parent: parent,
      verified_credential_ref: verifiedCredentialRef,
      links: links,
      creator: creator,
      did: did,
      from: from,
    }

    const sub = new Subject<string>()
    const query = `message.action='Metadata'`

    const subscription = this.tm.subscribeTx(query).subscribe({
      next: async (log: any) => {
        try {
          // Decode response
          const res = MsgMetadataResponse.decode(log.result.data)

          // Hack: Protobuf issue
          const cid = res.cid.substring(14)
          sub.next(cid)
          sub.complete()
        } catch (err) {
          sub.error(err)
        }
      },
    }) as Subscription

    try {
      const wait = new Promise((resolve, reject) => {
        sub.subscribe({ next: (i) => resolve(i), error: (e) => reject(e) })
      })
      const encoded = this.msgService.msgMetadata(metadata)
      // hack
      encoded.value.creator = creator
      encoded.value.sources = JSON.stringify(encoded.value.sources)
      encoded.value.links = JSON.stringify(encoded.value.links)
      const tx = await this.msgService.signAndBroadcast([encoded], {
        fee,
      })
      const cid = await wait
      return { transaction: tx, cid }
    } catch (e) {
      throw e
    } finally {
      subscription.unsubscribe()
    }
  }
  /**
   * Add Ancon File
   * @param
   */
  async addFile({ did, file, fee }) {
    const sub = new Subject<string>()
    ;(file as MsgFile).did = did
    const query = `message.action='File'`

    const subscription = this.tm.subscribeTx(query).subscribe({
      next: async (log: any) => {
        try {
          // Decode response
          const res = MsgFileResponse.decode(log.result.data)

          // Hack: Protobuf issue
          const cid = res.hash.substring(10)
          sub.next(cid)
          sub.complete()
        } catch (err) {
          sub.error(err)
        }
      },
    }) as Subscription

    try {
      const wait = new Promise((resolve, reject) => {
        sub.subscribe({ next: (i) => resolve(i), error: (e) => reject(e) })
      })
      const encoded = this.msgService.msgFile(file)
      const tx = await this.msgService.signAndBroadcast([encoded], {
        fee,
      })
      const cid = await wait
      return { transaction: tx, cid }
    } catch (e) {
      throw e
    } finally {
      subscription.unsubscribe()
    }
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
