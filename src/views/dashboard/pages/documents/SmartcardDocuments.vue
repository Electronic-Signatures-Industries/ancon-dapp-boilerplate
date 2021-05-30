<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
    <v-card class="mx-auto">
      <v-toolbar color="indigo accent-4" dark>
        <v-toolbar-title>Smartcard upload and sign</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="cid"
          :loading="loading"
          :search-input.sync="search"
          clearable
          hide-details
          @input="openCid"
          hide-selected
          return-object
          label="Add IPLD address to query"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title> Add IPLD address to query </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="green accent-5"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-link</v-icon>
              <span v-text="item"></span>
            </v-chip>
            <v-chip
              v-if="from"
              v-bind="attr"
              :input-value="from"
              color="blue accent-5"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-link</v-icon>
              <span v-text="item"></span>
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
              <v-icon>mdi-coin</v-icon>
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
                <span>Upload</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="canUpload = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-upload</v-icon>
                  </v-btn>
                </template></v-tooltip
              >

              <v-tooltip top>
                <span>Upload</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-if="selected.file && selected.file.name"
                    v-on="on"
                    @click="openCid(selected.cid)"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
            </v-speed-dial>
          </v-btn>
          <!-- <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in activeSubscriptions" :key="item.title">
              {{ item.title }}
            </v-tab>
          </v-tabs> -->
        </template>
      </v-toolbar>
      <v-card-text v-if="items.length > 0">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Indice</v-list-item-title>
              <v-list-item-subtitle>
                  <v-btn @click="openCid(manifest)" text color="primary">{{ manifest }}</v-btn>
                  </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>DID</v-list-item-title>
              <v-list-item-subtitle>{{ this.did }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <template v-for="(item, index) in report">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template></v-list
        ></v-card-text
      ></v-card
    >
    <v-card-actions v-if="items.length > 0">
      <v-spacer />
    </v-card-actions>

<v-row>
    <v-col cols="6" sm>
    <v-list two-line flat style="z-index: -5">
      <v-list-item-group active-class="indigo lighten-5" class="indigo--text">
        <template v-for="(item, index) in items">
          <v-list-item :key="item.file.name">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.file.name"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.cid"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="item.file.contentType"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text
                  v-text="item.action"
                ></v-list-item-action-text>

                <v-icon
                  @click="verifyChain(item.cid)"
                  v-if="!active"
                  color="green lighten-1"
                >
                  mdi-certificate
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider> </template></v-list-item-group></v-list
  >
    </v-col>
    <v-col cols="6" sm>
    <v-list two-line flat style="z-index: -5">
      <v-list-item-group active-class="indigo lighten-5" class="indigo--text">
        <template v-for="(item, index) in reports">
          <v-list-item :key="index">
              <v-list-item-content>
                  {{ item }}
              </v-list-item-content>
          </v-list-item>

          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider> </template></v-list-item-group></v-list
  >        
    </v-col>
</v-row>
    <v-card>
      <!-- 
    <share-q-r-dialog
      v-if="this.did"
      :documentMetadata="this.documentMetadata"
      :show.sync="showShareQRDialog"
      :did="this.did"
    /> -->
    </v-card>

    <v-dialog v-model="unlockPin" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Enter PIN for hardware module</span>
        </v-card-title>

        <v-card-text>
          <v-form autocomplete="off">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  required
                  v-model="pin"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  class="input-group--focused"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="unlockPin = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="createDocumentNode"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <xdv-upload
      :loading="loading"
      :show.sync="canUpload"
      :uploadStatus="uploadStatus"
      @result="createDocumentNode"
    />
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import UploadDialog from "./UploadDialog.vue";
import { DIDManager, IPLDManager, X509Utils } from "xdv-universal-wallet-core";
import { CAGOB } from "./cagob.pem";
import { CARAIZ } from "./caraiz.pem";
import { CAPC2 } from "./capc2.pem";
import { fromDagJWS } from "dids/lib/utils";

@Component({
  components: {
    "xdv-upload": UploadDialog,
  },
})
export default class SmartcardDocuments extends Vue {
  files: File[] = [];
  canUpload: boolean = false;
  loading: boolean = false;
  pin = "";
  showPassword = false;
  uploadStatus = false;
  unlockPin = false;
  ipfs: any = {};
  report: unknown = {};
  cids: any = [];
  manifest: any = '';
  items: any = [];
  did = "";
  alertMessage = "";
  fab = false;
  selected = [0];
  cid = {};
  search = {};
  searchInput = null;
  reports = [];

  async mounted() {}

  openCid(cid: string) {
    const href = `https://explore.ipld.io/#/explore/${cid}`;
    window.open(
      href,
      "_blank",
      "top=500,left=100,frame=false,nodeIntegration=no,menubar=yes"
    );
  }

  async verifyChain(cid: string): Promise<any> {
    const res = await (this.ipfs as IPLDManager).get(cid);

    const obj = await this.ipfs?.getObject(cid);
    const decoded = fromDagJWS(res.value).split(".");
    const data = `${decoded[0]}.${decoded[1]}`;
    const sig = `${decoded[2]}`;
    const report = await X509Utils.verifyChain(
      data,
      sig,
      obj.value.documentPubCert,
      [CAGOB, CAPC2, CARAIZ]
    );

    return report.map(i => `${i.title}: ${i.subtitle}`).join('\r\n');
  }

  async createDocumentNode(files?: File[]) {
    if (files.length > 0 && this.pin.length === 0) {
      this.files = files;
      this.unlockPin = true;
      return;
    }
    this.unlockPin = false;
    this.canUpload = false;
    this.loading = true;
    try {
      const didManager = new DIDManager();
      const pin = this.pin;
      const didRSA = await didManager.create3ID_PKCS11(pin);
      await didRSA.did.authenticate();

      const ipfsManager = new IPLDManager(didRSA.did);
      await ipfsManager.start(`http://ifesa.ipfs.pa:5001`);
      this.ipfs = ipfsManager;

      for (let index = 0; index < this.files.length; index++) {
        const file = this.files[index];
        const arr = await file.arrayBuffer();
        const cid = await ipfsManager.addSignedObject(new Uint8Array(arr), {
          name: file.name,
          contentType: file.type,
          lastModified: new Date(file.lastModified),
          certificate: (didRSA as any).certificate,
        } as any);
        this.cids.push({
          cid,
        });
        this.items = [
          ...this.items,
          {
            file,
            cid,
          },
        ];
        this.reports = [
            ...this.reports,
            await this.verifyChain(cid.toString())
        ];
      }
      this.did = didRSA.did.id;
      this.manifest = await ipfsManager.addSignedObject(
        Buffer.from(JSON.stringify({ index: true })),
        {
          signedFiles: this.cids,
        }
      );
    } catch (e) {
      this.loading = false;
    }
    this.loading = false;
  }

  async anchorBlockchain() {}

  async printPdf() {}
}
</script>
