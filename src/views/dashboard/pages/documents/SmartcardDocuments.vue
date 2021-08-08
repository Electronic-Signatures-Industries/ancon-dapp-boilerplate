<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>

    <v-card>
      <v-tabs background-color="pink accent-4" dark v-model="tabIndex">
        <v-tab v-for="item in tabitems" :key="item.key">
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabIndex">
        <v-tab-item v-for="item in tabitems" :key="item.key">
          <v-card flat>
            <v-card-text>
              <v-alert :type="alertType" v-if="alertMessage">{{
                alertMessage
              }}</v-alert>
              <v-row>
                <v-col offset-sm="9"
                  ><cryptoicon symbol="bnb" size="24" />{{
                    balances.bnb
                  }}</v-col
                >
                <v-col
                  ><cryptoicon symbol="usdc" size="24" />{{
                    balances.dai
                  }}</v-col
                >
              </v-row>
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
                    v-if="item.settings.signing !== 'pades'"
                    show-size
                    chips
                    label="Files"
                    v-model="files"
                  ></v-file-input>
                  <v-file-input
                    multiple
                    v-if="item.settings.signing === 'pades'"
                    show-size
                    chips
                    :accept="item.settings.signing.contentType"
                    label="PDF Documents"
                    v-model="files"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="12">
                  <v-radio-group v-model="typelink.mode" mandatory row>
                    <v-radio label="Onchain timestamp" value="1"></v-radio>
                    <v-radio label="Non fungible token" value="2"></v-radio>
                    <v-radio
                      label="Only decentralized storage"
                      value="3"
                    ></v-radio>
                  </v-radio-group>
                  <v-checkbox
                    v-model="emulateSmartcard"
                    label="Emulate Smartcard"
                    v-if="item.settings.signing == 'pkcsjwt'"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="center" xs="12">
                  <v-btn
                    color="green"
                    v-if="connected === false"
                    @click="web3Connect"
                    dark
                  >
                    Connect
                  </v-btn>
                  <v-btn
                    :disabled="files.length === 0"
                    v-if="connected"
                    @click="xdvify"
                    color="primary"
                  >
                    Sign
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-card>
      <v-tabs
        background-color="deep-purple accent-4"
        dark
        v-model="tabDetailIndex"
      >
        <v-tab v-for="item in tabDetailItems" :key="item.key">
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabDetailIndex">
        <v-tab-item key="details">
          <v-alert type="success" v-if="txid.length > 0" dense dismissible
            >{{ cids.length }} file(s) has been signed and uploaded</v-alert
          >
          <v-card>
            <v-row dense>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="text-h5">
                    Transaction details
                  </v-card-title>

                  <v-card-text v-if="!!cidindex">
                    <div>No transactions</div>
                  </v-card-text>
                  <v-card-text v-if="!!cidindex">
                    <div>Tx {{ txid }}</div>
                    <div>IPLD index {{ cidindex }}</div>

                    <v-row
                      ><v-col>
                        <v-simple-table dense md="10">
                          <template v-slot:default>
                            <!-- <thead>
                              <tr>
                                <th>CID</th>
                                <th>Content Type</th>
                                <th>Name</th>
                              </tr>
                            </thead> -->
                            <tbody>
                              <tr
                                v-for="item in reportVerify"
                                :key="item.title"
                              >
                                <td>
                                  {{ item.title }}
                                </td>
                                <td>
                                  {{ item.subtitle }}
                                </td>
                                <td>
                                  {{ item.name }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-simple-table dense md="10">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th>CID</th>
                                <th>Content Type</th>
                                <th>Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item in viewItems.signedFiles"
                                :key="item.cid"
                              >
                                <td>
                                  {{ item.cid }}
                                </td>
                                <td>
                                  {{ item.contentType }}
                                </td>
                                <td>
                                  {{ item.name }}
                                </td>
                                <td>
                                  <v-btn
                                    @click="
                                      loadCid(
                                        item.cid,
                                        viewItems.type,
                                        item.name,
                                        item.contentType
                                      )
                                    "
                                    ><v-icon right dark> mdi-download </v-icon>
                                    Download</v-btn
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions v-if="!!cidindex">
                    <v-btn @click="shareTo(cidindex)" text
                      ><v-icon right dark> mdi-link </v-icon> Share
                    </v-btn>
                    <v-btn
                      @click="verifyChain(cidindex)"
                      text
                      v-if="viewItems.type === 'jwt'"
                    >
                      <v-icon right dark> mdi-certificate </v-icon> Verify
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item key="transactions">
          <v-alert type="success" v-if="txid.length > 0" dense dismissible
            >{{ cids.length }} file(s) has been signed and uploaded</v-alert
          >
          <v-card>
            <v-row dense>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="text-h5"> Transactions </v-card-title>

                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Tx</th>
                            <th class="text-left">Event</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in transactions" :key="item">
                            <td>{{ item.transactionHash }}</td>
                            <td>{{ item.event }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                  <v-card-actions>
                    <!-- <v-btn @click="shareTo" text> Render content </v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
          <v-btn color="blue darken-1" text @click="xdvify">OK</v-btn>
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
  SmartCardConnectorPKCS11,
  Wallet,
  X509Utils,
} from "xdv-universal-wallet-core";
import { CAGOB } from "./cagob.pem";
import { CARAIZ } from "./caraiz.pem";
import { CAPC2 } from "./capc2.pem";
import "share-api-polyfill";

import {
  decodeBase64,
  encodeBase64,
  encodeBase64Url,
  fromDagJWS,
} from "dids/lib/utils";
import { BigNumber, Contract, ethers } from "ethers";
import { base64, hexlify } from "ethers/lib/utils";
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
  reportVerify = [];
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
  balances = {
    bnb: "0",
    dai: "0",
    daiMock: "0",
  };
  connected = false;
  cidindex = "";
  DAIAddress: string = `0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`;
  tabIndex = null;
  tabitems = [
    {
      key: "simple",
      label: "Simple",
      settings: {
        signing: "simple",
        contentType: null,
      },
    },
    {
      key: "pkcsjwt",
      label: "Protected JWT",
      settings: {
        signing: "pkcsjwt",
        contentType: null,
      },
    },
    {
      key: "pades",
      label: "Qualified PDF",
      settings: {
        signing: "pades",
        contentType: "application/pdf",
      },
    },
  ];

  tabDetailIndex = null;
  tabDetailItems = [
    {
      key: "details",
      label: "Details",
      settings: {
        signing: "details",
        contentType: null,
      },
    },
    {
      key: "transactions",
      label: "Transactions",
      settings: {
        signing: "transactions",
        contentType: null,
      },
    },
  ];
  viewItems = [];
  transactions = [];
  emulateSmartcard = false;

  async loadTransactions() {
    if (this.ethersContract) {
      const query = this.ethersContract.filters.Transfer(this.currentAccount);
      this.transactions = [
        ...(await this.ethersContract.queryFilter(query)),
        this.transactions,
      ];
    }

    if (this.anchorContract) {
      const query = this.anchorContract.filters.DocumentAnchored();
      this.transactions = [
        ...(await this.anchorContract.queryFilter(query)),
        this.transactions,
      ];
    }
  }

  /**
   * Downloads a File object
   */
  async downloadFileFromObject(o: any, name: string, contentType: string) {
    try {
      const url = window.URL.createObjectURL(new Blob([o]));
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    } catch (e) {
      throw new Error("No se pudo convertir el archivo");
    }
  }

  /**
   * Loads a cid
   */
  async loadCid(cid: string, type: string, name: string, contentType: string) {
    function concatArrayBuffers(...bufs) {
      const result = new Uint8Array(
        bufs.reduce((totalSize, buf) => totalSize + buf.byteLength, 0)
      );
      bufs.reduce((offset, buf) => {
        result.set(buf, offset);
        return offset + buf.byteLength;
      }, 0);
      return result.buffer;
    }

    if (type === "jwt") {
      //return await this.ipfs.getObject(cid);
      const result = await this.ipfs.getObject(cid);
      const blob = base64.decode(result.value.content);

      await this.downloadFileFromObject(
        blob.buffer,
        result.value.name,
        result.value.contentType
      );
    } else if (type === "pades" || type === "simple") {
      let chunks = [];

      for await (const file of this.ipfs.client.get(cid)) {
        if (!file.content) continue;

        for await (const chunk of file.content) {
          chunks.push(chunk);
        }
      }

      const c = concatArrayBuffers(...chunks);

      await this.downloadFileFromObject(c, name, contentType);
    }
  }

  openCid(cid: string) {
    const href = `https://explore.ipld.io/#/explore/${cid}`;
    window.open(
      href,
      "_blank",
      "top=500,left=100,frame=false,nodeIntegration=no,menubar=yes"
    );
  }

  async web3Connect() {
    // @ts-ignore
    if (window.BinanceChain) {
      // @ts-ignore
      await BinanceChain.enable();
    } else {
      // @ts-ignore
      await window.ethereum.enable();
    }
    this.connected = true;
    this.currentAccount = (await this.web3Selector.enable())[0];
    this.ethersInstance = new ethers.providers.Web3Provider(this.web3Selector);

    // DAI
    this.daiContract = new ethers.Contract(
      this.DAIAddress,
      xdvnftAbi.DAI.raw.abi,
      this.ethersInstance.getSigner()
    );
    // XDVNFT
    this.ethersContract = new ethers.Contract(
      xdvnftAbi.XDVNFT.address.bsc,
      xdvnftAbi.XDVNFT.raw.abi,
      this.ethersInstance.getSigner()
    );
    this.anchorContract = new ethers.Contract(
      xdvAbi.networks["56"].address,
      xdvAbi.abi,
      this.ethersInstance.getSigner()
    );
    await this.loadBalances();
    await this.loadTransactions();
  }

  async loadBalances() {
    setInterval(async () => {
      const [daiBal] = await this.daiContract.functions.balanceOf(
        this.currentAccount
      );

      const bnb = await this.ethersInstance.getBalance(this.currentAccount);

      this.balances.bnb = ethers.utils.formatEther(bnb);
      this.balances.dai = ethers.utils.formatEther(daiBal);
    }, 1250);
  }

  async shareTo(cid) {
    const url = `${location.href}link/${cid}`;

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

      this.reportVerify = report;
      // @ts-ignore
      // this.reportVerify = report
      //   .map((i) => `${i.title}: ${i.subtitle}`)
      //   .join("<br />");
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
  async createEphemericWallet() {
    const accountName = "walletcorexdv";
    const passphrase = "walletcorexdv";
    const wallet = new Wallet({ isWeb: false });
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  // Stores documents and NFT
  async xdvify() {
    let lnk;

    // simple
    if (this.tabIndex === 0) {
      lnk = await this.createSimpleDocumentNode(this.files);
    } else if (this.tabIndex === 1) {
      lnk = await this.createDocumentNode(this.files);
    } else if (this.tabIndex === 2) {
      lnk = await this.createPadesNode(this.files);
    }

    if (lnk && this.typelink.mode === "1") {
      this.result = await this.anchor(lnk);
    } else if (lnk && this.typelink.mode === "2") {
      this.result = await this.mintNft(lnk);
    } else {
      // none
    }

    this.cidindex = lnk;
    await this.loadViewer();
    await this.loadTransactions();
    this.loading = false;
  }

  async mounted() {
    if (this.$router.currentRoute.params.cid) {
      const oneTimeWallet = await this.createEphemericWallet();
      const didEDDSA = oneTimeWallet;
      await didEDDSA.did.authenticate();

      const ipfsManager = new IPLDManager(didEDDSA.did);
      await ipfsManager.start(`https://ipfs.xdv.digital`);
      this.ipfs = ipfsManager;

      this.cidindex = this.$router.currentRoute.params.cid || "";
      await this.loadViewer();
    }

    await this.loadTransactions();
  }

  /** Creates document node */
  async createDocumentNode(files?: File[]) {
    if (files.length > 0 && this.pin.length === 0) {
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
      let didRSA;
      if (this.emulateSmartcard){
        didRSA = await didManager.create3ID_RSA();
      }      
      else{
        didRSA = await didManager.create3ID_PKCS11(pin);
      }  
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
          name: file.name,
          contentType: file.type,
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
          type: "jwt",
          signedFiles: this.cids,
          certificate: (didRSA as any).certificate,
        }
      );
      this.manifest = lnk.toString();
      return lnk.toString();
    } catch (e) {
      this.loading = false;
      alert(e);
    }
    this.loading = false;
    return null;
  }

  /** Creates pades document node */
  async createPadesNode(files?: File[]) {
    if (files.length > 0 && this.pin.length === 0) {
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

      const sc = new SmartCardConnectorPKCS11();
      await sc.connect();
      const pin = this.pin;

      // const certs: any = await sc.getCerts("0", pin);
      // const publicPem = didManager.base64toPem(certs.publicKey);

      const oneTimeWallet = await this.createEphemericWallet();
      const didEDDSA = oneTimeWallet;
      await didEDDSA.did.authenticate();

      const ipfsManager = new IPLDManager(didEDDSA.did);
      await ipfsManager.start(`https://ipfs.xdv.digital`);
      this.ipfs = ipfsManager;

      for (let index = 0; index < this.files.length; index++) {
        const file = this.files[index];
        const arr = await file.arrayBuffer();
        // @ts-ignore
        const resp = await sc.signPades(
          pin,
          ethers.utils.base64.encode(new Uint8Array(arr))
        );
        const content = decodeBase64(resp.signedDocument);
        const { cid } = await ipfsManager.client.add({
          path: file.name,
          content,
        });
        this.cids.push({
          cid: cid.toString(),
          name: file.name,
          contentType: file.type,
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
      // MOVED TO SECRET -----------------------------------
      this.did = didEDDSA.did.id;
      const lnk = await ipfsManager.addSignedObject(
        Buffer.from(JSON.stringify({ index: true })),
        {
          alg: "ED25519",
          type: "pades",
          publicKey: base64.encode(didEDDSA.publicKey),
          signedFiles: this.cids,
        }
      );
      this.manifest = lnk.toString();
      return lnk.toString();
    } catch (e) {
      console.log(e);
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
      const oneTimeWallet = await this.createEphemericWallet();
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
          name: file.name,
          contentType: file.type,
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
          type: "simple",
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
    let gasLimit = await this.daiContract.estimateGas.approve(
      this.currentAccount,
      this.ethersContract.address
    );
    gasLimit = BigNumber.from(gasLimit).add(50000).toBigInt().toString(10);
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
          gasLimit,
        }
      );

      await approve.wait(1);
    }
    gasLimit = await this.ethersContract.estimateGas.mint(
      this.currentAccount,
      uri
    );
    gasLimit = BigNumber.from(gasLimit).add(50000).toBigInt().toString(10);

    const txmint = await this.ethersContract.functions.mint(
      this.currentAccount,
      uri,
      {
        gasPrice: "22000000000",
        gasLimit,
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

  async loadViewer() {
    if (this.ipfs && this.cidindex) {
      const res = await this.ipfs.getObject(this.cidindex);
      this.viewItems = res.value;
    }
  }

  async anchor(uri: string) {
    // anchor to nft
    let gasLimit = await this.daiContract.estimateGas.approve(
      this.currentAccount,
      this.anchorContract.address
    );
    gasLimit = BigNumber.from(gasLimit).add(50000);

    const [allowed] = await this.daiContract.functions.allowance(
      this.currentAccount,
      this.anchorContract.address
    );
    if (!(allowed as BigNumber).eq("2000000000000000000")) {
      const approve = await this.daiContract.functions.approve(
        this.anchorContract.address,
        "2000000000000000000",
        {
          gasPrice: "22000000000",
          gasLimit: gasLimit,
        }
      );

      await approve.wait(1);
    }

    gasLimit = await this.anchorContract.estimateGas.addDocument(
      `did:ethr:${this.currentAccount}`,
      uri,
      "anchoring",
      [this.currentAccount]
    );

    const document = await this.anchorContract.functions.addDocument(
      `did:ethr:${this.currentAccount}`,
      uri,
      "anchoring",
      [this.currentAccount],
      {
        gasPrice: "22000000000",
        gasLimit,
      }
    );

    const log = await document.wait(1);
    this.txid = log.blockHash;
    this.loading = false;
  }
  async printPdf() {}
}
</script>
