<template>
  <v-container fluid class="down-top-padding">
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-toolbar color="black accent-4" dark v-if="mode === ''">
        <v-toolbar-title>Documents </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-slot:extension> </template>
      </v-toolbar>

      <v-row>
        <v-col col-xs-6>
          <v-treeview :active.sync="tree.data" :items="items" activatable>
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.contentType">
                {{ open ? "mdi-folder-open" : "mdi-folder" }}
              </v-icon>
              <v-icon v-else>
                {{ fileIcons[item.contentType] }}
              </v-icon>
            </template>
          </v-treeview>
        </v-col>
        <v-col col-xs-6>
          <v-card v-if="showDetail" class="mx-auto">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon v-if="currentDocument.reference.contentType">{{
                  fileIcons[currentDocument.reference.contentType]
                }}</v-icon>
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
                      !!currentDocument.reference.documentSignature
                        ? "yes"
                        : "no"
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
          <v-card class="mx-auto" v-if="showLog">
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <h3>Event log</h3>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="text--primary">
                    <b>Document Block</b> {{ documentBlock.block }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="text--primary">
                    <b>Root hash</b>
                    <a target="_blank" :href="getUrl(documentBlock.rootHash)">{{
                      documentBlock.rootHash
                    }}</a>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="text--primary">
                    <b>Parent hash</b>
                    <a
                      target="_blank"
                      :href="getUrl(documentBlock.parentHash)"
                      >{{ documentBlock.parentHash }}</a
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="text--primary">
                    <b>Content transaction reference</b> {{ documentBlock.txs }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="text--primary">
                    <b>Timestamp</b>
                    {{ new Date(1000 * documentBlock.timestamp) }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <v-btn color="red" dark small absolute bottom right fab>
            <v-speed-dial transition="slide-y" v-model="fab" direction="left"
              ><template v-slot:activator>
                <v-icon>mdi-plus</v-icon>
              </template>

              <v-tooltip top>
                <span>Upload</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="canUpload = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-text-box-plus</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

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

              <v-tooltip top>
                <span>Share link</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    v-if="tab === 1 && currentItem"
                    dark
                    v-on="on"
                    @click="shareTo(currentItem)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-link-box-variant</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <!-- <v-tooltip top>
                <span>Send encrypted to</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
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

              <v-tooltip top>
                <span>Sign documents</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    v-if="updateWallet.linkedExternalKeystores"
                    @click="openSignatureDialog()"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-file-certificate</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <!--
              <v-tooltip top>
                <span>Execute chain job</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
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
            </v-speed-dial>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- <xdv-unlock
      v-model="password"
      :wallet="wallet"
      @load="onUnlock"
    ></xdv-unlock> -->

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
            <v-btn color="blue darken-1" text @click="setEstimateGasDialog = false"
              >Rechazar</v-btn>
            <v-btn color="blue darken-1" text @click="confirmContract()"
              >Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="setTransactionStatusDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Transacción</span>
          </v-card-title>

          <v-card-text>
              <v-row>
                <v-col cols="12" md="12">
                  {{ transactionStatus }}
                </v-col>
              </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="setTransactionStatusDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="confirmContract()"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    <xdv-upload
      :loading="loading"
      :show="canUpload"
      :uploadStatus="uploadStatus"
      v-model="files"
      @input="createDocumentNode"
    ></xdv-upload>

    <xdv-send
      :show="canSend"
      @input="share"
      :addresses="publicWallets"
      v-model="shareInfo.recipients"
    ></xdv-send>

    <xdv-sign
      :wallet="wallet"
      :show="canSign"
      @input="signOrVerify"
      v-on:close="closeSign"
      v-model="signManagerProps"
    ></xdv-sign>
  </v-container>
</template>
<script lang="ts">
import {
  TypedRFE,
  Totales,
  DGen,
  Emisor,
  Receptor,
  DIDDocumentBuilder,
  LDCryptoTypes,
  DIDNodeSchema,
  DIDDocument,
  DocumentNodeSchema,
  JWTService,
  PublicKey,
} from "xdvplatform-wallet";
import { Wallet } from "xdvplatform-wallet/src";

import { SwarmFeed } from "xdvplatform-wallet/src/swarm/feed";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeystoreIndex, DIDSigner } from "../shared/KeystoreIndex";
import moment from "moment";
import { createKeyPair, sign } from "@erebos/secp256k1";
import { ethers } from "ethers";
import { arrayify } from "ethers/utils";
import { SwarmNodeSignedContent } from "../shared/SwarmNodeSignedContent";
import { forkJoin, Unsubscribable, Subject, fromEvent, of, from } from "rxjs";
import { Session } from "../shared/Session";
import { MessagingTimelineDuplexClient } from "../shared/MessagingTimelineDuplexClient";
import copy from "copy-to-clipboard";
const bs58 = require("bs58");
import {
  DriveSwarmManager,
  XVDSwarmNodeBlock,
} from "../shared/DriveSwarmManager";
import { ec } from "elliptic";
import Unlock from "./Unlock.vue";
import Upload from "./Upload.vue";
import SendTo from "./Recipients.vue";
import { SubscriptionManager } from "../shared/SubscriptionManager";
import {
  filter,
  mergeMap,
  debounce,
  debounceTime,
  groupBy,
  toArray,
} from "rxjs/operators";
import SignatureManagementDialog from "./SignatureManagementDialog.vue";
import { SigningOutput } from "../shared/SigningOutput";
import { async } from "rxjs/internal/scheduler/async";
import { CacheService } from "../shared/CacheService";
import { ShareUtils } from "../shared/ShareUtils";
import { IPFSManager } from "../wallet/IPFSManager";
import { DID } from "dids";
import { DriveManager } from "../wallet/DriveManager";
import { DIDManager } from "../wallet/DIDManager";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
const cbor = require("cbor-sync");

@Component({
  name: "xdv-drive",
  props: ["updateWallet", "mode", "wallet", "did", "contract", "daiContract", "currentAddress", "web3"],
  components: {
    "xdv-unlock": Unlock,
    "xdv-upload": Upload,
    "xdv-send": SendTo,
    "xdv-sign": SignatureManagementDialog,
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
  fileIcons = {
    "text/html": "mdi-language-html5",
    js: "mdi-nodejs",
    "application/json": "mdi-json",
    md: "mdi-markdown",
    "application/pdf": "mdi-file-pdf",
    "image/png": "mdi-file-image",
    "image/jpeg": "mdi-file-image",
    "text/text": "mdi-file-document-outline",
    xls: "mdi-file-excel",
  };
  walletDescription = "";
  search = "";
  showPassword = false;
  password = "";
  mnemonic = [];
  showLog = false;
  documentBlock = null;
  tree = {
    data: [],
  };
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
  ipfs: IPFSManager;
  contract: any;
  daiContract: any;
  did: DID;
  driveManager: DriveManager;
  web3: Web3;
  currentAddress = "";
  estimatedGas = "";
  transactionStatus = "";
  indexes = "";
  uploadStatus = "";

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
  currentPage: XVDSwarmNodeBlock = {};
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
  updateWallet;
  gasLimit: 4000000;

  @Watch("updateWallet")
  async onUpdateWallet(prev, next) {
    this.items = [];
    await this.loadWallets();
    let { currentKeystore, unlock } = await Session.getSessionInfo();
  }

  async onUnlock() {
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
    if(ks && this.currentAddress.length === 0){
      this.currentAddress = ks.address;
    }
    this.driveManager = new DriveManager(this.ipfs, this.did);
    debugger;
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
  async share() {
    this.loading = true;
    const { currentKeystore } = await Session.getSessionInfo();
    // open
    //    await this.wallet.open(this.select.keystore, this.onAskPassphrase);

    // user
    const userKp = await this.wallet.getPublicKey(
      // @ts-ignore
      this.shareInfo.recipients[0].name
    );
    this.alertMessage =
      "Connecting to Swarm at https://ipfs.auth2factor.com/...";
    const swarmFeed = await this.wallet.getSwarmNodeClient(
      currentKeystore.address,
      "ES256K",
      "https://ipfs.auth2factor.com/"
    );

    const messageIO = new SubscriptionManager(this.wallet, userKp, swarmFeed);
    this.alertMessage = "Encrypting and sending message...";
    await messageIO.sendEncryptedCommPayload(
      // @ts-ignore
      this.shareInfo.recipients[0].address,
      // @ts-ignore
      this.selectedDocument.item,
      // @ts-ignore
      this.selectedDocument.item.txs,
      // @ts-ignore
      this.selectedDocument.item.index
    );

    this.loading = false;
    this.shareDialog = false;
  }

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

  @Watch("tree.data")
  async onTreeChanges(current, old) {
    const hasItems = current.toString().split(":");
    debugger;

    if (hasItems.length === 2) {
      console.log(this.items);
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
        (i) => i.block.toString() === current.toString()
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

  async downloadFile(item, index) {
    const { currentKeystore } = await Session.getSessionInfo();
    const res = await ShareUtils.openEphemeralLink(
      currentKeystore.address,
      this.documentBlock.txs,
      null,
      item.hash
    );

    await res.downloadFile();
  }

  close() {
    this.didDialog = false;
    this.fileDialog = false;
  }
  
  async fetchDocuments() {

    const filter = new Promise((resolve,reject) => {
      this.contract.events.DocumentAnchored({ 
        toBlock: 'latest',
        fromBlock: 0 },
        (err,val) => {
          if(!err){
            resolve(val);
          }
          else{
            reject(err);
          }
        });
      });
    const response = await filter;
    debugger;
    
    this.items = await forkJoin(response).toPromise();
  }

  async confirmContract(){
    this.setEstimateGasDialog = false;
    this.setTransactionStatusDialog = true;
    
    try{      
      this.transactionStatus = "Guardando archivo...";
      this.ipfs = new IPFSManager();
      await this.ipfs.start();
      this.driveManager = new DriveManager(this.ipfs, this.did);
      this.indexes = await this.driveManager.createDocumentSet(this.files);
      console.log(this.indexes);
      this.transactionStatus = "Creando transacción en blockchain...";
      const document = await this.contract.methods.addDocument(this.did.id, this.indexes, 'dummy description')
        .send({ from: this.currentAddress, gasPrice: '22000000000', gas: 300000 });

      console.log('txt ',document);
      this.transactionStatus = "Transacción hecha con exito: " + document.transactionHash;
      this.loading = false;
      this.canUpload = false;
      this.close();
      await this.fetchDocuments();
    }
    catch(e){
      this.transactionStatus = "Ha ocurrido un error";
      console.log('confirmation error',e);
      debugger;
    }
  }
  
  async createDocumentNode() {
    this.loading = true;
    try{
      const spender = this.contract._address;
      /*const amount = await this.daiContract.methods.allowance(this.currentAddress, spender).call(
        { from: this.currentAddress, gasPrice: '22000000000', gas: 0 }
      );
      debugger;
      console.log('amount',amount);
      const bnAmount = new BigNumber(amount);*/

      /*if(bnAmount.gt(0)){*/
        this.uploadStatus = "Aprovando la transaccion...";
        await this.daiContract.methods.approve(spender, "9000000000000000000").send(
          { from: this.currentAddress, gasPrice: '22000000000', gas: 4000000 }
        );
      /*}*/

      this.uploadStatus = "Estimando costo del gas...";
      const gas = await this.contract.methods.addDocument(this.did.id, this.indexes, 'dummy description').estimateGas();
      this.estimatedGas = gas;

      this.setEstimateGasDialog = true;
      console.log('estimatedGas',this.estimatedGas);
    }
    catch(e){
      console.log('allowance error',e);
      debugger;
    }
  }

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
