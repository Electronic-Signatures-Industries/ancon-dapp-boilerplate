w<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo accent-4"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertType.length > 0">{{
      alertMessage
    }}</v-alert>

    <v-card class="mx-auto" tile>
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
          label="Search wallet or add DID"
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
          <v-btn color="red" dark small absolute bottom right fab>
            <v-speed-dial transition="slide-y" v-model="fab" direction="left"
              ><template v-slot:activator>
                <v-icon>mdi-plus</v-icon>
              </template>
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
                <span>Copy address</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    v-if="selected"
                    dark
                    v-on="on"
                    @click="openImportDialog(item)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-clipboard</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

              <v-tooltip top>
                <span>Import wallet</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="selected"
                    fab
                    dark
                    v-on="on"
                    @click="openImportDialog(item)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-import</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
              <v-tooltip top>
                <span>Export wallet</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="selected"
                    fab
                    dark
                    v-on="on"
                    @click="openImportDialog(item)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-export</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
            </v-speed-dial>
          </v-btn>
          <v-tabs v-model="tab" @change="filter" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab>
              Wallets
            </v-tab>
            <v-tab>
              Hardware / Imported Wallets
            </v-tab>
            <v-tab>
              Public DIDs
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Add new wallet</span>
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
                      <v-col cols="12" md="6">
                        <v-radio-group v-model="walletType" column>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-radio
                                v-on="on"
                                class="font-weight-medium"
                                label="Qualified Signature (Self Signed)"
                                color="red"
                                value="rsa"
                              ></v-radio>
                            </template>
                            <span>RSA, 2048 bits</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-radio
                                v-on="on"
                                class="font-weight-medium"
                                label="Decentralized Identity"
                                color="orange"
                                value="default"
                              ></v-radio>
                            </template>
                            <span>default</span>
                          </v-tooltip>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12" md="5">
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
                          Mnemonico
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
      <xdv-unlock :show="canUnlock" v-model="password"></xdv-unlock>
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="blue lighten-5"
          class="blue--text"
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.keystore">
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
                <!-- <v-icon @click="exportToPublic(item)" color="green lighten-1">
                  mdi-export
                </v-icon> -->
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
  X509Info,
  Wallet,
  X509,
  KeyConvert,
  LDCryptoTypes,
  DIDDocument,
} from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import { ethers } from 'ethers';
import moment from 'moment';
import { Session } from './Session';
import { pubKeyToAddress } from '@erebos/keccak256';
import copy from 'copy-to-clipboard';
import { Subject } from 'rxjs';
import Unlock from './Unlock.vue';

@Component({
  components: {
    'xdv-unlock': Unlock,
  },
  watch: {
    async search(val) {
      if (val && val.indexOf('did:xdv:') === 0) {
        this.loading = true;
        // fetch DID
        await Session.resolveAndStoreDID(this.wallet, val);
        await this.loadWallets();
        this.loading = false;
      } else {
        // no op
      }
    },
  },
})
export default class WalletComponent extends Vue {
  loginDialog: boolean = false;
  alertMessage = '';
  alertType = '';
  disableBtns = false;
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
  keystore: any | Wallet = null;
  rsaKey: any = {};
  walletType: string = '';
  valid = false;
  dialog = false;
  x509Info: X509Info = new X509Info();
  open = false;
  walletDescription = '';
  confirmPassword = '';
  showPassword = false;
  password = '';
  mnemonic = [];
  cert = '';
  form = {};
  selectedPanel = 0;
  itemsClone = [];
  hasErrors = false;
  canUnlock = false;
  tab = 0;
  item = 1;
  fab = false;
  items = [
    {
      title: 'No wallets found, please add one',
    },
  ];

  wallet: Wallet = new Wallet();
  passphraseSubject: Subject<any> = new Subject();

  async mounted() {
    const has = await Session.hasWalletRefs();
    if (!has) return;
    await this.loadWallets();

    this.wallet.onRequestPassphraseSubscriber.subscribe(async (i) => {
      this.canUnlock = true;
      this.loading = true;
      if (i.type === 'wallet') {
        this.passphraseSubject.subscribe((passphrase) =>
          this.wallet.onRequestPassphraseWallet.next({ type: 'ui', passphrase })
        );
      } else {
        this.canUnlock = false;
        this.loading = false;
      }
    });

    //  await this.loadSession();
  }

  copyAddress(address) {
    copy(address);
  }

  async loadWallets() {
    const index = await Session.getWalletRefs();
    if (!index) return;
    this.items = index.map((i) => {
      let headline = `address ${i.address}`;
      if (!i.address) {
        // rsa
        headline = 'RSA 2048 bits';
      }
      return {
        action: moment(i.created).fromNow(),
        title: i.name,
        headline,
        // subtitle: i.,
      };
    });

    this.searchResults = index;
  }
  keystoreIndexItem = new KeystoreIndex();

  async save(item) {
    this.loading = true;

    await Session.setWalletRefs(this.keystoreIndexItem);

    this.dialog = false;
    this.mnemonic = [];
    this.keystoreIndexItem = new KeystoreIndex();
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

  filter() {
    if (this.itemsClone.length === 0) this.itemsClone = [...this.items];
    const mapping = {
      default: 0,
      rsa: 1,
      fe: 2,
      vc: 3,
    };
    const type = Object.keys(mapping)[this.tab];
    this.items = this.itemsClone.filter((i) => i.walletType === type);
  }
  async createDID(
    ks: KeystoreIndex,
    swarmKeypair: any,
    wallet: Wallet,
    passphrase: string
  ) {
    const keypairExports = await wallet.getPrivateKeyExports('P256');
    this.alertMessage =
      'Connecting to Swarm at https://ipfs.auth2factor.com/...';
    const swarmFeed = await wallet.getSwarmNodeClient(
      ks.address,
      'ES256K',
      'https://ipfs.auth2factor.com/'
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

    Session.set(ks);
  }

  async createKeys() {
    this.loading = true;
    this.valid = true;
    if (
      this.walletDescription.length > 0 &&
      this.password === this.confirmPassword
    ) {
      const wallet = new Wallet();
      let mnemonic = wallet.mnemonic;
      let keys;
      let keystoreIndexItem: KeystoreIndex;
      try {
        this.disableBtns = true;
        this.alertMessage = 'Creating keys...please wait';
        let { id } = await wallet.createWallet(this.password, null, mnemonic);
        this.passphraseSubject.next(this.password);

        if (this.walletType === 'default') {
          keystoreIndexItem = {
            created: new Date(),
            name: this.walletDescription,
            keystore: id,
          } as KeystoreIndex;

          this.alertMessage = 'Creating DID...please wait';
          const keys = await wallet.getPrivateKey('ES256K');
          keystoreIndexItem.address = pubKeyToAddress(keys.getPublic('array'));
          await this.createDID(keystoreIndexItem, keys, wallet, this.password);
        }
        this.mnemonic = wallet.mnemonic.split(' ');

        if (this.walletType === 'rsa') {
          const keys = await Wallet.getRSA256Standalone();
          const rsaKeyExports = await KeyConvert.getX509RSA(keys);
          const selfSignedCert = X509.createSelfSignedCertificateFromRSA(
            rsaKeyExports.pemAsPrivate,
            rsaKeyExports.pemAsPublic,
            this.x509Info
          );

          await this.wallet.setImportKey(
            `import:X509:${this.walletDescription}`,
            rsaKeyExports.pemAsPrivate
          );

          this.cert = rsaKeyExports.pemAsPrivate;
          keystoreIndexItem = {
            created: new Date(),
            name: this.walletDescription,
            keystore: `:import:X509:${this.walletDescription}`,
          } as KeystoreIndex;
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

        console.log(e);
        this.alertMessage = e.message;
        this.alertType = 'error';
        setTimeout(() => {
          this.loading = false;
          this.dialog = false;
          this.alertMessage = '';
        }, 1500);
      }
    }
  }

  async handleRsaWallet() {
    if (this.walletType === 'rsa') {
      this.keystore = await Wallet.getRSA256Standalone();
    }
  }
}
</script>
