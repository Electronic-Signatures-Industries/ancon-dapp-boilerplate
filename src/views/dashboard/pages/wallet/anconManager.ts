import IPFS from 'ipfs-core'
import { DID } from 'dids'
import { ethers } from 'ethers'
import moment from 'moment'
import IPFSClient from 'ipfs-http-client'
import { base64, keccak256 } from 'ethers/lib/utils'
import { createKeplrWallet } from './KeplrWrapper'
import { AnconClient } from 'anconjs'
import { config } from 'vue/types/umd'
import { Wallet } from 'xdv-universal-wallet-core'
import {
  MsgFileResponse,
  MsgMetadataResponse,
} from 'anconjs/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module/types/anconprotocol/tx'
const Ipld = require('ipld')
const IpfsBlockService = require('ipfs-block-service')
const multicodec = require('multicodec')

export type DocumentMetadata = any

export class AnconManager {
  anconClient: AnconClient
  anconAPI: any
  account: any

  //xdvWallet: Wallet;

  async start(passphrase: string) {
    // let xdvWallet = new Wallet({ isWeb: false });
    // debugger;
    // const walletId = xdvWallet.addWallet();

    // await xdvWallet.open("ancon_manager_acct", passphrase);

    // const acct = await xdvWallet.getAccount("ancon_manager_acct");
    const keplr = await createKeplrWallet()
    this.anconClient = new AnconClient(
      true,
      keplr.config.rest,
      keplr.config.rpc,
    )

    const wallet = this.anconClient.wallet

    this.anconAPI = await this.anconClient.create(
      'ancon_manager_acct',
      passphrase,
      passphrase,
    )
    this.account = keplr.accounts[0].address
    debugger
    this.account = 'cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6'
  }
  /**
   * Converts Blob to Keccak 256 hashAA
   * @param payload
   */
  async blobToKeccak256(payload: File): Promise<any> {
    let ab = await payload.arrayBuffer()
    let buf = new Uint8Array(ab)
    let hash = keccak256(buf)
    let content = Buffer.from(await payload.arrayBuffer())

    return { hash, content }
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
  async addAnconObjectMetadata({
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
  }) {
    const metadata = {
      name: name,
      description: description,
      image: image,
      sources: sources,
      owner: owner,
      parent: parent,
      verifiedCredentialRef: verifiedCredentialRef,
      links: links,
      creator: creator,
      did: did,
      from: from,
    }

    return this.anconClient.executeMetadata(metadata, {
      fee: {
        amount: [
          {
            denom: 'token',
            amount: '4',
          },
        ],
        gas: '2000000',
      },
    })
  }

  /**
   * Add Ancon File
   * @param
   */
  async addAnconObjectFile(did: string, payload: File) {
    let result = await this.blobToKeccak256(payload)

    const file = {
      path: payload.name,
      did: did,
      from: this.account,
      time: payload.lastModified.toString(),
      mode: '',
      content: base64.encode(result.content),
      contentType: payload.type,
      creator: this.account,
    }
    debugger
    const encoded = this.anconClient.msgService.msgFile(file)
    const x = await this.anconClient.msgService.signAndBroadcast([encoded], {
      fee: {
        amount: [
          {
            denom: 'token',
            amount: '4',
          },
        ],
        gas: '5000000',
      },
    })
    debugger
    return x
    //    return wait
  }

  /**
   * Get IPLD object
   * @param cid content id
   */
  async getObject(cid: string): Promise<any> {
    let temp = await this.anconAPI.file.get(cid)

    return temp
  }
}
