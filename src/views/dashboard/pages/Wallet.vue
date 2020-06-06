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
                <v-expansion-panels>
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
                                  value="eddsa"
                                ></v-radio>
                              </template>
                              <span>Ed25519</span>
                            </v-tooltip>
                          </v-radio-group>
                        </v-col>
                        <v-col v-if="walletType !== 'rsa'" cols="12" md="5">
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
                        <v-col v-if="walletType === 'rsa'" cols="12" md="6">
                          <v-text-field
                            label="Nombre de cartera"
                            v-model="walletDescription"
                            class="input-group--focused"
                          ></v-text-field>

                          <v-text-field
                            required
                            v-model="x509Info.commonName"
                            label="Nombre"
                            autocomplete="new-password"
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
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="display-1"
                      >Backup</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col>
                          Mnemonico
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[0] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[1] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[2] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[3] }}
                          </v-chip>
                        </v-col>
                      </v-row>
                                 <v-row>
                        <v-col>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[4] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[5] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[6] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[7] }}
                          </v-chip>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[8] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[9] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[10] }}
                          </v-chip>
                          <v-chip
                             class="ma-2"
                            close
                            color="pink"
                            label
                            text-color="white"
                          >
                            {{ mnemonic[11] }}
                          </v-chip>
                        </v-col>
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
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
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
import { X509Info, Wallet } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';

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

  item = 1;
  items = [
    {
      action: 'mdi-wallet',
      title: 'Firma Calificada de la oficina',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma de prueba',
      active: true,
      items: [
        { title: 'Algoritmo: RSA' },
        { title: '2048 bits' },
        { title: 'No exportable' },
      ],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma calificada uso personal',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma no calificada - blockchain',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma para factura electronica',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma para aprobaciones en grupo',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma para votaciones de junta directiva',
      items: [{ title: 'List Item' }],
    },
  ];

  save(item) {
    //   this.model = { ...item };
  }
  close(item) {
    this.dialog = false;
  }

  async handlePasswordUpdate() {
    // Get Key Store Index
    const localkeystoreIndex = KeystoreIndex.getIndex();

    if (
      this.walletDescription.length > 0 &&
      this.password === this.confirmPassword
    ) {
      let mnemonic = await Wallet.generateMnemonic();
      let wallet;
      let keys;
      let keystoreIndexItem: KeystoreIndex;
      this.keystore = await Wallet.createHDWallet({
        password: this.password,
        mnemonic,
      });
      debugger
      wallet = await Wallet.unlock(this.keystore, this.password);
      debugger

      if (this.walletType === 'secp256k1') {
        keys = await wallet.getP256();
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
      debugger

      // store
      KeystoreIndex.setIndex([...localkeystoreIndex, keystoreIndexItem]);
      debugger

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
