<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
    <v-card class="mx-auto">
      <v-toolbar color="deep-teal accent-4" dark>
        <v-toolbar-title>Subscriptions</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="multiselect"
          :items="wallets"
          :loading="loading"
          chips
          :search-input.sync="search"
          clearable
          multiple
          hide-details
          @input="addSub"
          @change="saveSelection"
          hide-selected
          item-text="name"
          return-object
          label="Add subscriptions or select wallet"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Add subscriptions or select wallet
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue accent-5"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-wallet</v-icon>
              <span v-text="item.name"></span>
            </v-chip>
            <v-chip
              v-if="from"
              v-bind="attr"
              :input-value="from"
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
        <template v-slot:extension>
       
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in activeSubscriptions" :key="item.title">
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="indigo lighten-5"
          class="indigo--text"
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.title">
              <template v-slot:default="{ active }">
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
                  <v-icon
                    @click="openDownloadDialog(item)"
                    v-if="!active && multiselect.length > 0"
                    color="green lighten-1"
                  >
                    mdi-download
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
        <xdv-unlock :show="canUnlock" v-model="password"></xdv-unlock>
  
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
import { JWE, JWK } from 'node-jose';
import { arrayify, BigNumber, base64 } from 'ethers/utils';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { forkJoin, Subject } from 'rxjs';
import { Session } from './Session';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import copy from 'copy-to-clipboard';
import { PartialChapter } from '@erebos/timeline';
const bs58 = require('bs58');
import { SubscriptionManager } from './SubscriptionManager';
import { DriveSwarmManager } from './DriveSwarmManager';
import Unlock from './Unlock.vue';
const cbor = require('cbor-sync');

@Component({
  components: {
    'xdv-unlock': Unlock,
  }
})
export default class MessagingComponent extends Vue {
  loading = false;

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
  showPassword = false;
  password = '';
  mnemonic = [];
  selectedDocument = {};
  selected = [];
  from = null;
  shareDialog = false;
  receivedUI = true;
  shareInfo = {
    address: '',
    feed: '',
    recipients: {
      name: '',
    },
  };
  search = '';
  multiselect: KeystoreIndex[] = [];
  subscriptions = [];
  activeSubscriptions: any[] = [];
  items = [];
  selectWalletDialog = false;
  wallets: KeystoreIndex[] = [];
  solidoProps: XDVMiddleware | MiddlewareOptions;
  tab = 0;
  passphraseSubject: Subject<any> = new Subject();

  async mounted() {
    this.loadWallets();
    this.multiselect = [];

    if (localStorage.getItem('xdv:messaging:currentWallet')) {
      const ks = JSON.parse(
        localStorage.getItem('xdv:messaging:currentWallet')
      );
      this.multiselect.push(ks);
      Session.setWallet(ks.keystore, this.onAskPassphrase);
    }

    if (localStorage.getItem('xdv:messaging:subs')) {
      await this.loadSubscriptions();
    }

    this.loading = true;
    this.loading = false;
  }

  loadWallets() {
    this.wallets = KeystoreIndex.getIndex();
  }

  openDownloadDialog(item) {
    this.shareDialog = true;
    this.selectedDocument = item;
    this.receivedUI = false;
  }

  openShareDialog(item) {
    this.shareDialog = true;
    this.selectedDocument = item;
  }

  onAskPassphrase() {
    this.shareDialog = true;

    return new Promise((resolve, reject) => {
      this.passphraseSubject.subscribe(p => {
        resolve(p);
      });
    });
  }

  login() {
    this.passphraseSubject.next(this.password);
  }
  async addSub() {
    const { wallet } = Session;
    if (this.multiselect.length === 2) {
       
      const ks = this.multiselect[0];
      const from = this.multiselect[1];
      this.loading = true;
      

      // store subscriptions
      const existing = JSON.parse(
        localStorage.getItem('xdv:messaging:subs') || `[]`
      );
      this.subscriptions = [
        ...existing,
        {
          name: ks.name,
          // feedHash,
          user: ks.address,
          from: from.name.split(':')[2],
        },
      ];

      // store
      localStorage.setItem(
        'xdv:messaging:subs',
        JSON.stringify(this.subscriptions)
      );
      await this.loadSubscriptions();
    }
  }

  saveSelection() {
    localStorage.setItem(
      'xdv:messaging:currentWallet',
      JSON.stringify(this.multiselect[0])
    );
  }
  async loadSubscriptions() {
    this.loading = true;

    // resolve DID
    const self = this;
    const subs = Session.subscriptions.loadSubscriptions((m: any) => {
      const decoded = JWTService.decodeWithSignature(m.content);

      self.items.push({
        // active: true,
        item: { ...decoded, feed: '', address: m.author },
        headline: `${decoded.payload.reference.contentType}`,
        title: decoded.payload.reference.name,
        action: moment(m.timestamp).fromNow(),
        subtitle: `signature ${decoded.signature} size ${new BigNumber(
          decoded.payload.reference.size
        )
          .toNumber()
          .toLocaleString()} bytes`,
      });
    });

    self.activeSubscriptions = [];
    subs.forEach((subscription, index) => {
      this.activeSubscriptions.push({
        handler: () => {
          subscription.unsubscribe();
          this.activeSubscriptions.splice(index);
        },
        title: `${subscription.user.substring(
          0,
          20
        )}...${subscription.user.substring(
          subscription.user.length - 10,
          subscription.user.length
        )}`,
      });
    });

    this.loading = false;
  }
  async changeWallet(i: KeystoreIndex) {
    this.selectWalletDialog = true;
    this.multiselect = [];
    this.multiselect.push(i);
  }

  async download() {
    const ks = this.multiselect[0];
    this.loading = true;

    const { wallet } = Session;
    try { 
      const item = this.selectedDocument.item.payload;

      // user
      const swarmFeed = await wallet.getSwarmNodeClient(ks.address)
      // fetch and decrypt
      // get document from reference
      const encrypted = await swarmFeed.bzz.downloadData(item.ref, {
        mode: 'raw',
      });
      let [err, res] = await wallet.decryptJWE('P256', encrypted);

      // is a cbor content
      // const verfied = await JWTService.verify(
      //   item.did.publicKey[0].publicKeyJwk,
      //   res,
      //   swarmFeed.user
      // );
      const obj = cbor.decode(res.plaintext);
      const file = new File([base64.decode(obj.content)], obj.name, {
        type: obj.contentType,
      });
      this.selectedDocument.item.downloaded = obj;

      await this.downloadFile(file, file.name);
    } catch (e) {
      console.log(e);
    }

    this.shareDialog = false;
    this.loading = false;
  }

  async downloadFile(blob: Blob, name: string) {
    try {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    } catch (e) {
      throw new Error('No se pudo convertir el archivo');
    }
  }
}
</script>
