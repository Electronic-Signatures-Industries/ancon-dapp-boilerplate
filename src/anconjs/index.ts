import { Registry } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ethers } from "ethers";
import fetch from "node-fetch";
import { Subject, Subscription } from "rxjs";
import { Wallet } from "xdv-universal-wallet-core";
import {
  queryClient,
  txClient,
} from "./store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module";
import {
  MsgFile,
  MsgFileResponse,
  MsgMetadataResponse,
} from "./store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module/types/anconprotocol/tx";

global["fetch"] = require("node-fetch");

export interface MathWalletSigner {
  getIdentity(prefix: any): MathIdentityResponse;
  forgetIdentity(): any;
  requestSignature(transaction: any, network: any): any;
  requestArbitrarySignature(
    account: any,
    message: any,
    title: string,
    onOff: boolean
  ): any;
}

export interface MathIdentityResponse {
  account: string;
  blockchain: string;
}

export class AnconWeb3Client {
  wallet: Wallet;
  tm: Tendermint34Client;

  msgService: any;
  account: any;
  offlineSigner: SigningStargateClient;
  ethersclient: ethers.Wallet;
  connectedSigner: SigningStargateClient;
  rpc: ethers.providers.JsonRpcProvider;
  queryClient: any;
  registry: Registry;
  mathWalletNetwork: any;
  /**
   * Register Msg imports
   */
  constructor(
    isWeb: boolean,
    private apiUrl: string,
    private rpcUrl: string,
    private web3Provider: any,
    private mathProvider: MathWalletSigner
  ) {
    this.wallet = new Wallet({ isWeb });
    this.mathWalletNetwork = {
      blockchain: "ethm",
    };
  }

  getAccountIdentity() {
    return this.mathProvider.getIdentity(this.mathWalletNetwork);
  }

  // async sign(
  //   accountNumber: any,
  //   address: string,
  //   chainId: string,
  //   sequence,
  //   fee: any,
  //   encoded,
  // ) {
  //   console.log(address, fee, accountNumber, sequence,chainId)

  //   const raw = await this.connectedSigner.sign(address, [encoded], fee, '', {
  //     accountNumber,
  //     sequence,
  //     chainId,
  //   })

  //   return TxRaw.encode(raw).finish()
  // }

  async signAndBroadcast(
    chainId: string,
    evmChainId: number,
    methodName: string,
    msg: any,
    fee: any
  ) {
    // const accounts = await this.signer.getAccounts()
    const defaultAccount = this.web3Provider.defaultAccount;
    //const keyringAccount = { ...accounts[defaultAccountIndex] }
    const cosmosAccount = await this.getEthAccountInfo(defaultAccount);

    const encoded = this.msgService[methodName](msg);

    // curl -X GET "http://localhost:1317/ethermint/evm/v1/cosmos_account/32A21C1BB6E7C20F547E930B53DAC57F42CD25F6" -H  "accept: application/json"
    const acct = cosmosAccount.account_number;
    const addr = cosmosAccount.address;
    const sequence = cosmosAccount.sequence;

    const txsignedhex = await this.mathProvider.requestArbitrarySignature(
      cosmosAccount,
      encoded,
      "Signing Cosmos Tx",
      false
    );

    // Set it to Data in a ethereum tx / SendTxArgs
    const tx = {
      data: txsignedhex,
      value: 0,
      chainId: evmChainId,
    };

    const raw = await this.ethersclient.signTransaction({ ...tx });
    const res = await this.rpc.send("ancon_sendRawTransaction", [raw]);

    return res;
  }

  async connect() {
    this.tm = await Tendermint34Client.connect(this.rpcUrl);
    this.queryClient = await queryClient({
      addr: this.apiUrl,
    });

    //@ts-ignore
    const msgCli = await txClient(
      {},
      {
        addr: this.rpcUrl,
      }
    );

    this.msgService = msgCli;

    return this;
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
    };

    const sub = new Subject<string>();
    const query = `message.action='Metadata'`;

    const subscription = this.tm.subscribeTx(query).subscribe({
      next: async (log: any) => {
        try {
          // Decode response
          const res = MsgMetadataResponse.decode(log.result.data);

          // Hack: Protobuf issue
          const cid = res.cid.substring(14);
          sub.next(cid);
          sub.complete();
        } catch (err) {
          sub.error(err);
        }
      },
    }) as Subscription;

    try {
      const wait = new Promise((resolve, reject) => {
        sub.subscribe({ next: (i) => resolve(i), error: (e) => reject(e) });
      });
      const encoded = this.msgService.msgMetadata(metadata);
      // hack
      encoded.value.creator = creator;
      encoded.value.sources = JSON.stringify(encoded.value.sources);
      encoded.value.links = JSON.stringify(encoded.value.links);
      const tx = await this.msgService.signAndBroadcast([encoded], {
        fee,
      });
      const cid = await wait;
      return { transaction: tx, cid };
    } catch (e) {
      throw e;
    } finally {
      subscription.unsubscribe();
    }
  }
  /**
   * Add Ancon File
   * @param
   */
  async addFile({ did, file, fee }) {
    const sub = new Subject<string>();
    (file as MsgFile).did = did;
    const query = `message.action='File'`;

    const subscription = this.tm.subscribeTx(query).subscribe({
      next: async (log: any) => {
        try {
          // Decode response
          const res = MsgFileResponse.decode(log.result.data);

          // Hack: Protobuf issue
          const cid = res.hash.substring(10);
          sub.next(cid);
          sub.complete();
        } catch (err) {
          sub.error(err);
        }
      },
    }) as Subscription;

    try {
      const wait = new Promise((resolve, reject) => {
        sub.subscribe({ next: (i) => resolve(i), error: (e) => reject(e) });
      });
      const encoded = this.msgService.msgFile(file);
      const tx = await this.msgService.signAndBroadcast([encoded], {
        fee,
      });
      const cid = await wait;
      return { transaction: tx, cid };
    } catch (e) {
      throw e;
    } finally {
      subscription.unsubscribe();
    }
  }

  async getEthAccountInfo(defaultEthAddress: string): Promise<any> {
    const res = await (
      await fetch(
        this.apiUrl + `/ethermint/evm/v1/cosmos_account/` + defaultEthAddress
      )
    ).json();
    console.log("RES JSON ", res);
    //const temp = res[0]
    return { ...res, address: res.cosmos_address };
  }
}
