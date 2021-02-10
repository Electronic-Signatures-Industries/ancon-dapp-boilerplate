`<template>
  <v-container fluid class="down-top-padding">
    <v-dialog v-model="removeDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Remove wallet request</span>
        </v-card-title>

        <v-card-text> Continue with removing selected wallet? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="removeDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="remove()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="shareAddressDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Share Address</span>
        </v-card-title>

        <v-card-text>
          <qrcode
            value="currentKeystore.address"
            :options="{ width: 200 }"
          ></qrcode>
          {{ currentKeystore.address }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="shareAddressDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="copyAddress()">Copy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="exportWalletDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Export</span>
        </v-card-title>

        <v-card-text>
          <qrcode value="wallet.mnemonic" :options="{ width: 200 }"></qrcode
          ><br />
          {{ wallet.mnemonic }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="exportWalletDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="copyMnemonic()">Copy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="googleOnboarding" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Sign In with Google</span>
        </v-card-title>

        <v-card-text> </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="googleOnboarding = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="copyMnemonic()">Sign</v-btn>
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
    <v-alert
      ><a
        href="https://drive.google.com/file/d/1oZCZChHmedtne3E1M7wyvyQLWQm01Z1r/view?usp=sharing"
        target="_blank"
        >Download PKCS#11 Java Signer</a
      ></v-alert
    >
    <v-card>
      <!-- <v-toolbar color="black accent-4" dark>
        <v-toolbar-title>Wallet</v-toolbar-title>
      </v-toolbar> -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-form v-model="valid" autocomplete="off">
          <v-card v-if="canCreateWallet">
            <v-card-title>
              <span class="headline" v-if="walletType !== 'rsa'"
                >Add new wallet</span
              >
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" md="12" v-if="walletType !== 'rsa'">
                  <v-row v-if="avatar">
                    <v-col cols="1" md="1">
                      <v-avatar color="primary" size="56">
                        <v-img :src="avatar"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" md="11">
                      <h3>{{ walletDescription }}</h3>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Passphrase"
                    class="input-group--focused"
                    @input="handlePasswordUpdate"
                    @click:append="showPassword = !showPassword"
                    autocomplete="new-password"
                  ></v-text-field>

                  <v-text-field
                    v-model="confirmPassword"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
              <v-row>
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
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="blue darken-1"
                :disabled="isSignIn"
                text
                @click="signInGoogle"
                >Sign in With Google</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn
                color="blue darken-1"
                :disabled="!isSignIn"
                text
                @click="createKeys"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
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
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-list-item>
              <v-list-item-avatar>
                <v-tooltip top>
                  <span>Create wallet</span>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" @click="openDialog" small>
                      <v-icon>mdi-wallet-plus</v-icon>
                    </v-btn>
                  </template></v-tooltip
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row
                  ><v-col>
                    <v-select
                      v-model="currentKeystore"
                      :items="items"
                      :loading="loading"
                      item-text="headline"
                      return-object
                      chips
                      @change="setWallet"
                    ></v-select> </v-col
                ></v-row>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="mx-auto">
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content class="text--primary">
                      <b>DID</b
                      ><a
                        target="_blank"
                        :href="currentKeystore.walletRegistry"
                        >{{ did._id }}</a
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content class="text--primary">
                      <b>Address</b> {{ currentAddress }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content class="text--primary">
                      <b>Linked to Smart Card</b>
                      {{ getP11Name(currentKeystore) }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content class="text--primary">
                      <b>Linked to P12</b>
                      {{ getP12Name(currentKeystore) }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content class="text--primary">
                      <b>Created</b> {{ new Date(currentKeystore.created) }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-tooltip top>
                  <span>Link external</span>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-if="currentKeystore"
                      v-on="on"
                      @click="linkDialog = true"
                      small
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
                      v-on="on"
                      @click="shareAddressDialog = true"
                      small
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
                      v-on="on"
                      @click="remove(item)"
                      small
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
                      v-on="on"
                      @click="exportWallet()"
                      small
                    >
                      <v-icon>mdi-export</v-icon>
                    </v-btn>
                  </template></v-tooltip
                >
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <xdv-drive
        :updateWallet="currentKeystore"
        :wallet="wallet"
        :currentAddress="currentAddress"
        :did="did"
        :mode="'integrated'"
        :contract="contract"
        :daiContract="daiContract"
        :web3="web3"
      ></xdv-drive>
    </v-card>
    <xdv-link-external-keystore
      v-model="linkExternals"
      :wallet="wallet"
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
} from "xdvplatform-wallet/src";
import { X509Info, KeyConvert } from "xdvplatform-wallet/src/index";
import { SwarmFeed } from "xdvplatform-wallet/src/swarm/feed";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeystoreIndex, DIDSigner, X509Signer } from "../shared/KeystoreIndex";
import { ethers } from "ethers";
import moment from "moment";
import { Session } from "../shared/Session";
import { pubKeyToAddress } from "@erebos/keccak256";
import copy from "copy-to-clipboard";
import { Subject, forkJoin } from "rxjs";
import Unlock from "../documents/Unlock.vue";
import LinkExternalKeystore from "./LinkExternalKeystore.vue";
import { it } from "ethers/wordlists";
import Drive from "../documents/Drive.vue";
import { DIDManager } from "./DIDManager";
import { IPFSManager } from "./IPFSManager";
import { DID } from "dids";
import { WalletResolver } from "./WalletResolver";
import Web3 from "web3";
import { BigNumber } from "ethers/utils";
const Venus = require('@swipewallet/venus-js'); // in Node.js
const xdvAbi = require('../../../../abi/xdv');

@Component({
  components: {
    "xdv-unlock": Unlock,
    "xdv-drive": Drive,
    "xdv-link-external-keystore": LinkExternalKeystore,
  },
})
export default class WalletComponent extends Vue {
  did: DID = {} as any;
  loginDialog: boolean = false;
  canShowMnemonic: boolean = false;
  canCreateWallet: boolean = true;
  alertMessage = "";
  alertType = "";
  disableBtns = false;
  lastDefault: any;
  linkDialog = false;
  pendingDIDName: (name: any) => Promise<void>;
  setDIDNameDialog: boolean = false;
  removeDialog: boolean = false;
  isSignIn: any = false;
  oauthName: any = null;
  avatar: any = null;
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
  search = "";
  rsaKey: any = {};
  walletType: string = "default";
  exportWalletDialog = false;
  valid = false;
  dialog = false;
  x509Info: X509Info = new X509Info();
  open = false;
  walletDescription = "";
  confirmPassword = "";
  showPassword = false;
  password = "";
  currentItem: {
    isDefault?;
    hasPKCS11?;
    hasRSAKeys?;
    hasWalletConnect?;
    hasLedger?;
  } & KeystoreIndex = {} as any;
  mnemonic = [];
  googleOnboarding = false;
  cert = "";
  shareAddressDialog = false;
  linkExternals = {
    defaultDIDSigner: DIDSigner.XDV,
    defaultX509Signer: X509Signer.XDV,
    type: "walletconnect",
  };
  form = {};
  selectedPanel = 0;
  itemsClone = [];
  hasErrors = false;
  tab = 0;
  item = 1;
  currentKeystore: KeystoreIndex = {} as KeystoreIndex;
  currentAddress = "";
  blockchainWallet: any;
  contract: any = {};
  daiContract: any = {};
  fab = false;
  items: any & KeystoreIndex[] = [
    {
      title: "No wallets found, please add one",
    },
  ];
  didName = "";
  wallet: Wallet = new Wallet();
  ipfs: IPFSManager;
  didManager: DIDManager;
  oauthUniqueId = "";
  web3: Web3;

  async mounted() {
    this.ipfs = new IPFSManager();
    this.didManager = new DIDManager();

    let { currentKeystore, unlock } = await Session.getSessionInfo();
    if (currentKeystore === null) {
      this.dialog = true;
      return;
    }

    await this.wallet.open(currentKeystore.keystore);
  }

  openDialog() {
    this.dialog = true;
    this.password = "";
    this.confirmPassword = "";
  }

  getP11Name() {
    if (
      this.currentKeystore &&
      this.currentKeystore.linkedExternalKeystores &&
      this.currentKeystore.linkedExternalKeystores.pkcs11
    ) {
      return this.currentKeystore.linkedExternalKeystores.pkcs11.tokenIndex;
    }
    return "no";
  }

  getP12Name() {
    if (
      this.currentKeystore &&
      this.currentKeystore.linkedExternalKeystores &&
      this.currentKeystore.linkedExternalKeystores.pkcs12
    ) {
      return (
        this.currentKeystore.linkedExternalKeystores.pkcs12.name ||
        "No name found"
      );
    }
    return "no";
  }

  async onUnlock() {
    this.loading = true;
    const did: any = await this.didManager.create3ID(
      this.wallet as any
    );
    this.ipfs = new IPFSManager();
    this.did = did;
    
    await this.loadWallets();
    this.loading = false;
    
    const web3_data = (await this.getWeb3());
    this.web3 = web3_data.web3;
    const daiContractAddress = '0x960A3e3be97A1Ee4108e25e5F4D9cB530B1Aabe1';
    const xdvContractAddress = '0xc00ddc4eDaCca318a1a41319C0D801c9FF567374';

    this.contract = new this.web3.eth.Contract(xdvAbi.XDVDocumentAnchoring.raw.abi, xdvContractAddress
        /*xdvAbi.XDVDocumentAnchoring.address.bsctestnet*/);
    this.daiContract = new this.web3.eth.Contract(xdvAbi.DAI.raw.abi, daiContractAddress);
    debugger;
  }

  requestSignerActivation(address) {
    // @ts-ignore
    navigator.share(
      {
        title: `XDV - Request signer activation for wallet ${address}`,
        text: ``,
      },
      // @ts-ignore
      {
        // @ts-ignore
        copy: true,
        email: true,
        // @ts-ignore
        whatsapp: true,
      }
    );
  }

  addRSA() {
    this.walletType = "rsa";
    this.dialog = true;
  }
  copyAddress(address) {
    copy(this.currentKeystore.address || address);
  }

  copyMnemonic() {
    copy(this.wallet.mnemonic);
  }

  async remove(item: KeystoreIndex) {
    if (this.removeDialog) {
      await Session.removeWalletRef(this.currentKeystore);
      this.removeDialog = false;
      await this.loadWallets();
    } else {
      this.removeDialog = true;
    }
  }

  async exportWallet() {
    if (this.exportWalletDialog && this.wallet.mnemonic) {
      this.exportWalletDialog = false;
      await this.loadWallets();
    } else {
      await this.wallet.open(this.currentKeystore.keystore);
      this.exportWalletDialog = true;
    }
  }

  async loadWallets() {
    this.linkDialog = false;
    // @ts-ignore
    let { currentKeystore, unlock } = await Session.getSessionInfo();
    if (currentKeystore === null) {
      this.dialog = true;
      return;
    }

    //    this.googleOnboarding = true;

    const index: any = await Session.getWalletRefs();

    const promises = index.map(async (i: KeystoreIndex) => {
      let headline = i.name;

      if (!i.name) {
        headline = `address ${i.address.substring(
          0,
          5
        )}...${i.address.substring(i.address.length - 5, i.address.length)}`;
      }
      if (!i.address) {
        // rsa
        headline = "RSA 2048 bits";
      }
      const isDefault =
        currentKeystore &&
        currentKeystore.isDefault &&
        currentKeystore.keystore === i.keystore;
      let hasRSAKeys = await this.hasRSAKeys(i.keystore);
      i.linkedExternalKeystores = i.linkedExternalKeystores || {};
      const hasWalletConnect = !!i.linkedExternalKeystores.walletconnect;
      const hasLedger = !!i.linkedExternalKeystores.ledger;
      this.lastDefault = i.keystore;
      return {
        hasRSAKeys,
        hasWalletConnect,
        hasLedger,
        hasPKCS11: !!i.linkedExternalKeystores.pkcs11,
        hasPKCS12: !!i.linkedExternalKeystores.pkcs12,
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
    this.currentKeystore = this.items.find(
      (i) => i.keystore === currentKeystore.keystore
    );
  }
  keystoreIndexItem = new KeystoreIndex();

  async setWallet() {
    await Session.set({
      ks: {
        ...this.currentKeystore,
        isDefault: true,
      },
    });
    await this.wallet.open(this.currentKeystore.keystore);
  }

  async save(item) {
    this.loading = true;

    if (this.walletType !== "rsa") {
      await Session.setWalletRefs(this.keystoreIndexItem);
      await Session.set({
        ks: {
          ...this.keystoreIndexItem,
          isDefault: true,
        },
      });
      this.keystoreIndexItem = new KeystoreIndex();
    }
    this.dialog = false;
    this.mnemonic = [];

    await this.loadWallets();
    this.loading = false;
    this.walletDescription = "";
    this.password = "";
    this.confirmPassword = "";
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

  async signInGoogle() {
    if (!this.isSignIn) {
      const googleUser = await this.$gAuth.signIn();
      const oauthId = googleUser.getId();
      const profile = googleUser.getBasicProfile();
      this.isSignIn = this.$gAuth.isAuthorized;

      this.walletDescription = profile.getName();
      this.oauthName = profile.getEmail().split(`@`)[0];
      this.avatar = profile.getImageUrl();
      this.oauthUniqueId = profile.getEmail();
    }
  }

  async getWeb3(){
    // Init with HD mnemonic (server side)
    const network = {
      name: 'Chapel',
      networkId: 10,
      chainId: 10,
    };
    const providerUrl = 'http://127.0.0.1:8545'; //'https://data-seed-prebsc-1-s1.binance.org:8545';
    const web3 = new Web3(providerUrl);
    const private_key = '5ad53543cdbffb2aba59777b93ec1f97dc3c0c09293ffe24f466d733f95e10a7'; //(await wallet.getPrivateKey("ES256K")).getPrivate("hex");
    web3.eth.accounts.wallet.add(private_key);
    this.currentAddress = '0xA83B070a68336811e9265fbEc6d49B98538F61EA'; // web3.eth.accounts.privateKeyToAccount(private_key);

    return {web3};
  }

  async createKeys() {
    this.isSignIn = false;
    setImmediate(() => (this.disableBtns = true));
    this.alertType = "";
    this.alertMessage = "";
    this.canCreateWallet = true;
    this.canShowMnemonic = false;
    this.loading = true;
    this.valid = true;

    const wallet = new Wallet();
    let { phrase } = Wallet.generateMnemonic() as any;
    let keys;
    let id;
    let keystoreIndexItem: KeystoreIndex;
    try {
      this.walletDescription = "description";
      if (
        this.walletDescription.length > 0 &&
        this.password === this.confirmPassword
      ) {
        this.alertMessage = "Creating keys...please wait";
        const w = await wallet.createWallet(this.password, phrase);
        id = w.id;

        keystoreIndexItem = {
          created: new Date(),
          name: this.oauthUniqueId,
          keystore: id,
          description: this.walletDescription,
        } as KeystoreIndex;


        this.currentAddress = wallet.ethersWallet.address;//blockchainWallet.address;
        this.blockchainWallet = wallet.ethersWallet;//blockchainWallet;

        this.alertMessage =
          "Creating DID (Decentralized Identity)...please wait";
        keystoreIndexItem.address = this.currentAddress;//pubKeyToAddress(keys.getPublic("array"));
        //this.contract = new ethers.Contract(xdvAbi.XDVDocumentAnchoring.address.bsctestnet, xdvAbi.XDVDocumentAnchoring.raw.abi, provider.getSigner());
        this.did = await this.didManager.create3ID(
          wallet as any
        );
        keystoreIndexItem.name = this.oauthName;
        Session.set({ ks: keystoreIndexItem });
      }

      this.loading = false;
      this.keystoreIndexItem = keystoreIndexItem;
      await this.save(this.keystoreIndexItem);
      this.alertMessage = "Completed";
      setTimeout(() => {
        this.alertMessage = "";
      }, 2500);
      this.disableBtns = false;
    } catch (e) {
      console.log(e);
      this.valid = false;
      this.alertMessage = e.message;
      this.alertType = "error";
    } finally {
      this.loading = false;
      this.valid = false;
    }
  }
}
</script>
`