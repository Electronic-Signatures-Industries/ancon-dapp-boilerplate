<template>
  <v-row class="local-container">
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <v-col col-xs-6>
      <document-list
        :selectedValue.sync="selectedOnDocumentList"
        :items="items"
      >
        <template v-slot:buttons>
          <v-btn text @click="canUpload = true">
            <v-icon>mdi-text-box-plus</v-icon>
            Subir Video
          </v-btn>
          <!-- <v-tooltip top>
            <span>Send subscription link</span>
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                @click="openShareDialog(selected)"

                dark
                v-on="on"
                @click="canUpload = true"
                small
                v-if="selected && selected.type!=='did'"
                  color="red accent-4"
              >
                <v-icon>mdi-key-change</v-icon>
              </v-btn>
            </template></v-tooltip
          > -->
          <v-btn
            v-if="tab === 1 && currentItem"
            @click="shareTo(currentItem)"
            text
          >
            <v-icon>mdi-link-box-variant</v-icon>
            Compartir
          </v-btn>

          <!-- <v-tooltip top>
            <span>Send encrypted to</span>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="tab === 1 && currentItem"
                dark
                v-on="on"
                @click="openShareDialog(currentItem)"
                small
                color="red accent-4"
              >
                <v-icon>mdi-publish</v-icon>
              </v-btn>
            </template></v-tooltip
          > -->

          <!-- <v-btn
            v-if="updateWallet.linkedExternalKeystores"
            @click="openSignatureDialog()"
            text
          >
            <v-icon>mdi-file-certificate</v-icon>
            Firmar Documentos
          </v-btn> -->

          <!--
          <v-tooltip top>
            <span>Execute chain job</span>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="tab === 1 && currentItem"
                dark
                v-on="on"
                @click="openChainDialog(currentItem)"
                small
                color="red accent-4"
              >
                <v-icon>mdi-link-lock</v-icon>
              </v-btn>
            </template></v-tooltip
          > -->
        </template>
      </document-list>
    </v-col>
    <v-col>
      <video controls v-if="showVideo">
        <source type="video/mp4" :src="`data:video/mp4;base64,${videoBase64}`">
      </video>
    </v-col>

    <v-col col-xs-6>
      <v-card v-if="showDetail" class="mx-auto">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-if="currentDocument.reference.contentType">
              {{ getFileIcon(currentDocument.reference.contentType) }}
            </v-icon>
            <v-icon v-else>mdi-file</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{
              currentDocument.reference.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              currentDocument.reference.contentType
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <h3>Document detail</h3>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Hash</b>
                {{ currentDocument.reference.hash.replace("0x", "") }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Signature</b>
                {{ getSignature(currentDocument.reference) }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Has Qualified Signature</b>
                {{
                  !!currentDocument.reference.documentSignature ? "yes" : "no"
                }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Size</b> {{ currentDocument.reference.size / 1000 }} kb
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Last Modified</b>
                {{ new Date(currentDocument.reference.lastModified) }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Created</b>
                {{ new Date(1000 * currentDocument.reference.created) }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="downloadFile(currentDocument.reference, index)"
              >mdi-download</v-icon
            >
          </v-btn>
          <v-btn icon>
            <v-icon @click="shareTo(currentDocument.reference, index)"
              >mdi-share-variant</v-icon
            >
          </v-btn>
        </v-card-actions>
      </v-card>

      <event-log
        v-if="showLog"
        :documentMetadata="currentDocumentMetadata"
        :did="this.did"
        @download="downloadFile"
      />
    </v-col>

    <v-dialog v-model="setEstimateGasDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Gas</span>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <b>Costo del Gas</b> {{ estimatedGas }}
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="setEstimateGasDialog = false"
            >Rechazar</v-btn
          >
          <v-btn color="blue darken-1" text @click="confirmContract()"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <transaction-status-dialog
      :show.sync="setTransactionStatusDialog"
      :transactionStatus="transactionStatus"
      :showTransactionCancelBtn="showTransactionCancelBtn"
      :transationAddress="transationAddress"
      :ipfsId="ipfsId"
      @confirm="confirmContract()"
    />

    <xdv-upload
      :loading="loading"
      :show.sync="canUpload"
      :uploadStatus="uploadStatus"
      :files="files"
      @result="createDocumentNode"
    />

    <xdv-send
      :show="canSend"
      @input="share"
      :addresses="publicWallets"
      v-model="shareInfo.recipients"
    ></xdv-send>
  </v-row>
</template>

<style lang="scss" scoped>
.local-container {
  margin-top: 24px;
}
</style>

<script lang="ts">
import { Wallet } from "xdvplatform-wallet/src";
import { SwarmFeed } from "xdvplatform-wallet/src/swarm/feed";
import { Component, Vue, Watch } from "vue-property-decorator";
import { KeystoreIndex } from "../shared/KeystoreIndex";
import moment from "moment";
import { ethers } from "ethers";
import { SwarmNodeSignedContent } from "../shared/SwarmNodeSignedContent";
import { forkJoin, Unsubscribable, Subject, interval } from "rxjs";
import { Session } from "../shared/Session";
import {
  DriveSwarmManager,
  XVDSwarmNodeBlock,
} from "../shared/DriveSwarmManager";
import Upload from "./UploadDialog.vue";
import SendTo from "./Recipients.vue";
import { debounce, repeat, timeout } from "rxjs/operators";
import { SigningOutput } from "../shared/SigningOutput";
import { CacheService } from "../shared/CacheService";
import { IPFSManager } from "../wallet/IPFSManager";
import { DID } from "dids";
import { DriveManager } from "../wallet/DriveManager";
import EventLog from "./EventLog.vue";
import DocumentList from "./DocumentList.vue";
import TransactionStatusDialog from "./TransactionStatusDialog.vue";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import { DocumentMetadata } from "@/views/dashboard/pages/wallet/IPFSManager";
import { FileIcons } from "./FileIcons";
//@ts-ignore
import Video from 'vue-video';

@Component({
  name: "xdv-drive",
  props: [
    "updateWallet",
    "mode",
    "wallet",
    "did",
    "contract",
    "daiContract",
    "currentAddress",
    "web3",
    "ethersInstance",
    "ethersContract",
  ],
  components: {
    DocumentList,
    "xdv-upload": Upload,
    "xdv-send": SendTo,
    TransactionStatusDialog,
    EventLog,
    Video
  },
})
export default class DriveComponent extends Vue {
  loading = false;
  mode;
  loadingAutocomplete = false;
  indexjson = null;
  invalidPassword = false;
  keystore: any | Wallet = null;
  valid = false;
  form = {};
  validations: any = { password: false };
  setTransactionStatusDialog: boolean = false;
  setEstimateGasDialog: boolean = false;
  didDialog = false;
  fileDialog = false;
  files: File[] = [];
  open = false;
  fab = false;
  walletDescription = "";
  search = "";
  showPassword = false;
  password = "";
  mnemonic = [];
  showLog = false;
  documentBlock = null;
  selectedOnDocumentList = [];
  alertMessage = "";
  alertType = "";
  selectedDocument = {};
  selected = [];
  currentItem = {};
  showDetail = false;
  tableHeaderColor: {
    type: String;
    default: "";
  };
  shareDialog = false;
  shareInfo = {
    address: "",
    feed: "",
    recipients: {},
  };
  items = [];
  showMenu = false;
  selectWalletDialog = false;
  select: KeystoreIndex = {} as KeystoreIndex;
  wallets: KeystoreIndex[] = [];
  selectedItem = new SwarmNodeSignedContent();
  session = {};
  tab = 0;
  canSend = false;
  canUpload = false;
  canUnlock = false;
  canSign = false;
  publicWallets = [];
  hasCopyRef = false;
  sub: Unsubscribable;
  wallet;
  ethersInstance: any;
  ethersContract: any;
  ipfs: IPFSManager;
  contract: any;
  daiContract: any;
  did: DID;
  driveManager: DriveManager;
  web3: Web3;
  readonly currentAddress: String;
  estimatedGas = "";
  transactionStatus = "";
  showTransactionCancelBtn = false;
  transationAddress = "";
  ipfsId= "";
  showVideo=false;
  videoBase64="";
  indexes = "";
  uploadStatus = "";
  subscription: any;

  passphraseSubject: Subject<any> = new Subject();
  signManagerProps = {
    operation: "sign",
    presets: "none",
    output: { key: "XDV link", value: SigningOutput.XDVRef },
    algorithm: "",
    isBinaryEnabled: true,
    wallet: new KeystoreIndex(),
    files: [],
  };
  canView: boolean;
  canChain: boolean;
  currentDocument = {};
  allWallets: any = [];
  cache = new CacheService();
  headers = [
    { text: "Name", value: "reference.name" },
    { text: "Content Type", value: "reference.contentType" },
    { text: "Hash", value: "hash" },
    { text: "Signature", value: "signature" },
    { text: "Is Qualified Signature", value: "isQualified" },
    { text: "Last Modified", value: "lastModified" },
    { text: "Signed", value: "signed" },
    { text: "Document Type", value: "documentType" },
  ];
  didDocument: any;
  address: string;
  keystoreAddress: string = null;
  updateWallet;
  gasLimit: 4000000;

  get localAddress(): String {
    //return this.keystoreAddress ?? this.currentAddress ?? '';
    return this.currentAddress;
  }

  get currentDocumentMetadata(): DocumentMetadata | null {
    return this.documentBlock?.folder[0] || null;
  }

  getFileIcon(type: string): string {
    return FileIcons[type];
  }

  @Watch("updateWallet")
  async onUpdateWallet(prev, next) {
    this.items = [];
    await this.loadWallets();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    //await this.fetchDocuments();
  }

  async onUnlock() {
    debugger;
    await this.loadWallets();
    const ks = await this.loadSession({ reset: true });
    this.loading = true;
    this.loading = false;
  }

  async signOrVerify() {
    const ks = this.select;

    this.loading = true;
    const driveManager = new DriveSwarmManager(this.wallet);

    this.loading = false;
    this.canUpload = false;
    this.tab = 1;

    this.canSign = false;
  }
  handleCopyDIDReference(item) {
    let ref;
    if (item.didReference) {
      // copy(item.didReference.did);
      const sharedUrl = `https://app.xdv.digital/#/wallet?did=${item.didReference.did}`;

      // @ts-ignore
      navigator.share(
        {
          title: "XDV",
          text: "DID",
          url: sharedUrl,
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
      this.hasCopyRef = true;
    }
  }

  async openDetail(document) {
    Session.SharedWallet = this.wallet;
    const swarmFeed = await this.wallet.getSwarmNodeQueryable(this.address);
    const feed = await swarmFeed.bzzFeed.createManifest({
      user: swarmFeed.user,
      name: "tx-document-tree",
    });
    const hash = await swarmFeed.bzzFeed.getContentHash(feed);
    this.$router.push({
      name: "details",
      params: {
        user: this.address,
        id: hash,
      },
    });
  }

  async loadSession(options = { reset: false }) {
    this.loadingAutocomplete = true;
    const { currentKeystore } = await Session.getSessionInfo();
    if (currentKeystore && options.reset === false) {
      this.select = currentKeystore;

      // await this.wallet.open(this.select.keystore);
    } else if (this.select) {
      await Session.set({ ks: this.select } as any);
      // await this.wallet.open(this.select.keystore);
    }
    this.loadingAutocomplete = false;
    this.loading = false;
    return currentKeystore;
  }

  async mounted() {
    await this.loadWallets();
    const ks = await this.loadSession();
    if (ks) {
      this.keystoreAddress = ks.address;
    }
    this.driveManager = new DriveManager(this.ipfs, this.did);
  }

  async loadWallets() {
    const w = await Session.getWalletRefs();
    let { currentKeystore, unlock } = await Session.getSessionInfo();
    // @ts-ignore
    this.wallets = w.filter((i: KeystoreIndex) => i.address);
    this.allWallets = w;
    this.publicWallets = w.filter(
      (i: KeystoreIndex) => currentKeystore.address
    );
  }

  openSignatureDialog(item) {
    this.canSign = true;
    this.selectedDocument = item;
  }
  closeSign() {
    this.canSign = false;
  }
  openViewerDialog(item) {
    return (key) => {
      this.canView = true;
      this.selectedDocument = item;
    };
  }
  openChainDialog(item) {
    this.canChain = true;
    this.selectedDocument = item;
  }
  openShareDialog(item) {
    this.canSend = true;
    this.selectedDocument = item;
  }
  async share() {}

  async changeWallet(i: KeystoreIndex) {
    this.selectWalletDialog = true;
    this.select = i;
  }

  renderDocuments(swarmFeed: SwarmFeed) {
    return async (blocks: XVDSwarmNodeBlock[]) => {
      this.loading = true;
      this.items = [];
      const temp = {};
      const resolved = blocks.map(async (block) => {
        block.parentHash =
          block.parentHash.length === 0 ? "0" : block.parentHash;

        temp[block.parentHash] = block;
        temp[block.parentHash].id = block.block;
        temp[block.parentHash].name = `Content Block # ${block.block}`;

        const items = block.metadata.map(
          async (reference: SwarmNodeSignedContent, index) => {
            // @ts-ignore
            const s = ethers.utils.joinSignature({
              // @ts-ignore
              r: "0x" + reference.signature.r,
              // @ts-ignore
              s: "0x" + reference.signature.s,
              // @ts-ignore
              recoveryParam: reference.signature.recoveryParam,
            });
            const item = {
              _id: `${swarmFeed.user}:${block.txs}:${reference.name}`,
              contentType: reference.contentType,
              id: `${block.block}:${index}`,
              name: reference.name,
              item: { txs: block.txs, reference, index },
              type: "file_document",
              action: moment(reference.lastModified).fromNow(),
              title: reference.name,
              headline: reference.contentType,
              subtitle: `hash ${reference.hash.replace(
                "0x",
                ""
              )} signature ${s.replace("0x", "")}`,
              reference,
              hash: `${reference.hash.replace("0x", "")}`,
              signature: `${s.replace("0x", "")}`,
            };
            return item;
          }
        );
        let resolved = await forkJoin(items).toPromise();
        temp[block.parentHash].children = [...resolved];
        return true;
      });
      await forkJoin(resolved).toPromise();
      this.items = Object.values(temp).sort(
        (a: XVDSwarmNodeBlock, b: XVDSwarmNodeBlock) =>
          a.timestamp - b.timestamp
      );

      this.loading = false;
    };
  }

  @Watch("selectedOnDocumentList")
  async onTreeChanges(current, old) {
    const hasItems = current.toString().split(":");

    if (hasItems.length === 2) {
      const node = this.items.find(
        (i) => i.block.toString() === hasItems[0].toString()
      );
      const documentIndex = hasItems[1];
      if (node.children && node.children[documentIndex]) {
        this.currentDocument = node.children[documentIndex];
        this.showDetail = true;
        this.showLog = false;
      } else {
        this.currentDocument = null;
        this.showDetail = false;
        this.showLog = true;
      }
      this.documentBlock = node;
    } else {
      const node = this.items.find(
        (i) => i.id.toString() === current.toString()
      );
      this.currentDocument = null;
      this.showDetail = false;
      this.showLog = true;
      this.documentBlock = node;
    }
  }

  async shareTo(item, index) {
    const { currentKeystore } = await Session.getSessionInfo();
    const driveManager = new DriveSwarmManager(this.wallet);
    await driveManager.shareEphemeralLink(
      currentKeystore.address,
      this.documentBlock.txs,
      null,
      item.hash,
      true
    );
  }

  async downloadFile(item: DocumentMetadata) {
    this.ipfs = new IPFSManager();
    await this.ipfs.start();
    const file = await this.ipfs.getObject(item.contentRef);
    const buffer = Buffer.from(file.value.content, "base64");
    const blob = new Blob([buffer], { type: item.contentType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = item.name;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  close() {
    this.didDialog = false;
    this.fileDialog = false;
  }

  async fetchDocuments() {
    this.loading = true;
    if (this.localAddress.length > 0) {
      const filter = this.contract.getPastEvents("DocumentAnchored", {
        toBlock: "latest",
        fromBlock: 0,
        filter: { user: this.localAddress },
      });

      const response = await filter;
      this.ipfs = new IPFSManager();
      await this.ipfs.start();
      const items = response.map((item) =>
        this.ipfs.getObject(item.returnValues[2])
      );
      const forkedItems = forkJoin(items)
        .pipe(debounce((x) => x as any))
        .toPromise();

      this.items = (await forkedItems) || [];
      this.items = this.items.map((folder, i) => ({
        folder: folder.value.documents,
        id: i,
      }));
    }
    this.loading = false;
  }

  async createDocumentNode(files: File[]) {
    this.setEstimateGasDialog = false;
    this.setTransactionStatusDialog = true;
    this.showTransactionCancelBtn = false;
    this.transationAddress = "";
    this.ipfsId = "";
    this.showVideo = false;

    try {
      this.transactionStatus = "Guardando archivo...";
      this.ipfs = new IPFSManager();
      await this.ipfs.start();
      this.driveManager = new DriveManager(this.ipfs, this.did);
      console.log("files", files);
      this.indexes = await this.driveManager.createDocumentSet(files);
      this.transactionStatus = "Creando transacción en blockchain...";
      const bob = this.contract.defaultAccount;

      await this.daiContract.methods
        .approve(this.contract._address, "1000000000000000000")
        .send({
          gasPrice: "22000000000",
          gas: 400000,
          from: this.contract.defaultAccount,
        });

      const txmint = await this.contract.methods
        .mint(
          "1", // qty
          bob,
          this.did.id, //
          this.web3.utils.fromUtf8(this.indexes),
          false, // encrypted
          "xdv",
          this.did.id
        )
        .send({
          gasPrice: "22000000000",
          gas: 4000000,
          from: this.contract.defaultAccount,
        });

      //await txmint.wait(1);
      const filter = this.contract.getPastEvents("DocumentAnchored", {
        toBlock: "latest",
        fromBlock: 0,
        filter: { user: this.localAddress },
      });

      const response = await filter;
      const blockItem = response.reverse()[0];
      const cid = await this.ipfs.getObject(
        this.web3.utils.hexToUtf8(blockItem.returnValues.documentURI)
      );
      const document = cid.value.documents[0];
      console.log("document", document);
      const root = await this.ipfs.getObject(document.contentRef);
      this.showVideo = true;
      this.videoBase64 = root.value.content;

      //this.transactionStatus = "Transacción hecha con exito: " + document.transactionHash;
      this.loading = false;
      this.canUpload = false;
      this.close();
      console.log(txmint);
      this.showTransactionCancelBtn = true;
      this.transationAddress = txmint.transactionHash;
      this.ipfsId = this.indexes;
      this.transactionStatus = "";
      //await this.fetchDocuments();
    } catch (e) {
      this.transactionStatus = "Ha ocurrido un error";
      console.log("confirmation error", e);
    }
  }

  /* async createDocumentNode(files: File[]) {
    this.files = files;
    this.canUpload = false;
    this.loading = true;
    try {
      const spender = this.contract._address;
      const amount = await this.daiContract.methods
        .allowance(this.localAddress, spender)
        .call();
      const bnAmount = new BigNumber(amount);

      /*if(bnAmount.gt(0)){* /
      this.uploadStatus = "Aprobando la transaccion...";
      await this.daiContract.methods
        .approve(spender, "9000000000000000000")
        .send({
          from: this.localAddress,
          gasPrice: "22000000000",
          gas: 4000000,
        });
      /*}* /

      this.uploadStatus = "Estimando costo del gas...";
      const gas = await this.contract.methods
        .addDocument(this.did.id, this.indexes, "dummy description")
        .estimateGas();
      this.estimatedGas = gas;

      this.setEstimateGasDialog = true;
    } catch (e) {
      console.log("allowance error", e);
      this.loading = false;
    }
  } */

  getUrl(ref) {
    return `#/user/${this.$router.currentRoute.params.user}/details/${ref}`;
  }
  getSignature(item) {
    const sig = ethers.utils
      .joinSignature({
        // @ts-ignore
        r: "0x" + item.signature.r,
        // @ts-ignore
        s: "0x" + item.signature.s,
        // @ts-ignore
        recoveryParam: item.signature.recoveryParam,
      })
      .replace("0x", "");

    return `${sig.substring(0, 50)}...${sig.substring(
      sig.length - 50,
      sig.length
    )}`;
  }
}
</script>
