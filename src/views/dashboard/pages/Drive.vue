<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="pink"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>

    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>
        <v-toolbar-title>Documents </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="select"
          :items="wallets"
          :loading="loading"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          return-object
          label="Search documents or select wallet"
          @input="loadSession"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search documents or pick wallet
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
          :show="canUnlock"
          @input="login"
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
        <template v-slot:extension>
          <v-btn color="blue" dark small absolute bottom left fab>
            <v-icon @click="canUpload = true">mdi-text-box-plus</v-icon>
          </v-btn>
          <v-tabs v-model="tab" @change="filter" align-with-title>
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

      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink lighten-5"
          class="pink--text"
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.subtitle">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle
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

                <v-icon v-if="hasCopyRef && item.type === 'did'" color="yellow">
                  mdi-clipboard
                </v-icon>

                <v-icon
                  @click="handleCopyDIDReference(item)"
                  v-if="!hasCopyRef && item.type === 'did'"
                  color="grey"
                >
                  mdi-clipboard
                </v-icon>
                <v-icon
                  v-if="item.type !== 'did'"
                  color="green"
                  @click="openShareDialog(item)"
                >
                  mdi-publish
                </v-icon>
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
  IpldClient,
  DIDDocumentBuilder,
  DIDMethodXDV,
  X509Info,
  Wallet,
  LDCryptoTypes,
  KeyConvert,
  DIDNodeSchema,
  DIDDocument,
  DocumentNodeSchema,
  JOSEService,
  JWTService,
  PublicKey,
} from 'xdvplatform-wallet';
import { SwarmFeed } from 'xdvplatform-wallet/src/swarm/feed';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import moment from 'moment';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { MiddlewareOptions, XDVMiddleware } from '../../../libs';
import { SolidoSingleton } from '../components/core/SolidoSingleton';
import { ethers } from 'ethers';
import { arrayify } from 'ethers/utils';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { forkJoin, Unsubscribable, Subject } from 'rxjs';
import { Session } from './Session';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import copy from 'copy-to-clipboard';
const bs58 = require('bs58');
import { DriveSwarmManager } from './DriveSwarmManager';
import { ec } from 'elliptic';
import Unlock from './Unlock.vue';
import Upload from './Upload.vue';
import SendTo from './Recipients.vue';
import { SubscriptionManager } from './SubscriptionManager';
import { filter, mergeMap } from 'rxjs/operators';
const cbor = require('cbor-sync');

@Component({
  components: {
    'xdv-unlock': Unlock,
    'xdv-upload': Upload,
    'xdv-send': SendTo,
  },
})
export default class DriveComponent extends Vue {
  loading = false;
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
  walletDescription = '';
  search = '';
  showPassword = false;
  password = '';
  mnemonic = [];
  alertMessage = '';
  alertType = '';
  selectedDocument = {};
  selected = [];
  shareDialog = false;
  shareInfo = {
    address: '',
    feed: '',
    recipients: {},
  };
  menuitems: any[] = [];
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
  publicWallets = [];
  hasCopyRef = false;
  sub: Unsubscribable;
  wallet = new Wallet();

  passphraseSubject: Subject<any> = new Subject();

  login() {
    this.passphraseSubject.next(this.password);
  }

  handleMenu(item) {}
  handleCopyDIDReference(item) {
    let ref;
    if (item.didReference) {
      copy(item.didReference.did);
      this.hasCopyRef = true;
    }
  }

  async loadSession() {
    if (this.select) {
      Session.set(this.select);
    } else if (Session.has()) {
      this.select = Session.get();
    } else {
      return;
    }

    // open
    await this.wallet.open(this.select.keystore);
  }

  async mounted() {
    this.loadWallets();

    this.wallet.onRequestPassphrase.subscribe(async (i) => {
      this.canUnlock = true;
      this.loading = true;
      if (i.type === 'wallet') {
        this.passphraseSubject.subscribe((passphrase) =>
          this.wallet.onRequestPassphrase2.next({ type: 'ui', passphrase })
        );
      } else {
        this.canUnlock = false;
        // set existing wallets
        this.menuitems = this.wallets.map((i) => {
          return {
            title: `${i.name}`,
            handler: () => this.changeWallet(i),
          };
        });
        if (Session.has()) {
          await this.loadDirectory();
        }
        this.loading = false;
      }
    });

    await this.loadSession();
  }

  loadWallets() {
    this.wallets = KeystoreIndex.getIndex().filter((i) => i.address);
    this.publicWallets = KeystoreIndex.getIndex().filter(
      (i) => i.name.indexOf('did:xdv:') > -1
    );
  }

  openShareDialog(item) {
    this.canSend = true;
    this.selectedDocument = item;
  }

  async share() {
    this.loading = true;

    // open
    //    await this.wallet.open(this.select.keystore, this.onAskPassphrase);

    // user
    const userKp = await this.wallet.getPublicKey(
      this.shareInfo.recipients.name
    );
    this.alertMessage =
      'Connecting to Swarm at https://ipfs.auth2factor.com/...';
    const swarmFeed = await this.wallet.getSwarmNodeClient(
      ks.address,
      'ES256K',
      'https://ipfs.auth2factor.com/'
    );

    const messageIO = new SubscriptionManager(this.wallet, userKp, swarmFeed);
    this.alertMessage = 'Encrypting and sending message...';
    await messageIO.sendEncryptedCommPayload(
      this.shareInfo.recipients.address,
      this.selectedDocument.item,
      this.selectedDocument.item.txs,
      this.selectedDocument.item.index
    );

    this.loading = false;
    this.shareDialog = false;
  }

  async changeWallet(i: KeystoreIndex) {
    this.selectWalletDialog = true;
    this.select = i;
  }

  filter() {
    // if (this.itemsClone.length === 0) this.itemsClone = [...this.items];
    // const mapping = {
    //   did: 0,
    //   file_document: 1,
    //   fe: 2,
    //   vc: 3,
    // };
    // const type = Object.keys(mapping)[this.tab];
    // this.items = this.itemsClone.filter((i) => i.type === type);
  }

  async loadDirectory() {
    if (!this.select) return;

    this.loading = true;

    const swarmFeed = await this.wallet.getSwarmNodeQueryable(
      this.select.address
    );
    const feed = await swarmFeed.bzzFeed.createManifest({
      user: swarmFeed.user,
      name: 'did:xdv:' + swarmFeed.user,
    });
    let content;
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
        type: 'did',
        didReference: {
          did: 'did:xdv:' + swarmFeed.user,
          address: swarmFeed.user,
        },
        item: content,
        action: moment(content.created).fromNow(),
        headline: content.id,
        title: 'DID',
        subtitle: `address ${swarmFeed.user} feed ${feed}`,
      } as any,
    ];

    const queue = await swarmFeed.bzzFeed.createManifest({
      user: swarmFeed.user,
      name: 'tx-document-tree',
    });
    this.sub = await DriveSwarmManager.subscribe(
      swarmFeed,
      queue,
      (content) => {
        console.log(content);
        const item = content.metadata.map((reference, index) => {
          const s = ethers.utils.joinSignature({
            r: '0x' + reference.signature.r,
            s: '0x' + reference.signature.s,
            recoveryParam: reference.signature.recoveryParam,
          });
          return {
            item: { txs: content.txs, reference, index },
            type: 'file_document',
            action: moment(reference.lastModified).fromNow(),
            title: reference.name,
            headline: reference.contentType,
            subtitle: `hash ${reference.hash.replace(
              '0x',
              ''
            )} signature ${s.replace('0x', '')}`,
          };
        });
        this.items = [...this.items, ...item] as any[];
      }
    );
  }

  close() {
    this.didDialog = false;
    this.fileDialog = false;
  }

  async createDocumentNode() {
    const ks = this.select;

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
