<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>

    <v-alert type="warning" dense dismissible
      >XDV 3.0 Release Candidate 2 - Codename Panama - BSC Testnet</v-alert
    >

    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
    <v-row>
      <v-col cols="1" xs="1">
        <v-progress-circular
          indeterminate
          v-if="loading"
          color="primary"
        ></v-progress-circular>
      </v-col>
<v-col xs="6" sm="6" offset-sm="2">
        <v-file-input
          multiple
          show-size
          chips
          label="Files"
          v-model="files"
        ></v-file-input>
      </v-col>
    </v-row><v-row>
<v-col xs="6" sm="6" offset-sm="3">
        <v-autocomplete
          v-model="select"
          :items="config" chips 
          multiple 
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" xs="12">
        <v-btn color="pink" @click="xdvifySimple" dark> Sign </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12" xs="12">
        <v-radio-group v-model="typelink.mode" mandatory row>
          <v-radio label="Onchain timestamp" value="1"></v-radio>
          <v-radio label="Non fungible token" value="2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row> -->

    <v-alert type="success" v-if="txid.length > 0" dense dismissible
      >{{ cids.length }} file(s) has been signed and uploaded</v-alert
    >
    <v-card v-if="txid.length > 0">
      <v-row dense>
        <v-col cols="12">
          <v-card color="indigo" dark>
            <v-card-title class="text-h5"> Transaction details </v-card-title>

            <v-card-text>
              <div>Tx {{ txid }}</div>
              <div>{{ reportVerify }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="shareTo(manifest)" text
                ><v-icon right dark> mdi-link </v-icon> Share
              </v-btn>
              <v-btn @click="verifyChain(manifest)" text>
                <v-icon right dark> mdi-certificate </v-icon> Verify
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="green" dark>
            <v-card-title class="text-h5"> View </v-card-title>

            <v-card-text></v-card-text>
            <v-card-actions>
              <v-btn @click="shareTo" text> Render content </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="unlockPin" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Enter PIN for hardware module</span>
        </v-card-title>

        <v-card-text>
          <v-form autocomplete="off">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  required
                  v-model="pin"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  class="input-group--focused"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="unlockPin = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="xdvifyProtected">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import {
  DIDManager,
  IPLDManager,
  Wallet,
  X509Utils,
} from "xdv-universal-wallet-core";
import { CAGOB } from "./cagob.pem";
import { CARAIZ } from "./caraiz.pem";
import { CAPC2 } from "./capc2.pem";
import { fromDagJWS } from "dids/lib/utils";
import { BigNumber, ethers } from "ethers";
import { IPFSManager } from "../wallet/IPFSManager";
import { eddsa } from "elliptic";
import { base64 } from "ethers/lib/utils";
const xdvnftAbi = require("../../../../abi/xdvnft");
const xdvAbi = require("../../../../abi/xdv.json");

@Component({
  components: {},
})
export default class SmartcardDocuments extends Vue {
  files: File[] = [];
  canUpload: boolean = false;
  loading: boolean = false;
  pin = "";
  config = [{
    text: 'Onchain timestamp',
    value: 'onchain'
  },{
    text: 'Non fungible token',
    value: 'nft'
  },{
    text: 'Simple',
    value: 'simple'
  },{
    text: 'Protected',
    value: 'protected'
  },{
    text: 'Timestamp protocol',
    value: 'tsp'
  },{
    text: 'PDF stamp',
    value: 'pdfstamp'
  }];
  select = ['simple','onchain'];     
  showPassword = false;
  uploadStatus = false;
  typelink = { mode: "2" };
  unlockPin = false;
  ipfs: any = {};
  report: unknown = {};
  cids: any = [];
  manifest: any = "";
  items: any = [];
  did = "";
  reportVerify = "";
  alertMessage = "";
  fab = false;
  selected = [0];
  cid = {};
  search = {};
  searchInput = null;
  reports = [];
  currentAccount: any;
  web3: ethers.providers.Web3Provider;
  contract: any;
  daiContract: any;
  ethersContract: any;
  ethersInstance: ethers.providers.Web3Provider;
  anchorContract: ethers.Contract;
  result: void;
  txid: any = "";
  DAIAddress: string = `0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867`;

  async mounted() {}

  openCid(cid: string) {
    const href = `https://explore.ipld.io/#/explore/${cid}`;
    window.open(
      href,
      "_blank",
      "top=500,left=100,frame=false,nodeIntegration=no,menubar=yes"
    );
  }

  async shareTo(url) {
    // @ts-ignore
    navigator.share(
      {
        title: "XDV",
        text: "Sharing this signed document that you requested",
        url,
      },
      // @ts-ignore
      {
        // @ts-ignore
        copy: true,
        email: true,
        print: true,
        sms: true,
        smessenger: true,
        // @ts-ignore
        facebook: true,
        whatsapp: true,
        twitter: true,
        linkedin: true,
        telegram: true,
        skype: true,
      }
    );
  }

  // ==========================================
  //      Verify chain
  // ==========================================
  async verifyChain(cid: string): Promise<any> {
    try {
      const res = await (this.ipfs as IPLDManager).get(cid);

      const obj = await this.ipfs?.getObject(cid);
      const decoded = fromDagJWS(res.value).split(".");
      const data = `${decoded[0]}.${decoded[1]}`;
      const sig = `${decoded[2]}`;

      let pub = obj.value.documentPubCert;
      let report = {};
      if (obj.value.alg === "ED25519") {
        // const kp = new eddsa('ed25519')
        // const kk = kp.keyFromPublic((base64.decode(obj.value.public))
        // const a = kk.verify(data, sig);
        return;
      }
      report = await X509Utils.verifyChain(
        data,
        sig,
        obj.value.documentPubCert,
        [CAGOB, CAPC2, CARAIZ]
      );

      // @ts-ignore
      this.reportVerify = report
        .map((i) => `${i.title}: ${i.subtitle}`)
        .join("<br />");
    } catch (e) {
      // TODO: log
      console.log(e);
    }
  }

  /**
   * Creates a wallet
   * @param accountName Account name
   * @param passphrase Passphrase
   * @returns
   */
  async createEphimericalWallet() {
    const accountName = "walletcorexdv";
    const passphrase = "abc123456789";
    const wallet = new Wallet({ isWeb: false });
    await wallet.open(accountName, passphrase);

    const acct = (await wallet.getAccount()) as any;
    let walletId;

    if (acct.keystores.length === 0) {
      walletId = await wallet.addWallet();
    } else {
      walletId = acct.keystores[0].walletId;
    }

    return wallet.createEd25519({
      passphrase: passphrase,
      walletId: walletId,
    });
  }

  // Stores documents and NFT
  async xdvifySimple() {
    const lnk = await this.createSimpleDocumentNode(this.files);

    if (this.typelink.mode === "1") {
      this.result = await this.anchor(lnk);
    } else {
      this.result = await this.mintNft(lnk);
    }
  }

  // Stores digitally signed documents and NFT
  async xdvifyProtected() {
    const lnk = await this.createDocumentNode(this.files);
    if (this.typelink.mode === "1") {
      this.result = await this.anchor(lnk);
    } else {
      this.result = await this.mintNft(lnk);
    }
  }
  /** Creates document node */
  async createDocumentNode(files?: File[]) {
    if (
      files.length > 0 &&
      this.pin.length === 0 &&
      this.typelink.mode === "2"
    ) {
      this.files = files;
      this.unlockPin = true;
      return;
    }
    this.unlockPin = false;
    this.canUpload = false;
    this.loading = true;
    try {
      this.cids = [];
      this.items = [];
      const didManager = new DIDManager();
      const pin = this.pin;
      const didRSA = await didManager.create3ID_PKCS11(pin);
      await didRSA.did.authenticate();

      const ipfsManager = new IPLDManager(didRSA.did);
      await ipfsManager.start(`https://ipfs.xdv.digital`);
      this.ipfs = ipfsManager;

      for (let index = 0; index < this.files.length; index++) {
        const file = this.files[index];
        const arr = await file.arrayBuffer();
        const cid = await ipfsManager.addSignedObject(new Uint8Array(arr), {
          name: file.name,
          contentType: file.type,
          lastModified: new Date(file.lastModified),
          certificate: (didRSA as any).certificate,
        } as any);
        this.cids.push({
          cid,
        });
        this.items = [
          ...this.items,
          {
            file,
            cid,
          },
        ];
        // this.reports = [
        //   ...this.reports,
        //   await this.verifyChain(cid.toString()),
        // ];
      }
      this.did = didRSA.did.id;
      const lnk = await ipfsManager.addSignedObject(
        Buffer.from(JSON.stringify({ index: true })),
        {
          alg: "RS256",
          signedFiles: this.cids,
          certificate: (didRSA as any).certificate,
        }
      );
      this.manifest = lnk.toString();
      return lnk.toString();
    } catch (e) {
      this.loading = false;
    }
    this.loading = false;
    return null;
  }

  /** Creates simple document node */
  async createSimpleDocumentNode(files?: File[]) {
    this.unlockPin = false;
    this.canUpload = false;
    this.loading = true;
    try {
      this.cids = [];
      this.items = [];
      const oneTimeWallet = await this.createEphimericalWallet();
      const didEDDSA = oneTimeWallet;
      await didEDDSA.did.authenticate();

      const ipfsManager = new IPLDManager(didEDDSA.did);
      await ipfsManager.start(`https://ipfs.xdv.digital`);
      this.ipfs = ipfsManager;
      for (let index = 0; index < this.files.length; index++) {
        const file = this.files[index];
        const arr = await file.arrayBuffer();
        const { cid } = await ipfsManager.client.add({
          path: file.name,
          content: arr,
        });
        this.cids.push({
          cid: cid.toString(),
        });
        this.items = [
          ...this.items,
          {
            file,
            cid,
          },
        ];
        // this.reports = [
        //   ...this.reports,
        //   await this.verifyChain(cid.toString()),
        // ];
      }

      this.did = didEDDSA.did.id;
      const lnk = await ipfsManager.addSignedObject(
        Buffer.from(JSON.stringify({ index: true })),
        {
          alg: "ED25519",
          publicKey: base64.encode(didEDDSA.publicKey),
          signedFiles: this.cids,
        }
      );
      this.manifest = lnk.toString();
      return lnk.toString();
    } catch (e) {
      this.loading = false;
    }
    return null;
  }

  get web3Selector() {
    // @ts-ignore
    if (window.BinanceChain) {
      // @ts-ignore
      return BinanceChain;
    } else {
      // @ts-ignore
      return window.ethereum;
    }
  }

  async mintNft(uri: string) {
    // anchor to nft
    this.currentAccount = (await this.web3Selector.enable())[0];
    this.ethersInstance = new ethers.providers.Web3Provider(this.web3Selector);

    this.daiContract = new ethers.Contract(
      xdvnftAbi.DAI.address.bsctestnet,
      xdvnftAbi.DAI.raw.abi,
      this.ethersInstance.getSigner()
    );
    this.ethersContract = new ethers.Contract(
      xdvnftAbi.XDVNFT.address.bsctestnet,
      xdvnftAbi.XDVNFT.raw.abi,
      this.ethersInstance.getSigner()
    );

    const [allowed] = await this.daiContract.functions.allowance(
      this.currentAccount,
      this.ethersContract.address
    );

    if (!(allowed as BigNumber).eq("1000000000000000000")) {
      const approve = await this.daiContract.functions.approve(
        this.ethersContract.address,
        "1000000000000000000",
        {
          gasPrice: "22000000000",
          gasLimit: 4000000,
        }
      );

      await approve.wait(1);
    }
    const txmint = await this.ethersContract.functions.mint(
      this.currentAccount,
      uri,
      {
        gasPrice: "22000000000",
        gasLimit: 400000,
      }
    );

    const log = await txmint.wait(1);
    //
    this.txid = log.blockHash;
    //     console.log(
    //       log.events[3].decode(log.events[3].data, log.events[3].topics)
    //     );
    // console.log(
    //       log.events[2].decode(log.events[2].data, log.events[2].topics)
    //     );

    // const filter = this.contract.getPastEvents("DocumentAnchored", {
    //   toBlock: "latest",
    //   fromBlock: 3,
    //   filter: { user: this.localAddress },
    // });

    // const response = await filter;
    // const blockItem = response.reverse()[0];
    // const root = await this.ipfs.getObject(
    //   this.web3.utils.hexToUtf8(blockItem.returnValues.documentURI)
    // );
    // const document = root.value;
    // console.log("ROOT VALUE", root.value);
    // console.log("document", document);
    // this.showVideo = true;
    // this.videoBase64 = root.value.content;
    this.loading = false;
  }

  async anchor(uri: string) {
    // anchor to nft
    this.currentAccount = (await this.web3Selector.enable())[0];
    this.ethersInstance = new ethers.providers.Web3Provider(this.web3Selector);

    this.daiContract = new ethers.Contract(
      this.DAIAddress,
      xdvnftAbi.DAI.raw.abi,
      this.ethersInstance.getSigner()
    );
    this.anchorContract = new ethers.Contract(
      xdvAbi.networks["97"].address,
      xdvAbi.abi,
      this.ethersInstance.getSigner()
    );

    const [allowed] = await this.daiContract.functions.allowance(
      this.currentAccount,
      this.anchorContract.address
    );

    if (!(allowed as BigNumber).eq("1000000000000000000")) {
      const approve = await this.daiContract.functions.approve(
        this.anchorContract.address,
        "1000000000000000000",
        {
          gasPrice: "22000000000",
          gasLimit: 4000000,
        }
      );

      await approve.wait(1);
    }

    const document = await this.anchorContract.functions.addDocument(
      `did:ethr:${this.currentAccount}`,
      uri,
      "anchoring",
      [this.currentAccount],
      {
        gasPrice: "22000000000",
        gasLimit: 400000,
      }
    );

    const log = await document.wait(1);
    this.txid = log.blockHash;
    this.loading = false;
  }
  async printPdf() {}
}
</script>
