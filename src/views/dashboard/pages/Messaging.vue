<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-card class="mx-auto">
      <v-toolbar color="deep-purple accent-4" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Mensajeria</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog v-model="shareDialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-file-send</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Subscribir</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="form" autocomplete="off">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      required
                      v-model="shareInfo.feed"
                      label="Enlace"
                    ></v-text-field>
                    <v-text-field
                      required
                      v-model="shareInfo.address"
                      label="Direccion"
                    ></v-text-field>
                    <v-select
                      v-model="select"
                      :hint="`${select.algorithm}`"
                      :items="wallets"
                      item-text="name"
                      item-value="name"
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
                :disabled="loading"
                @click="subscribe"
                >Subscribir</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <!--
      <v-list subheader>
        <v-subheader>Document compartidos recientes</v-subheader>

        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'"
              >mdi-message-text</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-divider></v-divider> -->
      <v-list subheader>
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
                  <v-icon v-if="!active" color="grey lighten-1">
                    mdi-star
                  </v-icon>
                  <!--
                  <v-icon v-else color="yellow">
                    mdi-star
                  </v-icon>
                  <v-icon color="green" @click="openShareDialog(item)">
                    mdi-share
                  </v-icon> -->
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
import { arrayify } from 'ethers/utils';
import { SwarmNodeSignedContent } from './SwarmNodeSignedContent';
import { forkJoin } from 'rxjs';
import { DriveSession } from './DriveSession';
import { MessagingTimelineDuplexClient } from './MessagingTimelineDuplexClient';
import copy from 'copy-to-clipboard';
import { PartialChapter } from '@erebos/timeline';
const bs58 = require('bs58');

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
  shareInfo = {
    address: '0xe957653a4b075543b0e14b7dcd93807ea82cc517',
    feed: '120ddc6359bba7bf789db6ff18042d5dbd496fe4892900d9be0fa7de33639479',
  };
  subscriptions = [];
  menuitems: any[] = [];
  items = [
    {
      active: true,
      title: 'No hay mensajes pendientes',
      //headline: 'From',
      //subtitle: 'Age'
    },
  ];
  selectWalletDialog = false;
  select: KeystoreIndex = new KeystoreIndex();
  wallets: KeystoreIndex[] = [];
  solidoProps: XDVMiddleware | MiddlewareOptions;
  activeSubscriptions = [];

  async mounted() {
    this.loadWallets();
    this.select = this.wallets[0];

    // set existing wallets
    this.menuitems = this.wallets.map((i) => {
      return {
        title: `${i.name} - ${i.algorithm}`,
        handler: () => this.changeWallet(i),
      };
    });
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

  openShareDialog(item) {
    this.shareDialog = true;
    this.selectedDocument = item;
  }

  async subscribe() {
    const ks = this.select;
    this.loading = true;

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    // const feed = this.driveSession.feed.feedHash || this.driveSession.feed;

    // resolve DID
    const { swarmFeed } = await DriveSession.getSwarmNodeClient(wallet);
    const resolver = await DriveSession.createDIDResolver(
      swarmFeed,
      this.shareInfo.feed
    );
    const did = resolver.resolve(
      `did:xdv:${this.shareInfo.address}`
    ) as DIDDocument;
    // const pub = did.publicKey[0].publicKeyJwk;

    const kp = wallet.getES256K();
    const kpSuite = await KeyConvert.getES256K(kp);

    const feedHash = await swarmFeed.bzzFeed.createManifest({
      user: this.shareInfo.address,
      name: `${this.shareInfo.address}:${swarmFeed.user}`,
    });
    const duplexClient = new MessagingTimelineDuplexClient(swarmFeed, feedHash);

    duplexClient
      .subscribe()
      .live({
        interval: 5000,
      })
      .subscribe((m: PartialChapter<string>) => {
        this.items.push({
          // active: true,
          title: m.author,
          headline: m.content,
          action: moment(m.timestamp).fromNow(),
          subtitle: `firma ${m.signature}`,
        });
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
      },
    ];

    // store
    localStorage.setItem(
      'xdv:messaging:subs',
      JSON.stringify(this.subscriptions)
    );
  }

  async loadSubscriptions() {
    this.loading = true;

    // resolve DID
    const swarmFeed = await DriveSession.getSwarmNodeQueryable();

    const subs = JSON.parse(localStorage.getItem('xdv:messaging:subs'));
    this.activeSubscriptions = subs.map((i) => {
      const { did, feedHash } = i;
      const duplexClient = new MessagingTimelineDuplexClient(
        swarmFeed,
        feedHash
      );

      const unsubscribe = duplexClient
        .subscribe()
        .live({
          interval: 5000,
        })
        .subscribe((c: PartialChapter<string>) => {
          c.forEach((m) =>
            this.items.push({
              // active: true,
              title: m.author,
              headline: m.content,
              action: moment(m.timestamp).fromNow(),
              subtitle: `firma ${m.signature}`,
            })
          );
        });

      return unsubscribe;
    });

    this.loading = false;
  }
  async changeWallet(i: KeystoreIndex) {
    this.selectWalletDialog = true;
    this.select = i;
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

    const kp = wallet.getES256K();
    const { swarmFeed, feedHash } = await DriveSession.getSwarmNodeClient(
      wallet
    );
    DriveSession.set(
      feedHash,
      `did:xdv:${swarmFeed.user}`,
      kp.getPublic('array'),
      swarmFeed.user,
      ks.name
    );

    this.loading = false;
    this.selectWalletDialog = false;
    //    this.loadSubscriptions();
  }
}
</script>
