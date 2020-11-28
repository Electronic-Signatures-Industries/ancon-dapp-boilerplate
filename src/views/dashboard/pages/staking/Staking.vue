<template>
    <v-container fluid class="down-top-padding">

        <v-dialog v-model="removeDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Remove wallet request</span>
        </v-card-title>

        <v-card-text>
          Continue with removing selected wallet?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="removeDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="remove()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-dialog v-model="shareAddressDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Share Address</span>
        </v-card-title>

        <v-card-text>
          <qrcode value="currentKeystore.address" :options="{ width: 200 }"></qrcode>
        {{ currentKeystore.address }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="shareAddressDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="copyAddress()"
            >Copy</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-dialog v-model="exportWalletDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Export</span>
        </v-card-title>

        <v-card-text>
          <qrcode value="wallet.mnemonic" :options="{ width: 200 }"></qrcode><br/>
        {{ wallet.mnemonic }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="exportWalletDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="copyMnemonic()"
            >Copy</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo accent-4"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertType.length > 0">{{
      alertMessage
    }}</v-alert>

    <v-card>
      <v-toolbar color="black accent-4" dark>
        <v-toolbar-title>Wallet</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="selected"
          :items="searchResults"
          :loading="loading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="name"
          label="Search wallet"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                No wallets found
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
              <v-icon @click="copyAddress(item.address)">mdi-clipboard</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>

        <template v-slot:extension>
          <v-btn
            color="red"
            dark
            small
            absolute
            bottom
            right
            fab
            style="z-index:5"
          >
            <v-speed-dial transition="slide-y" v-model="fab" direction="left"
              ><template v-slot:activator>
                <v-icon>mdi-plus</v-icon>
              </template>
              <v-tooltip top>
                <span>Request Signer Activation</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-if="currentKeystore"
                    v-on="on"
                    @click="requestSignerActivation(currentKeystore.address)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                </template></v-tooltip
              >              
              <v-tooltip top>
                <span>Set as default</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-if="currentKeystore"
                    v-on="on"
                    @click="setDefault"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <v-tooltip top>
                <span>Create wallet</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="dialog = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-wallet-plus</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

              <v-tooltip top>
                <span>Link external</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    v-if="currentKeystore"
                    dark
                    v-on="on"
                    @click="linkDialog = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-key-link</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

               <v-tooltip top>
                <span>Share address</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="currentKeystore"
                    fab
                    dark
                    v-on="on"
                    @click="shareAddressDialog = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-share</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <v-tooltip top>
                <span>Remove</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="currentKeystore"
                    fab
                    dark
                    v-on="on"
                    @click="remove(item)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <v-tooltip top>
                <span>Export wallet</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="currentKeystore"
                    fab
                    dark
                    v-on="on"
                    @click="exportWallet()"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-export</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
            </v-speed-dial>
          </v-btn>

        </template>
      </v-toolbar>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline" v-if="walletType !== 'rsa'"
              >Add new wallet</span
            >
            <span class="headline" v-if="walletType === 'rsa'"
              >Add X509 / RSA</span
            >
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" autocomplete="off">
              <v-expansion-panels v-model="selectedPanel">
                <v-expansion-panel>
                  <v-expansion-panel-header class="display-1"
                    >Type</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="12" v-if="walletType !== 'rsa'">
                        <v-text-field
                          label="Name"
                          value=""
                          v-model="walletDescription"
                          class="input-group--focused"
                        ></v-text-field>

                        <v-text-field
                          v-model="password"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :type="showPassword ? 'text' : 'password'"
                          label="Passphrase"
                          class="input-group--focused"
                          @input="handlePasswordUpdate"
                          @click:append="showPassword = !showPassword"
                          autocomplete="new-password"
                        ></v-text-field>

                        <v-text-field
                          v-model="confirmPassword"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :type="showPassword ? 'text' : 'password'"
                          label="Confirm passphrase"
                          class="input-group--focused"
                          @click:append="showPassword = !showPassword"
                          @input="handlePasswordUpdate"
                          autocomplete="new-password"
                        ></v-text-field>
                      </v-col>
                      <v-col v-if="walletType === 'rsa'" cols="12" md="12">
                        <div>Detalle del certificado de pruebas</div>

                        <v-text-field
                          required
                          v-model="x509Info.commonName"
                          label="Nombre"
                          autocomplete="new-password"
                        ></v-text-field>
                        <v-text-field
                          required
                          hint="Codigo ISO"
                          v-model="x509Info.countryName"
                          label="Pais"
                        ></v-text-field>

                        <v-text-field
                          required
                          v-model="x509Info.stateOrProvinceName"
                          label="Provincia"
                        ></v-text-field>
                        <v-text-field
                          required
                          v-model="x509Info.localityName"
                          label="Ciudad"
                        ></v-text-field>
                        <v-text-field
                          required
                          v-model="x509Info.organizationName"
                          label="Organizacion"
                        ></v-text-field>

                        <v-text-field
                          required
                          v-model="x509Info.organizationalUnitName"
                          label="Unidad Organizacional"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row
                      ><v-col
                        ><v-btn
                          :disabled="disableBtns"
                          color="blue darken-1"
                          text
                          @click="createKeys"
                          >Generate</v-btn
                        ></v-col
                      >
                      <v-col md="12" cols="12">
                        <v-alert text color="blue" v-if="loading">
                          <v-progress-circular
                            indeterminate
                            v-if="loading"
                            color="blue darken-1"
                          ></v-progress-circular>
                          {{ alertMessage }}
                        </v-alert>
                        <v-alert text color="red" v-if="hasErrors">
                          {{ alertMessage }}
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header class="display-1"
                    >Backup</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row v-if="walletType === 'rsa'">
                      <v-col cols="12" md="12">
                        <v-textarea v-model="cert"></v-textarea>
                      </v-col>
                    </v-row>

                    <v-row v-if="walletType !== 'rsa'">
                      <v-row>
                        <v-col>
                          Mnemonic
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div class="display-2">
                            {{ `${mnemonic[0]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[1]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[2]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[3]}  ` }}<span>&nbsp;</span>
                          </div>
                        </v-col>
                        <v-col>
                          <div class="display-2">
                            {{ `${mnemonic[4]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[5]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[6]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[7]}  ` }}<span>&nbsp;</span>
                          </div>
                        </v-col>
                        <v-col>
                          <div class="display-2">
                            {{ `${mnemonic[8]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[9]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[10]}  ` }}<span>&nbsp;</span>
                          </div>
                          <div class="display-2">
                            {{ `${mnemonic[11]}  ` }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-expansion-panel-content></v-expansion-panel
                >
                <!-- <v-expansion-panel>
                      <v-expansion-panel-header class="display-1"
                        >Avanzado</v-expansion-panel-header
                      >
                      <v-expansion-panel-content> </v-expansion-panel-content
                    ></v-expansion-panel> -->
              </v-expansion-panels>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              :disabled="disableBtns"
              text
              @click="close"
              >Cancel</v-btn
            >
            <v-btn
              color="blue darken-1"
              :disabled="disableBtns"
              text
              @click="save"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="setDIDNameDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Enter a wallet name to import DID</span>
          </v-card-title>

          <v-card-text>
            <v-form autocomplete="off">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    required
                    v-model="didName"
                    class="input-group--focused"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="setDIDNameDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="pendingDIDName(didName)"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-list two-line flat style="z-index:-5">
        <v-list-item-group v-model="selected" class="blue--text">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.keystore" @click="currentKeystore = item">
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
                <v-row>
                  <v-col v-if="item.isDefault">
                    <v-icon color="yellow accent-5">
                      mdi-star
                    </v-icon></v-col
                  ><v-col v-if="item.hasRSAKeys">
                    <v-icon color="blue accent-5">
                      mdi-file-lock
                    </v-icon></v-col
                  ><v-col v-if="item.hasLedger">
                    <v-icon color="green accent-5">
                      mdi-link-lock
                    </v-icon></v-col
                  ><v-col v-if="item.hasPKCS11">
                    <v-icon color="pink accent-5">
                      mdi-cellphone-lock
                    </v-icon></v-col
                  >
                </v-row>
              </v-list-item-action>
            </v-list-item>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
      <xdv-link-external-keystore
        v-model="linkExternals"
        :show="linkDialog"
        :keystore="currentKeystore"
        @input="loadWallets"
      >
      </xdv-link-external-keystore>
      <xdv-unlock
        v-model="password"
        :wallet="wallet"
        @load="onUnlock"
      ></xdv-unlock>
  </v-container>
</template>
<script lang="ts">
import {
  Wallet,
  X509,
  LDCryptoTypes,
  DIDDocument,
} from 'xdvplatform-wallet/src';
import { X509Info, KeyConvert } from 'xdvplatform-wallet/src/index';
import { SwarmFeed } from 'xdvplatform-wallet/src/swarm/feed';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { KeystoreIndex, DIDSigner, X509Signer } from '../shared/KeystoreIndex';
import { ethers } from 'ethers';
import moment from 'moment';
import { Session } from '../shared/Session';
import { pubKeyToAddress } from '@erebos/keccak256';
import copy from 'copy-to-clipboard';
import { Subject, forkJoin } from 'rxjs';
import Unlock from '../documents/Unlock.vue';
import { it } from 'ethers/wordlists';


@Component({
  components: {
    'xdv-unlock': Unlock,
  },
})
export default class StakingComponent extends Vue {
  loginDialog: boolean = false;
  alertMessage = '';
  alertType = '';
  disableBtns = false;
  lastDefault: any;
  linkDialog = false;
  pendingDIDName: (name: any) => Promise<void>;
  setDIDNameDialog: boolean = false;
  removeDialog: boolean = false;
  show(e) {
    this.open = false;
    setTimeout(() => {
      this.open = true;
    }, 100);
  }
  loading = false;
  validations: any = { password: false };
  searchResults = [];
  selected = {};
  search = '';
  rsaKey: any = {};
  walletType: string = 'default';
  exportWalletDialog = false;
  valid = false;
  dialog = false;
  x509Info: X509Info = new X509Info();
  open = false;
  walletDescription = '';
  confirmPassword = '';
  showPassword = false;
  password = '';
  currentItem: {
    isDefault?;
    hasPKCS11?;
    hasRSAKeys?;
    hasWalletConnect?;
    hasLedger?;
  } & KeystoreIndex = {} as any;
  mnemonic = [];

  cert = '';
  shareAddressDialog = false;
  linkExternals = {
    defaultDIDSigner: DIDSigner.XDV,
    defaultX509Signer: X509Signer.XDV,
    type: 'walletconnect',
  };
  form = {};
  selectedPanel = 0;
  itemsClone = [];
  hasErrors = false;
  tab = 0;
  item = 1;
  currentKeystore: KeystoreIndex = {} as KeystoreIndex;
  fab = false;
  items: any & KeystoreIndex[] = [
    {
      title: 'No wallets found, please add one',
    },
  ];
  didName = '';
  wallet: Wallet = new Wallet();

  async mounted() {
    if (location.hash.indexOf('did=') > -1) {
      const did = location.hash.split('did=')[1];
      this.setDIDNameDialog = true;
      this.pendingDIDName = (name) => {
        this.setDIDNameDialog = false;
        return Session.resolveAndStoreDID(
          this.wallet,
          decodeURIComponent(did),
          name
        );
      };
    }
    await this.loadWallets();
  }


  async onUnlock() {
    this.loading = true;

    await this.loadSession({ reset: true });
    await this.loadWallets();

    this.loading = false;
  }

  requestSignerActivation(address) {
      // @ts-ignore
      navigator.share(
          {
              title: `XDV - Request signer activation for wallet ${address}`,
              text: ``
          },
          // @ts-ignore
          {
              // @ts-ignore
              copy: true, email: true,
              // @ts-ignore
              whatsapp: true
          }
      );
  }

  async loadSession(options = { reset: false }) {
    this.loading = true;

    // if (ks) await this.wallet.open(ks.keystore);

    this.loading = false;
  }

  addRSA() {
    this.walletType = 'rsa';
    this.dialog = true;
  }
  copyAddress(address) {
    copy(this.currentKeystore.address || address);
  }

  copyMnemonic(){
    copy(this.wallet.mnemonic);
  }

  async remove(item: KeystoreIndex) {
    if (this.removeDialog) {
      await Session.removeWalletRef(this.currentKeystore);
      this.removeDialog = false;
      await this.loadWallets();
    } else {
      this.removeDialog  = true;
    }
  }

  async exportWallet() {
    if (this.exportWalletDialog &&  this.wallet.mnemonic) {
      this.exportWalletDialog = false;
      await this.loadWallets();
    } else {
      await this.wallet.open(this.currentKeystore.keystore);
      this.exportWalletDialog  = true;
    }
  }

  async loadWallets() {
    this.linkDialog = false;
    // @ts-ignore

    const index: KeystoreIndex[] = await Session.getWalletRefs();
    if (!index) return;
    const { currentKeystore, unlock } = await Session.getSessionInfo();

    const promises = index.map(async (i: KeystoreIndex) => {
      let headline = `address ${i.address}`;
      if (!i.address) {
        // rsa
        headline = 'RSA 2048 bits';
      }
      const isDefault =
        currentKeystore &&
        currentKeystore.isDefault &&
        currentKeystore.keystore === i.keystore;
      console.log(currentKeystore.isDefault);
      let hasRSAKeys = await this.hasRSAKeys(i.keystore);
      i.linkedExternalKeystores = i.linkedExternalKeystores || {};
      const hasWalletConnect = !!i.linkedExternalKeystores.walletconnect;
      const hasLedger = !!i.linkedExternalKeystores.ledger;

      this.lastDefault = i.keystore;
      return {
        hasRSAKeys,
        hasWalletConnect,
        hasLedger,
        hasPKCS11: i.linkedExternalKeystores.pkcs11,
        ...i,
        isDefault,
        action: moment(i.created).fromNow(),
        title: i.name,
        headline,
        // subtitle: `id ${(i.keystore || '').substring(0, 8)}...`,
      };
    });

    this.items = await forkJoin(promises).toPromise();
    this.searchResults = index;
  }
  keystoreIndexItem = new KeystoreIndex();

  async setDefault() {
    const id = this.currentKeystore.keystore;
    // await this.wallet.open(id);

    //  this.currentItem.isDefault = true;
    this.lastDefault = id;

    await Session.set({
      ks: {
        ...this.currentKeystore,
        isDefault: true,
      },
    });

    await this.loadWallets();
  }

  async save(item) {
    this.loading = true;
    if (this.walletType !== 'rsa') {
      await Session.setWalletRefs(this.keystoreIndexItem);
      this.keystoreIndexItem = new KeystoreIndex();
    }
    this.dialog = false;
    this.mnemonic = [];
    await this.loadWallets();
    this.loading = false;
    this.walletDescription = '';
    this.password = '';
    this.confirmPassword = '';
  }
  close(item) {
    this.dialog = false;
  }

  async handlePasswordUpdate() {
    if (this.password !== this.confirmPassword) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  async hasRSAKeys(id) {
    try {
      if (!id) return false;
      const rsaKeys = await this.wallet.getImportKey(`import:X509:${id}`);
      console.log(rsaKeys, id);
      return rsaKeys !== null;
    } catch (e) {
      return false;
    }
  }
  @Watch('tab')
  filter(current, old) {
    if (this.itemsClone.length === 0) this.itemsClone = [...this.items];
    const mapping = {
      default: 0,
      did: 1,
      hw: 2,
      cert: 3,
    };
    const type = Object.keys(mapping)[current];
    this.items = this.itemsClone.filter((i) => i.walletType === type);
  }
  async createDID(
    ks: KeystoreIndex,
    swarmKeypair: any,
    wallet: Wallet,
    passphrase: string
  ) {
    const keypairExports = await wallet.getPrivateKeyExports('P256');
    this.alertMessage = 'Connecting to Swarm';
    const swarmFeed = await wallet.getSwarmNodeClient(
      ks.address,
      'ES256K'
      // 'https://ipfs.auth2factor.com/'
    );
    const session = `did:xdv:${swarmFeed.user}`;
    const did = new DIDDocument();
    const pub = { owner: swarmFeed.user, ...keypairExports.ldJsonPublic };
    pub.publicKeyJwk.d = undefined;
    did.id = session;
    did.publicKey = [pub];
    did.authentication = [pub as any];
    const didIndex = { ...did, tag: 'main_did' };
    const references = {
      'index.json': didIndex,
    };

    this.alertMessage = 'Requesting access to publish...';
    const res = await swarmFeed.publishDirectory({
      name: session,
      contents: swarmFeed.toSwarmPayload(references),
      defaultPath: 'index.json',
    });

    Session.set({ ks });
  }

  async createKeys() {
    this.alertType = '';
    this.alertMessage = '';

    this.loading = true;
    this.valid = true;

    this.disableBtns = true;
    const wallet = new Wallet();
    let mnemonic = wallet.mnemonic;
    let keys;
    let id;
    let keystoreIndexItem: KeystoreIndex;
    try {
      switch (this.walletType) {
        case 'rsa':
          this.alertMessage = 'Creating keys...please wait';

          keys = await Wallet.getRSA256Standalone();
          const rsaKeyExports = await KeyConvert.getX509RSA(keys);
          this.alertMessage = 'Creating certificate...please wait';

          const selfSignedCert = X509.createSelfSignedCertificateFromRSA(
            rsaKeyExports.pemAsPrivate,
            rsaKeyExports.pemAsPublic,
            this.x509Info
          );
          id = this.currentKeystore.keystore;
          await this.wallet.setImportKey(`import:X509:${id}`, {
            ...rsaKeyExports,
            selfSignedCert,
          });
          break;
        default:
          if (
            this.walletDescription.length > 0 &&
            this.password === this.confirmPassword
          ) {
            this.alertMessage = 'Creating keys...please wait';
            const w = await wallet.createWallet(this.password, mnemonic);
            id = w.id;

            keystoreIndexItem = {
              created: new Date(),
              name: this.walletDescription,
              keystore: id,
            } as KeystoreIndex;

            this.alertMessage = 'Creating DID...please wait';
            keys = await wallet.getPrivateKey('ES256K');
            keystoreIndexItem.address = pubKeyToAddress(
              keys.getPublic('array')
            );
            this.mnemonic = wallet.mnemonic.split(' ');

            await this.createDID(
              keystoreIndexItem,
              keys,
              wallet,
              this.password
            );
          }
          break;
      }

      this.loading = false;
      this.keystoreIndexItem = keystoreIndexItem;
      this.selectedPanel = 1;

      this.alertMessage = 'Completed';
      setTimeout(() => {
        this.alertMessage = '';
      }, 1500);
      this.disableBtns = false;
    } catch (e) {
      this.valid = false;
      this.alertMessage = e.message;
      this.alertType = 'error';
    } finally {
      this.loading = false;
      this.valid = false;
    }
  }
}
</script>
