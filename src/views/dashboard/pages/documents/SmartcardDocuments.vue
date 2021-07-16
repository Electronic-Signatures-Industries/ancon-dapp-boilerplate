<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
    <v-row>
      <v-col cols="1" xs="1">
        <v-progress-circular
          indeterminate
          v-if="loading"
          color="primary"
        ></v-progress-circular>
      </v-col>
      <v-col xs="12">
        <v-file-input multiple show-size chips label="Files"></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" align="right">
        <v-btn color="pink" @click="createDocumentSimple" dark> Simple </v-btn>
      </v-col>
      <v-col cols="3" align="center">
        <v-btn color="pink" @click="createDocumentNode" dark> Protected </v-btn>
      </v-col>
      <v-col cols="6" align="left">
        <v-radio-group v-model="typelink.mode" mandatory row>
          <v-radio label="Onchain timestamp" value="1"></v-radio>
          <v-radio label="Non fungible token" value="2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-list v-if="loading">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Indice</v-list-item-title>
          <v-list-item-subtitle>
            <v-btn @click="openCid(manifest)" text color="primary">{{
              manifest
            }}</v-btn>
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
      </template>
    </v-list>

    <v-row v-if="loading">
      <v-col cols="6" sm>
        <v-list two-line flat style="z-index: -5">
          <v-list-item-group
            active-class="indigo lighten-5"
            class="indigo--text"
          >
            <template v-for="(item, index) in items">
              <v-list-item :key="item.file.name">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.file.name"
                    ></v-list-item-title>
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

                    <v-icon
                      @click="mintNft(item.cid)"
                      v-if="!active"
                      color="blue lighten-1"
                    >
                      mdi-anchor
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index + 1 < items.length"
                :key="index"
              ></v-divider> </template></v-list-item-group
        ></v-list>
      </v-col>
      <v-col cols="6" sm>
        <v-list two-line flat style="z-index: -5">
          <v-list-item-group
            active-class="indigo lighten-5"
            class="indigo--text"
          >
            <template v-for="(item, index) in reports">
              <v-list-item :key="index">
                <v-list-item-content>
                  {{ item }}
                </v-list-item-content>
              </v-list-item>

              <v-divider
                v-if="index + 1 < items.length"
                :key="index"
              ></v-divider> </template></v-list-item-group
        ></v-list>
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
import { ethers } from "ethers";
const xdvnftAbi = require("../../../../abi/xdvnft");

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
  typelink = { mode: 2 };
  unlockPin = false;
  ipfs: any = {};
  report: unknown = {};
  cids: any = [];
  manifest: any = "";
  items: any = [];
  did = "";
  alertMessage = "";
  fab = false;
  selected = [0];
  cid = {};
  search = {};
  searchInput = null;
  reports = [];
  currentAccount: any;
  web3: ethers.providers.Web3Provider;
  contract: any;
  daiContract: any;
  ethersContract: any;
  ethersInstance: ethers.providers.Web3Provider;

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

    return report.map((i) => `${i.title}: ${i.subtitle}`).join("\r\n");
  }


  async xdvifySimple() {
    
    const lnk = await this.createDocumentNode(this.files);
    if (this.typelink.mode === 1) {
      await this.anchor(lnk)
    } else {
      await this.mintNft(lnk);
    }
  }

  async xdvifyPro() {
    const lnk = await this.createDocumentNode(this.files);
    if (this.typelink.mode === 1) {
      await this.anchor(lnk)
    } else {
      await this.mintNft(lnk);
    }
  }
  /** Creates document node */
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
      await ipfsManager.start(`https://ipfs.xdv.digital`);
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
          await this.verifyChain(cid.toString()),
        ];
      }
      this.did = didRSA.did.id;
      return await ipfsManager.addSignedObject(
        Buffer.from(JSON.stringify({ index: true })),
        {
          signedFiles: this.cids,
        }
      );
    } catch (e) {
      this.loading = false;
    }
    this.loading = false;
    return;
  }

  async mintNft(uri: string) {
    // anchor to nft
    this.currentAccount = (await BinanceChain.enable())[0];
    this.ethersInstance = new ethers.providers.Web3Provider(BinanceChain);

    this.daiContract = new ethers.Contract(
      xdvnftAbi.DAI.address.bsctestnet,
      xdvnftAbi.DAI.raw.abi,
      this.ethersInstance.getSigner()
    );
    this.ethersContract = new ethers.Contract(
      xdvnftAbi.XDVNFT.address.bsctestnet,
      xdvnftAbi.XDVNFT.raw.abi,
      this.ethersInstance.getSigner()
    );

    const approve = await this.daiContract.functions.approve(
      this.ethersContract.address,
      "1000000000000000000",
      {
        gasPrice: "22000000000",
        gasLimit: 400000,
      }
    );

    await approve.wait(1);

    const txmint = await this.ethersContract.functions.mint(
      this.currentAccount,
      uri,
      {
        gasPrice: "22000000000",
        gasLimit: 4000000,
      }
    );

    await txmint.wait(1);
    // const filter = this.contract.getPastEvents("DocumentAnchored", {
    //   toBlock: "latest",
    //   fromBlock: 0,
    //   filter: { user: this.localAddress },
    // });

    // const response = await filter;
    // const blockItem = response.reverse()[0];
    // const root = await this.ipfs.getObject(
    //   this.web3.utils.hexToUtf8(blockItem.returnValues.documentURI)
    // );
    // const document = root.value;
    // console.log("ROOT VALUE", root.value);
    // console.log("document", document);
    // this.showVideo = true;
    // this.videoBase64 = root.value.content;
  }

  async printPdf() {}
}
</script>
