<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-card class="mx-auto">
<v-toolbar color="deep-purple accent-4" dark>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in menuitems"
              :key="i"
              @click="item.handler"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-toolbar-title>Mensajes</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          label="Search for a coin..."
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search for your favorite
                <strong>Cryptocurrency</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-coin</v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
            >
              {{ item.name.charAt(0) }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-coin</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>

        <template v-slot:extension>
       
 <v-dialog v-model="shareDialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                color="blue"
                dark
                small
                absolute
                bottom
                left
                fab
              >
                <v-icon v-on="on">mdi-call-received</v-icon>
              </v-btn>
            </template>   <v-card>
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
                      v-if="receivedUI"
                      v-model="shareInfo.feed"
                      label="Enlace"  @input="readMagicLink"
                    ></v-text-field>
                    <v-text-field
                      required
                      v-if="receivedUI"
                      v-model="shareInfo.address"
                      label="Direccion"
                    ></v-text-field>
                    <v-select
                      v-model="select"
                      :hint="`${select.algorithm}`"
                      :items="wallets"
                      item-text="name"
                      label="Cartera Digital"
                      persistent-hint
                      return-object
                      single-line
                    >
                    </v-select>
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
                @click="subscribe"
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
          <v-tabs v-model="tab" @change="filter" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab>
              Identidad Digital
            </v-tab>
            <v-tab>
              Firma Calificada
            </v-tab>
            <v-tab>
              Otros
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
import { DriveSession } from './DriveSession';
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
  shareDialog = false;
  receivedUI = true;
  shareInfo = {
    address: '',
    feed: '',
  };
  subscriptions = [];
  activeSubscriptions: any[] = [];
  items = [];
  selectWalletDialog = false;
  select: KeystoreIndex = new KeystoreIndex();
  wallets: KeystoreIndex[] = [];
  solidoProps: XDVMiddleware | MiddlewareOptions;

  async mounted() {
    this.loadWallets();
    this.select = this.wallets[0];

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

  readCopyDIDReference(reference) {
    let ref = bs58.decode(reference);
    ref = cbor.decode(ref);
    this.shareInfo.address = ref.link.split(',')[0];
    this.shareInfo.feed = ref.link.split(',')[1];
  }

  readMagicLink(link) {
    try {
      this.readCopyDIDReference(link);
    } catch (e) {
      // no - op
    }
  }

  async subscribe() {
    const ks = this.select;
    this.loading = true;

    this.readMagicLink(this.shareInfo.feed);

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    // const feed = this.driveSession.feed.feedHash || this.driveSession.feed;

    // resolve DID
    const  swarmFeed  = await DriveSession.getSwarmNodeClient(wallet.getES256K());
    const resolver = await DriveSession.createDIDResolver(
      swarmFeed,
      this.shareInfo.feed
    );
    const did = resolver.resolve(
      `did:xdv:${this.shareInfo.address}`
    ) as DIDDocument;
    const pub = did.publicKey[0].publicKeyJwk;

    const kp = wallet.getES256K();
    const kpSuite = await KeyConvert.getES256K(kp);

    const feedHash = await swarmFeed.bzzFeed.createManifest({
      user: this.shareInfo.address,
      name: `${this.shareInfo.address}:${swarmFeed.user}`,
    });
    this.loading = false;
    this.shareDialog = false;

    // store subscriptions
    const existing = JSON.parse(
      localStorage.getItem('xdv:messaging:subs') || `[]`
    );
    this.subscriptions = [
      ...existing,
      {
        feedHash,
        did,
        pub,
      },
    ];

    // store
    localStorage.setItem(
      'xdv:messaging:subs',
      JSON.stringify(this.subscriptions)
    );
    await this.loadSubscriptions();
  }

  async loadSubscriptions() {
    this.loading = true;

    // resolve DID

    const subs = MessageIO.loadSubscriptions((m: any) => {
      const decoded = JWTService.decodeWithSignature(m.content);
      this.items.push({
        // active: true,
        item: { ...decoded, feed: m.feedHash, address: m.author },
        headline: `${decoded.payload.contentType}`,
        title: decoded.payload.name,
        action: moment(m.timestamp).fromNow(),
        subtitle: `firma ${decoded.signature} peso ${new BigNumber(
          decoded.payload.size
        )
          .toNumber()
          .toLocaleString()} bytes`,
      });
    });

    this.activeSubscriptions = [];
    subs.forEach((subscription, index) => {
      const topic = subscription.did;
      this.activeSubscriptions.push({
        handler: () => {
          subscription.unsubscribe();
          this.activeSubscriptions.splice(index);
        },
        title: `${topic.id} -> ${subscription.currentUser}`,
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

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    const item = this.selectedDocument.item.payload;

    // resolve DID
    const keypair = wallet.getES256K();
    const swarmFeed = await DriveSession.getSwarmNodeClient(keypair);

    const kp = wallet.getP256();
    const kpSuite = await KeyConvert.getP256(kp);

    // const resolver = await DriveSession.createDIDResolver(
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

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;

    DriveSession.set(
      `did:xdv:${ks.address}`,
      ks.address,
      ks.name
    );

    this.loading = false;
    this.selectWalletDialog = false;
    //    this.loadSubscriptions();
  }
}
</script>
