import { base64, keccak256 } from 'ethers/lib/utils'
import { AnconClient } from 'anconjs'
import { config, directive } from 'vue/types/umd'
import {
  MsgFileResponse,
  MsgMetadataResponse,
  MsgMetadataTx,
} from 'anconjs/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module/types/anconprotocol/tx'
import { firstValueFrom, Observable, Subject, Subscription } from 'rxjs'
import * as cosmosConfig from './anconConfig'

export type DocumentMetadata = any

export class AnconManager {
  anconClient: AnconClient
  anconAPI: any
  account: any
  did: any

  //xdvWallet: Wallet;

  async start(passphrase: string) {
    this.anconClient = new AnconClient(
      true,
      cosmosConfig.default.rest,
      cosmosConfig.default.rpc,
    )

    this.anconAPI = await this.anconClient.create(
      'ancon_manager_acct',
      passphrase,
      passphrase,
    )

    const wallet = this.anconClient.wallet
    const acct = (await wallet.getAccount()) as any
    const eddsa = await wallet.createEd25519({
      accountName: 'ancon_manager_accct',
      passphrase,
      walletId: acct.keystores[0].walletId,
    })
    this.did = eddsa.did
    this.account = this.anconClient.account[0].address
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
  async addMetadata({
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
      verified_credential_ref: verifiedCredentialRef,
      links: links,
      creator: creator,
      did: did,
      from: from,
    }

    const sub = new Subject<string>()
    const query = `message.action='Metadata'`

    const subscription = this.anconClient.tm.subscribeTx(query).subscribe({
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
      const encoded = this.anconClient.msgService.msgMetadata(
        metadata,
      )
      // hack
      encoded.value.creator = creator;
      encoded.value.sources = JSON.stringify(encoded.value.sources)
      encoded.value.links = JSON.stringify(encoded.value.links)
      const tx = await this.anconClient.msgService.signAndBroadcast([encoded], {
        fee: {
          amount: [
            {
              denom: 'token',
              amount: '1',
            },
          ],
          gas: '5000000',
        },
      })
      const cid = await wait
      subscription.unsubscribe()
      return { transaction: tx, cid }
    } catch (e) {
      throw e
    }
  }
  /**
   * Add Ancon File
   * @param
   */
  async addFile(did: string, payload: File) {
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
    const sub = new Subject<string>()
    const query = `message.action='File'`

    const subscription = this.anconClient.tm.subscribeTx(query).subscribe({
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
      const encoded = this.anconClient.msgService.msgFile(file)
      const tx = await this.anconClient.msgService.signAndBroadcast([encoded], {
        fee: {
          amount: [
            {
              denom: 'token',
              amount: '1',
            },
          ],
          gas: '5000000',
        },
      })
      const cid = await wait
      subscription.unsubscribe()
      return { transaction: tx, cid }
    } catch (e) {
      throw e
    }
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
