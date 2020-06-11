w<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="blue accent-4"
    ></v-progress-linear>
    <v-card class="mx-auto" tile>
      <v-toolbar color="blue" dark>
        <v-toolbar-title>Cartera Digital</v-toolbar-title>

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
          label=""
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Buscar carteras o agregar DID
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
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="red" dark small absolute bottom left fab>
                <v-icon v-on="on">mdi-wallet-plus</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Nueva cartera digital</span>
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" autocomplete="off">
                  <v-expansion-panels v-model="selectedPanel">
                    <v-expansion-panel>
                      <v-expansion-panel-header class="display-1"
                        >Tipo de cartera</v-expansion-panel-header
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
                                    label="Firma Calificada (Pruebas)"
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
                                    label="Blockchain e Identidad Digital"
                                    color="orange"
                                    value="secp256k1"
                                  ></v-radio>
                                </template>
                                <span>secp256k1</span>
                              </v-tooltip>
                            </v-radio-group>
                          </v-col>
                          <v-col cols="12" md="5">
                            <v-text-field
                              label="Nombre de cartera"
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
                              label="Clave"
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
                              label="Confirmar clave"
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
                              :disabled="!valid"
                              color="blue darken-1"
                              text
                              @click="createKeys"
                              >Generar llaves</v-btn
                            ></v-col
                          ></v-row
                        >
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="display-1"
                        >Backup</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-row v-if="walletType === 'rsa'">
                          <v-col cols="12" md="12">
                            <v-textarea
                              v-model="keystoreIndexItem.keystore.cert"
                            ></v-textarea>
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
                    <v-expansion-panel>
                      <v-expansion-panel-header class="display-1"
                        >Avanzado</v-expansion-panel-header
                      >
                      <v-expansion-panel-content> </v-expansion-panel-content
                    ></v-expansion-panel>
                  </v-expansion-panels>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  :disabled="!valid"
                  text
                  @click="save"
                  >Guardar</v-btn
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
          active-class="blue lighten-5"
          class="blue--text"
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="index">
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
  X509Info,
  Wallet,
  X509,
  KeyConvert,
  LDCryptoTypes,
  DIDDocument,
} from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import { ethers } from 'ethers';
import moment from 'moment';
import { DriveSession } from './DriveSession';
import { JWK } from 'node-jose';
import { pubKeyToAddress } from '@erebos/keccak256';
import { AlgorithmType } from './AlgorithmType';
import copy from 'copy-to-clipboard';

@Component({
  watch: {
    async search(val) {
      if (val && val.indexOf('did:xdv:') === 0) {
        this.loading = true;
        // fetch DID
        await DriveSession.resolveAndStoreDID(val);
        this.loading = false;
      } else {
        // no op
      }
    },
  },
})
export default class WalletComponent extends Vue {
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
  selectedPanel = 0;
  itemsClone = [];
  tab = 0;
  item = 1;
  items = [
    {
      title: 'No hay carteras digitales',
    },
  ];

  async mounted() {
    this.loading = true;
    this.loadWallets();
    this.keystoreIndexItem.keystore = {};
    this.loading = false;
    this.walletType = 'rsa';
  }

  copyAddress(address) {
    copy(address);
  }

  loadWallets() {
    const index = KeystoreIndex.getIndex();
    this.items = index.map((i) => {
      return {
        action: moment(i.created).fromNow(),
        title: i.name,

        headline: `algoritmo ${i.algorithm}`,
        // subtitle: i.,
      };
    });

    this.searchResults = index;
  }
  keystoreIndexItem = new KeystoreIndex();
  save(item) {
    this.loading = true;
    // Get Key Store Index
    const localkeystoreIndex = KeystoreIndex.getIndex();

    // store
    KeystoreIndex.setIndex([...localkeystoreIndex, this.keystoreIndexItem]);
    this.dialog = false;
    this.mnemonic = [];
    this.keystoreIndexItem = new KeystoreIndex();
    this.loadWallets();
    this.loading = false;
    //   this.model = { ...item };
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
      secp256k1: 0,
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
    //  empty ks
    let secureKS = [];
    // validate

    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);

    // Store P256 Public Key
    kpJwk.jwk = (await JWK.asKey(kpJwk.jwk, 'jwk')).toJSON();
    const swarmFeed = await DriveSession.getSwarmNodeClient(swarmKeypair);

    // Store P256 pvk
    // @ts-ignore
    await DriveSession.setSecure(
      ks.address,
      'P256',
      kp.getPrivate('hex')
    );
    // Store secp256k1
    // @ts-ignore
    await DriveSession.setSecure(
      ks.address,
      'ES256K',
      swarmKeypair.getPrivate('hex')
    );

    // Create IPFS key storage lock
    const session = `did:xdv:${swarmFeed.user}`;

    const ldCrypto = await KeyConvert.createLinkedDataJsonFormat(
      LDCryptoTypes.JWK,
      { publicJwk: kpJwk.jwk } as any,
      false
    );

    const did = new DIDDocument();
    const pub = { owner: swarmFeed.user, ...ldCrypto };
    did.id = session;
    did.publicKey = [pub];
    did.authentication = [pub as any];

    const didIndex = { ...did, tag: 'main_did' };
    const references = {
      'index.json': didIndex,
    };

    const res = await swarmFeed.publishDirectory({
      name: session,
      contents: swarmFeed.toSwarmPayload(references),
      defaultPath: 'index.json',
    });

    DriveSession.set(did.id, swarmFeed.user, ks.name);
    this.loading = false;
  }

  async createKeys() {
    this.loading = true;
    this.valid = false;
    if (
      this.walletDescription.length > 0 &&
      this.password === this.confirmPassword
    ) {
      let mnemonic = await Wallet.generateMnemonic();
      this.keystore = await Wallet.createHDWallet({
        password: this.password,
        mnemonic,
      });
      let wallet = new Wallet(
        mnemonic,
        await ethers.Wallet.fromEncryptedJson(this.keystore, this.password)
      );
      let keys;
      let keystoreIndexItem: KeystoreIndex;

      if (this.walletType === 'secp256k1') {
        keys = wallet.getES256K();
        keystoreIndexItem = {
          algorithm: AlgorithmType.ES256K,
          created: new Date(),
          name: this.walletDescription,
          keystore: this.keystore,
          xdvType: this.walletType,
        } as KeystoreIndex;

        keystoreIndexItem.address = pubKeyToAddress(keys.getPublic('array'));
        await this.createDID(keystoreIndexItem, keys, wallet, this.password);
      }
      this.mnemonic = mnemonic.split(' ');

      if (this.walletType === 'rsa') {
        keys = await Wallet.getRSA256Standalone();
        const rsaKeyExports = await KeyConvert.getX509RSA(keys);
        const selfSignedCert = X509.createSelfSignedCertificateFromRSA(
          rsaKeyExports.pemAsPrivate,
          rsaKeyExports.pemAsPublic,
          this.x509Info
        );
        // needs to use JWE to secure RSA
        keystoreIndexItem = {
          algorithm: AlgorithmType.RSA,
          created: new Date(),
          name: this.walletDescription,
          keystore: {
            key: rsaKeyExports.pemAsPrivate,
            cert: selfSignedCert,
          },
          xdvType: this.walletType,
        } as KeystoreIndex;

        await DriveSession.setSecure(
          this.walletDescription,
          'RSA',
          rsaKeyExports.pemAsPrivate
        );
      }
      this.loading = false;
      this.valid = true;
      this.keystoreIndexItem = keystoreIndexItem;
      this.selectedPanel = 1;
    }
  }

  async handleRsaWallet() {
    if (this.walletType === 'rsa') {
      this.keystore = await Wallet.getRSA256Standalone();
    }
  }
}
</script>
