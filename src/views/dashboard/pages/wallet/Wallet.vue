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
    <v-dialog v-model="createDataIssuerDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Create data issuer</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            required
            v-model="dataIssuer.name"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            required
            hint="Simbolo"
            v-model="dataIssuer.symbol"
            label="Simbolo"
          ></v-text-field>

          <v-text-field
            required
            v-model="dataIssuer.payment"
            label="Direccion de cobros"
          ></v-text-field>
          <v-text-field
            required
            v-model.number="dataIssuer.price"
            label="Precio"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="createDataIssuerDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="createDataIssuer()"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sendDocumetToDataProviderDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Enviar documenta un proveedero de datos</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            required
            v-model="requestMinting.minterAddress"
            label="Nombre del proveedor de datos"
          ></v-text-field>
          <v-text-field
            required
            hint="Simbolo"
            v-model="requestMinting.minterDid"
            label="DID del proveedor de datos"
          ></v-text-field>

          <v-text-field
            required
            v-model="requestMinting.userDid"
            label="DID del usuario"
          ></v-text-field>
          <v-text-field
            required
            v-model.number="requestMinting.didDoc"
            label="Documento"
            @click="canUpload = true"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="sendDocumetToDataProviderDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="requestMint()"
            >Create</v-btn
          >
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

      <v-card class="mx-auto">
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>DID</b
                ><a target="_blank" :href="currentKeystore.walletRegistry">{{
                  did._id
                }}</a>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Address</b> {{ currentAccount }}
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
            <span>Connect</span>
            <template v-slot:activator="{ on }">
              <v-btn v-if="currentKeystore" v-on="on" @click="connect()" small>
                <v-icon>mdi-key-link</v-icon>
              </v-btn>
            </template></v-tooltip
          >

          <v-tooltip top>
            <span>Create data issuer</span>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="currentKeystore"
                v-on="on"
                @click="createDataIssuer()"
                small
              >
                <v-icon>mdi-bank</v-icon>
              </v-btn>
            </template></v-tooltip
          >
          <v-tooltip top>
            <span>Request Mint</span>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="currentKeystore"
                v-on="on"
                @click="requestMint(item)"
                small
              >
                <v-icon>mdi-merge</v-icon>
              </v-btn>
            </template></v-tooltip
          >

          <v-tooltip top>
            <span>Mint</span>
            <template v-slot:activator="{ on }">
              <v-btn v-if="currentKeystore" v-on="on" @click="mint()" small>
                <v-icon>mdi-gold</v-icon>
              </v-btn>
            </template></v-tooltip
          >

          <v-tooltip top>
            <span>Burn</span>
            <template v-slot:activator="{ on }">
              <v-btn v-if="currentKeystore" v-on="on" @click="burn()" small>
                <v-icon>mdi-fire</v-icon>
              </v-btn>
            </template></v-tooltip
          >
        </v-card-actions>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
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
    <xdv-upload
      :loading="loading"
      :show="canUpload"
      v-model="files"
      @input="createDocumentNode"
    ></xdv-upload>
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
import { DriveManager } from "../wallet/DriveManager";
import { DID } from "dids";
import { WalletResolver } from "./WalletResolver";
import { BigNumber } from "ethers/utils";
import { window } from "rxjs/operators";
import Upload from "../documents/Upload.vue";
import Web3 from 'web3';
import * as encUtils from 'enc-utils';

const contracts = require("./contracts");

@Component({
  components: {
    "xdv-unlock": Unlock,
    "xdv-drive": Drive,
    "xdv-link-external-keystore": LinkExternalKeystore,
    "xdv-upload": Upload,
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
  files: File[] = [];
  avatar: any = null;
  canUpload = false;
  dataIssuer = {
    name: "",
    symbol: "",
    payment: "",
    price: 0,
  };
  currentAccount: any = '';
  requestMinting = {
    minterAddress: null,
    minterDid: null,
    userDid: null,
    didDoc: null
  };
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
  createDataIssuerDialog = false;
  sendDocumetToDataProviderDialog = false;
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
  bscWallet: ethers.Wallet;
  oauthUniqueId = "";
  nftContracts = { DAI: null, DocumentAnchoring: null, NFTFactory: null };
  headers = [
    {
      text: "Nombre",
      value: "name",
    },
    { text: "Simbolo", value: "symbol" },
    { text: "Direccion de cobros", value: "address" },
    { text: "Precio", value: "price" },
    { text: "Fecha", value: "created" },
  ];

  async destroyed() {
    await this.ipfs.stop();
  }

  async beforeMount() {
    this.ipfs = new IPFSManager();
    this.didManager = new DIDManager();
    await this.ipfs.start();

    BinanceChain.on("accountsChanged", async (accounts) => {
      if (accounts.length === 0) {
        // Binance Chain Wallet is locked or the user has not connected any accounts
        console.log("Please connect to Binance Chain Wallet.");
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = accounts[0];
        await this.onContractConnect();
      }
    });
  }

  async connect() {
    try {
      this.currentAccount = (await BinanceChain.enable())[0];
      await this.onContractConnect();
      await this.createDataWallet();
    } catch (error) {
      console.log(error);
    }
  }

  async createDataWallet() {
    if(!localStorage.getItem(this.currentAccount)){
      const wallet = new Wallet();
      const password = this.walletPassword;
      const mnemonic = ethers.Wallet.createRandom();
      wallet.createWallet(password, mnemonic.mnemonic);
    }
  }

  async onContractConnect() {
    const provider = new ethers.providers.Web3Provider(BinanceChain);
    this.did = await this.didManager.create3ID(this.currentAccount);
    
    this.driveManager = new DriveManager(this.ipfs,this.did);

    localStorage.setItem("did:" + this.currentAccount, this.did.id);
    // wallet.connect()
    this.nftContracts.NFTFactory = new ethers.Contract(
      contracts.NFTFactory.address.bsctestnet,
      contracts.NFTFactory.raw.abi,
      provider.getSigner()
    );
    this.nftContracts.DocumentAnchoring = new ethers.Contract(
      contracts.DocumentAnchoring.address.bsctestnet,
      contracts.DocumentAnchoring.raw.abi,
      provider.getSigner()
    );
    this.nftContracts.DAI = new ethers.Contract(
      contracts.TestDAI.address.bsctestnet,
      contracts.TestDAI.raw.abi,
      provider.getSigner()
    );

    // const res = await this.nftContracts.DAI.mint(
    //   this.currentKeystore.address,
    //   '2' + '0'.repeat(19)
    // );
    console.log(await provider.getBalance(this.currentAccount));
    // await res.wait()
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
      this.wallet as any,
      (message) => console.log
    );
    this.did = did;
    await this.loadWallets();
    this.loading = false;
  }

  async createDataIssuer() {
    if (this.createDataIssuerDialog) {
      const res = await this.nftContracts.NFTFactory.createMinter(
        ethers.utils.toUtf8Bytes(this.dataIssuer.name),
        ethers.utils.toUtf8Bytes(this.dataIssuer.symbol),
        this.dataIssuer.payment,
        this.dataIssuer.price.toString() +
          "0".repeat(19 - this.dataIssuer.price.toString().length)
      );
      await res.wait();
      const web3 = new Web3(BinanceChain);
      
      const receipt = await web3.eth.getTransactionReceipt(res.hash);
      
      const documentMinterAddress = '0x' + receipt.logs[0].data.substr(26,40);
      debugger;
      //this.items.push(documentMinterAddress);
      console.log('documentMinterAddress ', documentMinterAddress);
      this.createDataIssuerDialog = false;
    } else {
      this.createDataIssuerDialog = true;
    }
  }

  // make the request to data provider
  async requestMint() {
    if(this.sendDocumetToDataProviderDialog){
      const res = await this.nftContracts.DocumentAnchoring.requestMint(
         this.requestMinting.minterAddress,
         this.requestMinting.minterDid,
         this.requestMinting.userDid,
         false,
         this.requestMinting.didDoc
       );
      await res.wait();
    }
    else{
      const did = localStorage.getItem("did:" + this.currentAccount);
      this.requestMinting.minterDid = did;
      this.requestMinting.userDid = did;
    }
    this.sendDocumetToDataProviderDialog = !this.sendDocumetToDataProviderDialog;
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

  async createKeys() {
    this.isSignIn = false;
    setImmediate(() => (this.disableBtns = true));
    this.alertType = "";
    this.alertMessage = "";
    this.canCreateWallet = true;
    this.canShowMnemonic = false;
    this.loading = true;
    this.valid = true;

    const accounts = new SwarmAccounts({
      tokenName: "gas",
      swarmGateway: "https://swarm.fairdatasociety.org",
      ethGateway:
        "https://mainnet.infura.io/v3/92ed13edfad140409ac24457a9c4e22d",
      faucetAddress: "https://faucet-noordung.fairdatasociety.org/gimmie",
      // chainID: '235813',
      httpTimeout: 1000,
      gasPrice: 0.1,
      ensConfig: {
        domain: "datafund.eth",
        registryAddress: "0xA1029cb176082eca658A67fD6807B9bDfB44A695",
        subdomainRegistrarAddress: "0x0E6a3B5f6800145bAe95C48934B7b5a90Df50722",
        resolverContractAddress: "0xC91AB84FFad79279D47a715eF91F5fbE86302E4D",
      },
    });

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
        const { xdv } = await accounts.createWallet(
          this.oauthUniqueId,
          this.password
        );
        id = xdv.id;
        keystoreIndexItem = {
          created: new Date(),
          name: this.oauthUniqueId,
          keystore: id,
          description: this.walletDescription,
        } as KeystoreIndex;

        this.alertMessage =
          "Creating DID (Decentralized Identity)...please wait";
        keys = await xdv.getPrivateKey("ES256K");
        keystoreIndexItem.address = pubKeyToAddress(keys.getPublic("array"));

        const did = await this.didManager.create3ID(
          xdv as any,
          (m) => (this.alertMessage = m)
        );
        const publicWallet = {
          wallet: {
            did: did.id,
            address: {
              ES256K: keystoreIndexItem.address,
            },
            publicKeys: {
              P256: (await xdv.getPrivateKeyExports("P256")).ldJsonPublic
                .publicKeyJwk,
              ES256K: (await xdv.getPrivateKeyExports("ES256K")).ldJsonPublic
                .publicKeyJwk,
              ED25519: (await xdv.getPrivateKeyExports("ED25519")).ldJsonPublic
                .publicKeyBase58,
            },
          },
        };
        // remove pvk
        publicWallet.wallet.publicKeys.P256.d = undefined;
        publicWallet.wallet.publicKeys.ES256K.d = undefined;

        // create new key
        const ipfsKey = await this.ipfs.createKey(
          this.oauthUniqueId,
          this.password
        );
        const cid = await this.ipfs.addIndex(did, [
          Buffer.from(JSON.stringify(publicWallet)),
        ]);
        keystoreIndexItem.name = this.oauthName;
        // todo: corregir url construct
        keystoreIndexItem.walletRegistry = `https://ipfs.io/ipfs/${cid}`;
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

  driveManager: DriveManager;
  async createDocumentNode() {
    this.loading = true;
    const indexes = await this.driveManager.appendDocumentSet(this.files);
    console.log(indexes);

    this.requestMinting.didDoc = 'http://ipfs.io/ipns/' + indexes;
    this.loading = false;
    this.canUpload = false;
    this.close();
  }
}
</script>
`