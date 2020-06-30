<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>

    <v-card class="mx-auto">
      <v-toolbar color="black accent-4" dark>
        <v-toolbar-title>Documents </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="select"
          :items="wallets"
          :loading="loadingAutocomplete"
          chips
          @change="loadSession"
          clearable
          hide-details
          hide-selected
          item-text="name"
          return-object
          label="Search documents or select wallet"
          ref="debounceLoadSession"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search documents or select wallet
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="green accent-5"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-wallet</v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
            >
              {{ item.address }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-text="item.address"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-coin</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>

        <xdv-unlock
          v-model="password"
          :wallet="wallet"
          @load="onUnlock"
        ></xdv-unlock>

        <xdv-upload
          :show="canUpload"
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

        <template v-slot:extension>
          <v-btn
            color="red"
            dark
            small
            absolute
            bottom
            right
            fab
            :disabled="!wallet.id"
          >
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
              <v-tooltip top>
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
              >

              <v-tooltip top>
                <span>Copy DID link</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="tab === 0"
                    fab
                    dark
                    v-on="on"
                    @click="handleCopyDIDReference(currentItem)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-clipboard</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <v-tooltip top>
                <span>Sign documents</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
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
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab>
              DID
            </v-tab>
            <v-tab>
              Documents
            </v-tab>
            <v-tab>
              Invoices
            </v-tab>
            <v-tab>
              Isssued Verifiable Claims
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-list two-line flat style="z-index:-5">
        <v-list-item-group v-model="selected" class="blue--text">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.subtitle" @click="currentItem = item">
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.title"
                  class="font-weight-medium"
                ></v-list-item-title>
                <v-list-item-subtitle
                  @click="openViewerDialog(item)"
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="item.action"
                ></v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
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
} from 'xdvplatform-wallet';
import { Wallet } from 'xdvplatform-wallet/src';

import { SwarmFeed } from 'xdvplatform-wallet/src/swarm/feed';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { KeystoreIndex, DIDSigner } from './KeystoreIndex';
import moment from 'moment';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { MiddlewareOptions, XDVMiddleware } from '../../../libs';
import { SolidoSingleton } from '../components/core/SolidoSingleton';
import { ethers } from 'ethers';
import { arrayify } from 'ethers/utils';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { forkJoin, Unsubscribable, Subject, fromEvent } from 'rxjs';
import { Session } from './Session';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import copy from 'copy-to-clipboard';
const bs58 = require('bs58');
import { DriveSwarmManager, XVDSwarmNodeBlock } from './DriveSwarmManager';
import { ec } from 'elliptic';
import Unlock from './Unlock.vue';
import Upload from './Upload.vue';
import SendTo from './Recipients.vue';
import { SubscriptionManager } from './SubscriptionManager';
import { filter, mergeMap, debounce, debounceTime } from 'rxjs/operators';
import SignatureManagementDialog from './SignatureManagementDialog.vue';
import { SigningOutput } from './SigningOutput';
import { async } from 'rxjs/internal/scheduler/async';
import { CacheService } from './CacheService';
const cbor = require('cbor-sync');

@Component({
  components: {
    'xdv-unlock': Unlock,
    'xdv-upload': Upload,
    'xdv-send': SendTo,
    'xdv-sign': SignatureManagementDialog,
  },
})
export default class DriveComponent extends Vue {
  loading = false;
  loadingAutocomplete = false;
  indexjson = null;
  invalidPassword = false;
  keystore: any | Wallet = null;
  valid = false;
  form = {};
  validations: any = { password: false };
  didDialog = false;
  fileDialog = false;
  files: File[] = [];
  open = false;
  fab = false;
  walletDescription = '';
  search = '';
  showPassword = false;
  password = '';
  mnemonic = [];
  alertMessage = '';
  alertType = '';
  selectedDocument = {};
  selected = [];
  currentItem = {};
  shareDialog = false;
  shareInfo = {
    address: '',
    feed: '',
    recipients: {},
  };
  items = [];
  showMenu = false;
  selectWalletDialog = false;
  select: KeystoreIndex = null;
  wallets: KeystoreIndex[] = [];
  solidoProps: XDVMiddleware | MiddlewareOptions;
  selectedItem = new SwarmNodeSignedContent();
  session = {};
  tab = 0;
  itemsClone = [];
  canSend = false;
  canUpload = false;
  canUnlock = false;

  canSign = false;
  publicWallets = [];
  hasCopyRef = false;
  sub: Unsubscribable;
  wallet = new Wallet();

  passphraseSubject: Subject<any> = new Subject();
  signManagerProps = {
    operation: 'sign',
    presets: 'none',
    output: { key: 'XDV link', value: SigningOutput.XDVRef },
    algorithm: '',
    isBinaryEnabled: true,
    wallet: new KeystoreIndex(),
    files: [],
  };
  canView: boolean;
  canChain: boolean;
  allWallets: any = [];
  cache = new CacheService();

  async onUnlock() {
    await this.loadWallets();
 const ks =   await this.loadSession({ reset: true });
    this.loading = true;
    await this.loadDirectory(ks);
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
      copy(item.didReference.did);
      this.hasCopyRef = true;
    }
  }

  async loadSession(options = { reset: false }) {
    this.loadingAutocomplete = true;
    const { currentKeystore } = await Session.getSessionInfo();
    if (currentKeystore && options.reset === false) {
      this.select = currentKeystore;

      await this.wallet.open(this.select.keystore);
    } else if (this.select) {
      await Session.set({ ks: this.select } as any);
      await this.wallet.open(this.select.keystore);
    }
    this.loadingAutocomplete = false;
    this.loading = false;
    return currentKeystore;

  }

  async mounted() {
    // @ts-ignore
    const keyup = fromEvent(this.$refs.debounceLoadSession.$el, 'keyenter')
      .pipe(debounceTime(2500))
      .subscribe(async () => {
        await this.loadSession({ reset: true });
      });

    await this.loadWallets();
    const ks = await this.loadSession();

    this.itemsClone = [];
    await this.cache.initialize();
    this.cache.subscribeCache(
      ks.address,
      (i) => i.address === ks.address,
      (e, i) => {
        this.itemsClone.push(i.doc);
      }
    );
  }

  async loadWallets() {
    const w = await Session.getWalletRefs();
    // @ts-ignore
    this.wallets = w.filter((i: KeystoreIndex) => i.address);
    this.allWallets = w;
    this.publicWallets = w.filter(
      (i: KeystoreIndex) => i.name.indexOf('did:xdv:') > -1
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
      'Connecting to Swarm at https://ipfs.auth2factor.com/...';
    const swarmFeed = await this.wallet.getSwarmNodeClient(
      currentKeystore.address,
      'ES256K',
      'https://ipfs.auth2factor.com/'
    );

    const messageIO = new SubscriptionManager(this.wallet, userKp, swarmFeed);
    this.alertMessage = 'Encrypting and sending message...';
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

  @Watch('tab')
  onFilter2(current, old) {
    const mapping = {
      did: 0,
      file_document: 1,
      fe: 2,
      vc: 3,
    };
    const type = Object.keys(mapping)[current];
    this.items = this.itemsClone.filter((i) => i.type === type);
  }
  @Watch('itemsClone')
  onFilter(current, old) {
    const mapping = {
      did: 0,
      file_document: 1,
      fe: 2,
      vc: 3,
    };
    const type = Object.keys(mapping)[this.tab];
    this.items = this.itemsClone.filter((i) => i.type === type);
  }

  async loadDirectory(ks?: KeystoreIndex) {
    const { address } = ks;
    const swarmFeed = await this.wallet.getSwarmNodeQueryable(address);
    const feed = await swarmFeed.bzzFeed.createManifest({
      user: address,
      name: 'did:xdv:' + address,
    });
    let content;
    //   if (info.doc_count === 0) {
    try {
      let { body } = await swarmFeed.bzzFeed.getContent(feed, {
        path: 'index.json',
      });

      let reader = new Response(body);
      content = await reader.json();
    } catch (e) {
      return;
    }

    this.indexjson = content;
    this.items = [];
    this.items = [
      {
        _id: `${address}:${content.id}`,
        type: 'did',
        didReference: {
          did: 'did:xdv:' + address,
          address: address,
        },
        item: content,
        action: moment(content.created).fromNow(),
        headline: content.id,
        title: 'DID',
        subtitle: `address ${swarmFeed.user} feed ${feed}`,
      } as any,
    ];

    await this.cache.setCachedDocuments(
      swarmFeed.user,
      content.created,
      this.items[0]
    );
    // }
    const queue = await swarmFeed.bzzFeed.createManifest({
      user: swarmFeed.user,
      name: 'tx-document-tree',
    });
    this.sub = await DriveSwarmManager.subscribe(
      swarmFeed,
      queue,
      async (block: XVDSwarmNodeBlock) => {
        console.log(block);
        const p = block.metadata.map(
          async (reference: SwarmNodeSignedContent, index) => {
            // @ts-ignore
            const s = ethers.utils.joinSignature({
              // @ts-ignore
              r: '0x' + reference.signature.r,
              // @ts-ignore
              s: '0x' + reference.signature.s,
              // @ts-ignore
              recoveryParam: reference.signature.recoveryParam,
            });
            const item = {
              _id: `${swarmFeed.user}:${block.txs}:${index}`,
              item: { txs: block.txs, reference, index },
              type: 'file_document',
              action: moment(reference.lastModified).fromNow(),
              title: reference.name,
              headline: reference.contentType,
              subtitle: `hash ${reference.hash.replace(
                '0x',
                ''
              )} signature ${s.replace('0x', '')}`,
            };
            await this.cache.setCachedDocuments(
              swarmFeed.user,
              reference.created,
              item
            );
          }
        );
        await forkJoin(p).toPromise();
      }
    );
  }

  async shareTo(item) {
    const driveManager = new DriveSwarmManager(this.wallet);
    await driveManager.shareEphemeralLink(
      item.address,
      item.item.txs,
      item.item.index,
      true
    );
  }

  close() {
    this.didDialog = false;
    this.fileDialog = false;
  }

  async createDocumentNode() {
    const wallets = await Session.getWalletRefs();

    const ks = wallets.find(
      (i: KeystoreIndex) => i.keystore === this.wallet.id
    ) as KeystoreIndex;
    this.loading = true;
    const driveManager = new DriveSwarmManager(this.wallet);
    await driveManager.pushFiles({
      address: ks.address,
      files: this.files,
      queueName: 'documents',
    });
    this.loading = false;
    this.canUpload = false;
    this.close();
    this.tab = 1;
  }
}
</script>
