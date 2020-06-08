<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="pink"
    ></v-progress-linear>
    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>

          <v-menu bottom left>
            <template v-slot:activator="{ on }">
             
                      <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>

            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in menuitems"
                :key="i"
                @click="item.handle"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
              <span class="headline">Crear DID</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="form" autocomplete="off">
                <v-row>
                  <v-col cols="12" md="12">
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
                @click="close"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                :disabled="loading"
                @click="createDID"
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
              <span class="headline">Subir documentos verificable</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="form" autocomplete="off">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-file-input
                      prepend-icon="mdi-paperclip"
                      v-model="files"
                      multiple
                      show-size
                      label="Archivos"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
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
                :disabled="loading"
                text
                @click="close"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue darken-1"
                :disabled="loading"
                text
                @click="createDocumentNode"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-list two-line>
        <v-list-item-group v-model="selected" multiple active-class="pink lighten-5">
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
                    mdi-star
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
  DocumentNodeSchema,
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

@Component({})
export default class DriveComponent extends Vue {
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
  selectedPanel = 0;
  selected  = [];
  menuitems = [{
    title: 'Compartir',
    handle: this.share,
  }];
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
  solidoProps: XDVMiddleware | MiddlewareOptions;
  driveSession;
  any = null;
  async mounted() {
    this.loading = true;
    this.solidoProps = await SolidoSingleton.getProps();
    this.loadWallets();
    if (localStorage.getItem('xdv:drive:session')) {
      await this.loadDirectory();
    }
    this.select = this.wallets[0];
    this.loading = false;
  }

  loadWallets() {
    this.wallets = KeystoreIndex.getIndex().filter(
      (i) => i.algorithm !== 'RSA'
    );
  }

  async share(){
    
  }

  async loadDirectory() {
    if (!this.driveSession) {
      this.driveSession = JSON.parse(localStorage.getItem('xdv:drive:session'));
    }
    const swarmFeed = new SwarmFeed(
      (data) => Promise.resolve(false),
      this.driveSession.pub
    );
    swarmFeed.initialize();

    let { body } = await swarmFeed.bzzFeed.getContent(
      this.driveSession.feed,
      {
        path: 'index.json',
      }
    );

    let reader = new Response(body);
    let content = await reader.json();


    console.log(content);
    this.items = [];
    this.items = [
      {
        action: moment(content.created).fromNow(),
        headline: content.id,
        title: 'DID',
        subtitle: 'ethereum address ' + this.driveSession.address,
      },
    ];


    body = await swarmFeed.bzzFeed.getContent(
      this.driveSession.feed,
      {
        path: 'docs/refs.json',
      }
    );

    reader = new Response(body.body);
    content = await reader.json();

    if (content.docs) {
      const temp = Object.keys(content.docs).map(async (k) => {
        const i = content.docs[k];
        const has = !!i.signature;
        if (has) {
          const s = ethers.utils.joinSignature({
            r: '0x' + i.signature.r,
            s: '0x' + i.signature.s,
            recoveryParam: i.signature.recoveryParam,
          });
          return {
            action: moment(i.lastModified).fromNow(),
            title: i.name,
            headline: i.contentType,
            subtitle: `hash ${i.hash}, firma ${s}`,
          };
        }
        return {
          title: i.name,
          headline: i.contentType,
        };
      });
      const res = await forkJoin(temp).toPromise();
      this.items = [...this.items, ...res];
    }
  }

  close() {
    this.didDialog = false;
    this.fileDialog = false;
  }

  async createDocumentNode() {
    const ks = this.select;

    const wallet = await this.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    this.loading = true;

    const did = this.driveSession.did;
    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);

    const swarmKp = wallet.getES256K();
    const swarmFeed = new SwarmFeed(
      (data) => Promise.resolve(sign(data, swarmKp)),
      swarmKp.getPublic('array')
    );
    swarmFeed.initialize();

    // get index json
    const { body } = await swarmFeed.bzzFeed.getContent(this.driveSession.feed);
    const reader = new Response(body);
    const indexJson = await reader.json();

    const documents = this.files.map(async (i) => {
      let ab = await (i as Blob).arrayBuffer();
      let buf = new Uint8Array(ab);
      const hash = ethers.utils.hashMessage(buf);
      const signature = kp.sign(i.hash);

      return {
        contentType: i.type,
        name: i.name,
        lastModified: i.lastModified,
        size: i.size,
        content: ethers.utils.base64.encode(buf),
        signature,
        hash,
      } as SwarmNodeSignedContent;
    });

    let patchRefs = {
      docs: indexJson.docs || {},
    };
    const signedDocs = await forkJoin(documents).toPromise();
    const refs = signedDocs.map(async (i: SwarmNodeSignedContent) => {
      const ref = await swarmFeed.bzz.uploadData(
        DocumentNodeSchema.create(did, i, 'file'),
        {
          encrypt: true,
          // pin: true,
          // manifestHash: this.driveSession.feed,
        }
      );
      const { contentType, name, size, signature, hash, lastModified } = i;
      return { ref, contentType, name, size, signature, hash, lastModified };
    });

    const items = await forkJoin(refs).toPromise();
    items.map((i) => {
      patchRefs.docs = {
        ...patchRefs.docs,
        [i.hash]: { ...i },
      };
    });
    const payload = {
      'index.json': {
        ...indexJson,
      },
      'docs/refs.json': patchRefs,
    };

    debugger;
    const res = await swarmFeed.publishDirectory({
      name: did.id,
      contents: swarmFeed.toSwarmPayload(payload),
      defaultPath: 'index.json',
    });

    this.loading = false;
    this.close();
    await this.loadDirectory();
  }

  async browserUnlock(keystore: KeystoreIndex, password) {
    try {
      const base = await ethers.Wallet.fromEncryptedJson(
        keystore.keystore,
        password
      );
      return new Wallet(base.mnemonic, base);
    } catch (e) {
      console.log(e);
      this.invalidPassword = true;
    }
    return null;
  }

  async createDID() {
    // validate

    const { ipld, didxdv } = this.solidoProps as XDVMiddleware;
    const ks = this.select;

    const wallet = await this.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    this.loading = true;

    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);

    const swarmKp = wallet.getES256K();
    const swarmFeed = new SwarmFeed(
      (data) => Promise.resolve(sign(data, swarmKp)),
      swarmKp.getPublic('array')
    );
    swarmFeed.initialize();

    // Create IPFS key storage lock
    const session = await didxdv.createIpldSession(kpJwk.pem);
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

    const didIndex = DIDNodeSchema.create(did, 'main_did');
    const references = {
      'index.json': didIndex,
      // 'did.json': did,
    };

    const res = await swarmFeed.publishDirectory({
      name: session.key,
      contents: swarmFeed.toSwarmPayload(references),
      defaultPath: 'index.json',
    });

    this.driveSession = {
      feed: res.feedHash,
      did,
      didIndex,
      pub: swarmKp.getPublic('array'),
      address: swarmFeed.user,
    };
    localStorage.setItem(
      'xdv:drive:session',
      JSON.stringify(this.driveSession)
    );
    this.loading = false;
    this.close();
    await this.loadDirectory();
  }
}
</script>
