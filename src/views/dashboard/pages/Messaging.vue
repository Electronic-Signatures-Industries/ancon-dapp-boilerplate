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
        <v-toolbar-title>Subscriptions and events</v-toolbar-title>

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
              color="green accent-5"
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
              color="blue accent-5"
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
          <v-btn color="red" dark small absolute bottom right fab>
            <v-speed-dial transition="slide-y" v-model="fab" direction="left"
              ><template v-slot:activator>
                <v-icon>mdi-plus</v-icon>
              </template>

              <v-tooltip top>
                <span>Add subscription link</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="canUpload = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-key-change</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

              <v-tooltip top>
                <span>Subscribe to blockchain job</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="canUpload = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-cloud-sync</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

              <v-tooltip top>
                <span>Subscribe to DGI</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    v-if="selected"
                    dark
                    v-on="on"
                    @click="openShareDialog(item)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-cloud-print</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
            </v-speed-dial>
          </v-btn>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in activeSubscriptions" :key="item.title">
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-list two-line flat style="z-index:-5">
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
        <xdv-unlock
          v-model="password"
          :wallet="wallet"
          @load="onUnlock"
        ></xdv-unlock>

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
  },
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
  wallets: KeystoreIndex[] = [];
  tab = 0;
  fab = false;

  wallet = new Wallet();
  canUnlock = false;
  loadingAutocomplete: boolean;

  async mounted() {
   await this.onUnlock();
  }


  async onUnlock() {
    await this.loadWallets();
    await this.loadSession({ reset: true });
    this.loading = true;
    
    if (localStorage.getItem('xdv:messaging:subs')) {
      await this.loadSubscriptions();
    }
    this.loading = false;
  }

  async loadSession(options = { reset: false }) {
    this.loadingAutocomplete = true;
    const hasSession = await Session.has();
    if (hasSession && options.reset === false) {
      this.multiselect = [];
      this.multiselect.push(await Session.get());
    } else if (this.multiselect[0]) {
      await Session.set(this.multiselect[0]);
    } else if (this.wallets && this.wallets.length > 0) {
      this.multiselect = [];
      this.multiselect.push(this.wallets[0]);
    }

    if (this.multiselect[0])
      await this.wallet.open(this.multiselect[0].keystore);

    this.loadingAutocomplete = false;
  }

  async loadWallets() {
    this.wallets = await Session.getWalletRefs();
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

  login() {
    this.passphraseSubject.next(this.password);
  }
  async addSub() {
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
    const subs = SubscriptionManager.loadSubscriptions(
      this.multiselect[0].address,
      (m: any) => {
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
      }
    );

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

  async download() {
    const ks = this.multiselect[0];
    this.loading = true;

    try {
      const item = this.selectedDocument.item.payload;

      // user
      const swarmFeed = await this.wallet.getSwarmNodeClient(ks.address);
      // fetch and decrypt
      // get document from reference
      const encrypted = await swarmFeed.bzz.downloadData(item.ref, {
        mode: 'raw',
      });
      let [err, res] = await this.wallet.decryptJWE('P256', encrypted);

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
