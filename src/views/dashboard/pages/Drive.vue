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
              @click="item.handler"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-toolbar-title
          >Documentos asociados a cartera {{ select.name }}</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-dialog v-model="shareDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Compartir</span>
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
                @click="share"
                >Compartir</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

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
        <v-dialog v-model="selectWalletDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Ingrese clave para acceder cartera</span>
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
                @click="selectWalletDialog = false"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                :disabled="loading"
                @click="unlock"
                >Acceder</v-btn
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
        <v-list-item-group v-model="selected" active-class="pink lighten-5">
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
                    mdi-lock
                  </v-icon>

                  <v-icon v-else color="yellow">
                    mdi-star
                  </v-icon>
                  <v-icon color="green" @click="openShareDialog(item)">
                    mdi-share
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
const bs58 = require('bs58');

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
  selectedDocument = {};
  selected = [];
  shareDialog = false;
  shareInfo = {
    address: '0x0fccbb0c51b5c0cf435d7d5b4659ee93567e469b',
    feed: 'ef26e27db5b805869ae4ff56869144a4bba52d2545be38f84d0b943b6e56d1e8',
  };
  menuitems: any[] = [];
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
  selectWalletDialog = false;
  select: KeystoreIndex = new KeystoreIndex();
  wallets: KeystoreIndex[] = [];
  solidoProps: XDVMiddleware | MiddlewareOptions;
  driveSession;

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
    if (DriveSession.has()) {
      await this.loadDirectory();
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

  async share() {
    const ks = this.select;
    this.loading = true;

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    const feed = this.driveSession.feed.feedHash || this.driveSession.feed;

    // resolve DID
    const { swarmFeed } = await DriveSession.getSwarmNodeClient(wallet);
    const resolver = await DriveSession.createDIDResolver(
      swarmFeed,
      this.shareInfo.feed
    );
    const did = resolver.resolve(
      `did:xdv:${this.shareInfo.address}`
    ) as DIDDocument;
    const pub = did.publicKey[0].publicKeyJwk;

    const kp = wallet.getES256K();
    const kpSuite = await KeyConvert.getES256K(kp);

    // get did document
    const document = await swarmFeed.bzz.downloadData(
      this.selectedDocument.item
    );

    // signed message from user
    const signed = await JWTService.sign(kpSuite.pem, document, {
      iss: swarmFeed.user,
      sub: this.shareInfo.address,
      aud: swarmFeed.user,
    } as any);

    // encrypt

    const encrypted = await JOSEService.encrypt(pub, signed);

    const feedHash = await swarmFeed.bzzFeed.createManifest({
      user: swarmFeed.user,
      name: `${swarmFeed.user}:${this.shareInfo.address}`
    });
    const duplexClient = new MessagingTimelineDuplexClient(swarmFeed, feedHash);

    // topic is user did
    const topic = did.id;

    const topicInstance = duplexClient.createSubject(topic);

    duplexClient.subscribe().live({
      interval: 5000,
    }).subscribe(console.log)
    await topicInstance.send(encrypted);

this.loading = false;
    this.shareDialog = false;
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
    this.loadDirectory();
  }

  async loadDirectory() {
    if (DriveSession.has()) {
      this.driveSession = DriveSession.get();
      this.select = this.wallets.find(
        (i) => i.name === this.driveSession.ksName
      );
      this.selectWalletDialog = false;
    } else {
      return;
    }
    const swarmFeed = DriveSession.getSwarmNodeQueryable();
    const feed = this.driveSession.feed.feedHash || this.driveSession.feed;
    let { body } = await swarmFeed.bzzFeed.getContent(feed, {
      path: 'index.json',
    });

    let reader = new Response(body);
    let content = await reader.json();

    this.items = [];
    this.items = [
      {
        item: content,
        action: moment(content.created).fromNow(),
        headline: content.id,
        title: 'DID',
        subtitle: `direccion ${this.driveSession.address} enlace ${feed}`,
      } as any,
    ];

    body = await swarmFeed.bzzFeed.getContent(feed, {
      path: 'docs/refs.json',
    });

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
            item: i.ref,
            action: moment(i.lastModified).fromNow(),
            title: i.name,
            headline: i.contentType,
            subtitle: `hash ${i.hash.replace('0x', '')} firma ${s.replace(
              '0x',
              ''
            )}`,
          };
        }
        return {
          title: i.name,
          headline: i.contentType,
        };
      });
      const res = await forkJoin(temp).toPromise();
      this.items = [...this.items, ...res] as any[];
    }
  }

  close() {
    this.didDialog = false;
    this.fileDialog = false;
  }

  async createDocumentNode() {
    const ks = this.select;

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    //    const wallet = await this.browserUnlock(ks, this.password);
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
    const { swarmFeed } = await DriveSession.getSwarmNodeClient(wallet);
    const feed = this.driveSession.feed.feedHash || this.driveSession.feed;

    const documents = this.files.map(async (i) => {
      let ab = await (i as Blob).arrayBuffer();
      let buf = new Uint8Array(ab);
      const hash = ethers.utils.keccak256(buf);
      const signature = kp.sign(hash.replace('0x'));

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

    // get index json
    const index = await swarmFeed.bzzFeed.getContent(feed, {
      path: 'index.json',
    });
    const readerIndex = new Response(index.body);
    const indexJson = await readerIndex.json();
    // get index json
    const { body } = await swarmFeed.bzzFeed.getContent(feed, {
      path: 'docs/refs.json',
    });
    const reader = new Response(body);
    const docsJson = await reader.json();
    let patchRefs = {
      docs: docsJson.docs || {},
    };
    const signedDocs = await forkJoin(documents).toPromise();
    const refs = signedDocs.map(async (i: SwarmNodeSignedContent) => {
      const ref = await swarmFeed.bzz.uploadData(
        DocumentNodeSchema.create(did, i, 'file'),
        {
          encrypt: true,
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

    const res = await swarmFeed.publishDirectory({
      name: did,
      contents: swarmFeed.toSwarmPayload(payload),
      defaultPath: 'index.json',
    });

    this.loading = false;
    this.close();
    await this.loadDirectory();
  }

  async createDID() {
    // validate
    const ks = this.select;

    const wallet = await DriveSession.browserUnlock(ks, this.password);
    if (!wallet) {
      this.validations.password = 'Clave invalida';
      return;
    }
    this.validations.password = false;
    this.loading = true;

    const kp = wallet.getP256();
    const kpJwk = await KeyConvert.getP256(kp);

    const swarmKp = wallet.getES256K();
    const swarmJwk = await KeyConvert.getES256K(kp);

    const { swarmFeed } = await DriveSession.getSwarmNodeClient(wallet);

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
      // 'did.json': did,
    };

    const res = await swarmFeed.publishDirectory({
      name: session,
      contents: swarmFeed.toSwarmPayload(references),
      defaultPath: 'index.json',
    });

    DriveSession.set(res, did.id, kp.getPublic('array'), res.user, ks.name);
    this.loading = false;
    this.close();
    await this.loadDirectory();
  }
}
</script>
