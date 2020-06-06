w<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-card class="mx-auto" tile>
      <v-toolbar color="blue-grey" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Cartera Digital</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-wallet-plus</v-icon>
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
                              <span>RSA, 2049 bits</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-radio
                                  v-on="on"
                                  class="font-weight-medium"
                                  label="Blockchain"
                                  color="indigo"
                                  value="secp256k1"
                                ></v-radio>
                              </template>
                              <span>secp256k1</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-radio
                                  v-on="on"
                                  class="font-weight-medium"
                                  label="Blockchain e Identidad Digital"
                                  color="orange"
                                  value="Ed25519"
                                ></v-radio>
                              </template>
                              <span>Ed25519</span>
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
                        <v-chip-group column active-class="display-3">
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[0] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[1] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[2] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[3] }}
                          </v-chip>

                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[4] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[5] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[6] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[7] }}
                          </v-chip>

                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[8] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[9] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[10] }}
                          </v-chip>
                          <v-chip
                            class="display-3"
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[11] }}
                          </v-chip>
                        </v-chip-group>
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
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" text @click="save"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { X509Info, Wallet, X509, KeyConvert } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import { ethers } from 'ethers';
import moment from 'moment';

@Component({})
export default class WalletComponent extends Vue {
  show(e) {
    this.open = false;
    setTimeout(() => {
      this.open = true;
    }, 100);
  }
  loading = false;

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

  loadWallets() {
    const index = KeystoreIndex.getIndex();
    this.items = index.map((i) => {
      return {
        action: 'mdi-wallet',
        title: i.name,
        items: [
          {
            title: `algoritmo ${i.algorithm}`,
          },
          {
            title: `creado hace ${moment(i.created).fromNow()}`,
          },
        ],
      };
    });
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

  async createKeys() {
    console.log(this.x509Info);
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
        keys = await wallet.getES256K();
        keystoreIndexItem = {
          algorithm: 'secp256k1',
          created: new Date(),
          name: this.walletDescription,
          keystore: this.keystore,
          xdvType: this.walletType,
        } as KeystoreIndex;
      }
      if (this.walletType === 'Ed25519') {
        keys = await wallet.getEd25519();
        keystoreIndexItem = {
          algorithm: 'Ed25519',
          created: new Date(),
          name: this.walletDescription,
          keystore: this.keystore,
          xdvType: this.walletType,
        } as KeystoreIndex;
      }
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
          algorithm: 'RSA',
          created: new Date(),
          name: this.walletDescription,
          keystore: {
            key: rsaKeyExports.pemAsPrivate,
            cert: selfSignedCert,
          },
          xdvType: this.walletType,
        } as KeystoreIndex;
      }
      this.loading = false;
      this.valid = true;
      this.keystoreIndexItem = keystoreIndexItem;
      this.selectedPanel = 1;
      this.mnemonic = mnemonic.split(' ');
    }
  }

  async handleRsaWallet() {
    if (this.walletType === 'rsa') {
      this.keystore = await Wallet.getRSA256Standalone();
    }
  }
}
</script>
