<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Documentos</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-dialog v-model="didDialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-file-key</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline"
                >Crear documento de identidad digital DID</span
              >
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" autocomplete="off"> 
                      <v-row v-if="did">
                        <v-col cols="12" md="6"> DID: {{ did }} </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6">
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
                            v-model="password"
                            :append-icon="
                              showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="showPassword ? 'text' : 'password'"
                            label="Clave"
                            class="input-group--focused"
                            @click:append="showPassword = !showPassword"
                            autocomplete="new-password"
                          ></v-text-field>
                        </v-col>
                      </v-row> 
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" text @click="createDID"
                >Generar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="fileDialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-text-box-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Crear documento verificable</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" autocomplete="off">
                <v-expansion-panels v-model="selectedPanel">
                  <v-expansion-panel>
                    <v-expansion-panel-header class="display-1"
                      >Documentos</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-file-input
                            prepend-icon="mdi-paperclip"
                            v-model="files"
                            multiple
                            show-size
                            label="Archivos"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row
                        ><v-col
                          ><v-btn
                            :disabled="!valid"
                            color="blue darken-1"
                            text
                            @click="upload"
                            >Subir</v-btn
                          ></v-col
                        ></v-row
                      >
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header class="display-1"
                      >Firmar coleccion</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" md="6">
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
                              v-model="password"
                              :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              :type="showPassword ? 'text' : 'password'"
                              label="Clave"
                              class="input-group--focused"
                              @click:append="showPassword = !showPassword"
                              autocomplete="new-password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row
                          ><v-col
                            ><v-btn
                              :disabled="!valid"
                              color="blue darken-1"
                              text
                              @click="createDocumentNode"
                              >Guardar</v-btn
                            ></v-col
                          ></v-row
                        >
                      </v-expansion-panel-content>
                    </v-expansion-panel-content></v-expansion-panel
                  >
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

      <v-list two-line>
        <v-list-item-group v-model="selected" multiple active-class="primary">
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

                  <v-icon v-else color="yellow">
                    star
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
} from 'xdvplatform-tools';
import {
  publishDirectory,
  getContents,
} from '../../../libs/durable-hosting/index';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import moment from 'moment';
import { MiddlewareOptions } from '../../../libs';
import { SolidoSingleton } from '../components/core/SolidoSingleton';
import { ethers } from 'ethers';
import { arrayify } from 'ethers/utils';
@Component({})
export default class DriveComponent extends Vue {
  loading = false;

  keystore: any | Wallet = null;
  valid = false;
  didDialog = false;
  fileDialog = false;
  files = [];
  open = false;
  walletDescription = '';
  showPassword = false;
  password = '';
  mnemonic = [];
  selectedPanel = 0;
  items = [
    {
      action: 'Hace 15 min',
      headline: 'Certificado de salvoconducto',
      title: 'RUC 18-17-17 DV 25',
      subtitle: 'Salvoconducto para empresa, creado falta firmar',
    },
    {
      action: '1 de Mayo de 2020',
      headline: 'Documento para solicitud de permiso de construccion',
      title: 'Empresas La Constructora',
      subtitle: 'Documento firmado',
    },
    {
      action: '1 de Junio de 2020',
      headline: 'Gaceta Oficial',
      title: 'Uso de mascarillas',
      subtitle: 'Almacenado para posterior firmado',
    },
  ];
  select: KeystoreIndex = new KeystoreIndex();
  wallets: KeystoreIndex[];
  solidoProps: MiddlewareOptions;

  async mounted() {
    this.loading = true;
    this.solidoProps = await SolidoSingleton.getProps();
console.log(this.solidoProps)
    this.loadWallets();
    this.loading = false;
  }

  loadWallets() {
    this.wallets = KeystoreIndex.getIndex().filter(
      (i) => i.algorithm !== 'RSA'
    );
  }

  close(item) {
    this.didDialog = false;
    this.fileDialog = false;
  }

  async createDocumentNode() {}

  async createDID() {
    this.loading = true;
    const { ipld, didxdv } = this.solidoProps;
    const ks = this.select;
    const base = await ethers.Wallet.fromEncryptedJson(
      ks.keystore,
      this.password
    );

    let wallet = new Wallet(base.mnemonic, base);
    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);

    const swarmKp = wallet.getES256K();

    // Create IPFS key storage lock
    const session = await didxdv.createIpldSession(
      kpJwk.pem
    );
    const ldCrypto = await KeyConvert.createLinkedDataJsonFormat(
      LDCryptoTypes.Sepc256r1,
      kpJwk.ldSuite,
      false
    );

    // Create DID document with an did-ipid based issuer
    const did = await DIDDocumentBuilder.createDID({
      issuer: session.key,
      verificationKeys: [ldCrypto.toPublicKey()],
      authenticationKeys: [ldCrypto.toAuthorizationKey()],
    });

    ipld.setSigner((payload) => {
      return Promise.resolve(kp.sign(payload).toHex());
    });
    // DID
    let didNode = await ipld.createDidNode(did, session.key);
    const payload = [
      new File([Buffer.from(JSON.stringify(didNode))], 'index.json', {
        type: 'application/json',
      }),
      new File([Buffer.from(JSON.stringify(did))], 'did.json', {
        type: 'application/json',
      }),
    ];
    const res = await publishDirectory({
      name: session.key,
      pvk: swarmKp.getPrivate('hex'),
      contents: payload,
      defaultPath: 'index.json',
    });

    const contents = await getContents({
      hash: res.feedHash,
      pvk: swarmKp.getPrivate('hex'),
    });

    this.loading =  false;
  }
}
</script>
