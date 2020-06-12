<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-card class="mx-auto">
      <v-toolbar color="deep-teal accent-4" dark>
        <v-toolbar-title>Mensajes</v-toolbar-title>

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
          hide-selected
          item-text="name"
          return-object
          label="Buscar carteras"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Buscar carteras o documentos
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
          <v-dialog v-model="shareDialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="blue" dark small absolute bottom left fab>
                <v-icon v-on="on">mdi-call-received</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span v-if="receivedUI" class="headline">Subscribir</span>
                <span v-if="!receivedUI" class="headline">Ingresar clave</span>
              </v-card-title>

              <v-card-text>
                <v-form v-model="form" autocomplete="off">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        required
                        v-model="password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        label="Clave"
                        class="input-group--focused"
                        @click:append="showPassword = !showPassword"
                        :error="validations.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="loading"
                  @click="shareDialog = false"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  v-if="receivedUI"
                  :disabled="loading"
                  @click="addSub"
                  >Subscribir</v-btn
                >

                <v-btn
                  color="blue darken-1"
                  text
                  v-if="!receivedUI"
                  :disabled="loading"
                  @click="download"
                  >Ingresar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-tabs v-model="tab"  align-with-title>
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
                    v-if="!active"
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
} from 'xdvplatform-tools';
import { SwarmFeed } from 'xdvplatform-tools/src/swarm/feed';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import moment from 'moment';
import { createKeyPair, sign } from '@erebos/secp256k1';
import { MiddlewareOptions, XDVMiddleware } from '../../../libs';
import { SolidoSingleton } from '../components/core/SolidoSingleton';
import { ethers } from 'ethers';
import { JWE, JWK } from 'node-jose';
const eccrypto = require('eccrypto');

import { arrayify, BigNumber, base64 } from 'ethers/utils';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { forkJoin } from 'rxjs';
import { Session } from './Session';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import copy from 'copy-to-clipboard';
import { PartialChapter } from '@erebos/timeline';
const bs58 = require('bs58');
import { MessageIO } from './MessageIO';
import { DriveSwarmManager } from './DriveSwarmManager';
const cbor = require('cbor-sync');
import { encrypt, decrypt, PrivateKey } from 'eciesjs';

@Component({})
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
  multiselect = [];
  subscriptions = [];
  activeSubscriptions: any[] = [];
  items = [];
  selectWalletDialog = false;
  select: KeystoreIndex = null;
  wallets: KeystoreIndex[] = [];
  solidoProps: XDVMiddleware | MiddlewareOptions;
tab = 0;
  async mounted() {
    this.loadWallets();
    this.multiselect = [];
    // this.multiselect = [this.wallets[0]];

    if (localStorage.getItem('xdv:messaging:subs')) {
      await this.loadSubscriptions();
    }
    this.loading = true;
    this.loading = false;
  }

  loadWallets() {
    this.wallets = KeystoreIndex.getIndex().filter(
      (i) => i.algorithm !== 'RSA'
    );
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

  readMagicLink(link) {
    try {
      this.readCopyDIDReference(link);
    } catch (e) {
      // no - op
    }
  }

  async addSub() {
    if (this.multiselect.length === 2) {
      if (this.shareDialog === false && this.password.length === 0) {
        this.shareDialog = true;
        return;
      }

      const ks = this.multiselect[0];
      const from = this.multiselect[1];
      this.loading = true;

      const wallet = await Session.getWalletFromKeystore(ks, this.password);
      if (!wallet) {
        this.validations.password = 'Clave invalida';
        this.loading = false;
        return;
      }
      this.validations.password = false;

      const swarmFeed = await Session.getSwarmNodeQueryable(ks.address);

      // from
      const user = await Wallet.getPublicKey(from.name, 'P256_JWK_PUBLIC');

      // user
      const keys = await wallet.getKeyPair(
        ks.keystore,
        'ES256K',
        this.password
      );

      this.loading = false;
      this.shareDialog = false;

      // store subscriptions
      const existing = JSON.parse(
        localStorage.getItem('xdv:messaging:subs') || `[]`
      );
      this.subscriptions = [
        ...existing,
        {
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

  async loadSubscriptions() {
    this.loading = true;

    // resolve DID
    const self = this;
    const subs = MessageIO.loadSubscriptions((m: any) => {
      const decoded = JWTService.decodeWithSignature(m.content);

      self.items.push({
        // active: true,
        item: { ...decoded, feed: '', address: m.author },
        headline: `${decoded.payload.reference.contentType}`,
        title: decoded.payload.reference.name,
        action: moment(m.timestamp).fromNow(),
        subtitle: `firma ${decoded.signature} peso ${new BigNumber(
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
        title: `${subscription.from.substring(
          0,
          20
        )}... -> ${subscription.user.substring(0, 20)}...`,
      });
    });

    this.loading = false;
  }
  async changeWallet(i: KeystoreIndex) {
    this.selectWalletDialog = true;
    this.select = i;
  }

  async download() {
    const ks = this.select;
    this.loading = true;

    const wallet = await Session.getWalletFromKeystore(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    const item = this.selectedDocument.item.payload;

    // resolve DID
    const keypair = wallet.getES256K();
    const swarmFeed = await Session.getSwarmNodeClient(keypair);

    const kp = wallet.getP256();
    const kpSuite = await KeyConvert.getP256(kp);

    // const resolver = await Session.createDIDResolver(
    //   swarmFeed,
    //   item.feed
    // );

    // const did = resolver.resolve(`did:xdv:${this.selectedDocument.item.address}`) as DIDDocument;
    // const pub = did.publicKey[0].publicKeyJwk;

    // fetch and decrypt
    // get document from reference

    const document = await swarmFeed.bzz.downloadData(item.ref);
    const res = await JWE.createDecrypt(
      await JWK.asKey(kpSuite.jwk, 'jwk')
    ).decrypt(document.cipher);
    // const verfied = await JWTService.verify(
    //   item.did.publicKey[0].publicKeyJwk,
    //   res,
    //   swarmFeed.user
    // );
    var a = new TextDecoder('utf-8').decode(res.plaintext);
    const obj = JSON.parse(a);
    const file = new File([base64.decode(obj.content)], obj.name, {
      type: obj.contentType,
    });

    await this.downloadFile(file, file.name);

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
  async unlock() {
    const ks = this.select;
    this.loading = true;

    const wallet = await Session.getWalletFromKeystore(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;

    Session.set(`did:xdv:${ks.address}`, ks.address, ks.name);

    this.loading = false;
    this.selectWalletDialog = false;
    //    this.loadSubscriptions();
  }
}
</script>
