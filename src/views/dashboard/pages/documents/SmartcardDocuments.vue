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

  async getWeb3() {
    // Init with HD mnemonic (server side)
    const network = {
      name: "BSC",
      networkId: 97,
      chainId: 97,
    };
    const providerUrl = "https://data-seed-prebsc-1-s2.binance.org:8545/"; //'https://bsc-dataseed1.ninicoin.io/';
    const provider = new Web3.providers.HttpProvider(providerUrl);
    const web3 = new Web3(provider);
    web3.setProvider(provider);
    this.web3 = web3;
    const ethersInstance = new ethers.providers.Web3Provider(
      web3.currentProvider as any
    );
    /*
    const pk = (await this.wallet.getPrivateKey("ES256K"));
    const private_key = pk.getPrivate("hex");//.getSecret('hex'); 
    const account = web3.eth.accounts.privateKeyToAccount('0x'+private_key);*/

    let mnemonicWallet = ethers.Wallet.fromMnemonic(this.wallet.mnemonic);
    const private_key = mnemonicWallet.privateKey;
    const account = web3.eth.accounts.privateKeyToAccount(private_key);
    web3.eth.accounts.wallet.add(account);
    this.web3.eth.defaultAccount = account.address;
    this.currentAddress = account.address;

    return { web3, ethersInstance };
  }

  async anchorBlockchain() {
    // anchor to nft
    const web3_data = await this.getWeb3();
    this.web3 = web3_data.web3;
    this.ethersInstance = web3_data.ethersInstance;
    const contractAddress = "0xeE99AdEb56B01B005EC24884F3F6E770E7e6f926";
    const daiContractAddress = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
    this.contract = new this.web3.eth.Contract(
      xdvAbi.XDVDocumentAnchoring.raw.abi,
      xdvAbi.XDVDocumentAnchoring.address.bsctestnet
    );
    this.daiContract = new this.web3.eth.Contract(
      xdvAbi.DAI.raw.abi,
      xdvAbi.DAI.address.bsctestnet
    );
    this.ethersContract = new ethers.Contract(
      xdvAbi.XDVDocumentAnchoring.address.bsctestnet,
      xdvAbi.XDVDocumentAnchoring.raw.abi,
      this.ethersInstance.getSigner(this.currentAddress)
    );

    await this.daiContract.methods
      .approve(this.contract._address, "1000000000000000000")
      .send({
        gasPrice: "22000000000",
        gas: 400000,
        from: this.contract.defaultAccount,
      });

    const txmint = await this.contract.methods
      .mint(
        "1", // qty
        bob,
        this.did.id, //
        this.web3.utils.fromUtf8(this.indexes),
        false, // encrypted
        "xdv",
        this.did.id
      )
      .send({
        gasPrice: "22000000000",
        gas: 4000000,
        from: this.contract.defaultAccount,
      });

    //await txmint.wait(1);
    const filter = this.contract.getPastEvents("DocumentAnchored", {
      toBlock: "latest",
      fromBlock: 0,
      filter: { user: this.localAddress },
    });

    const response = await filter;
    const blockItem = response.reverse()[0];
    const root = await this.ipfs.getObject(
      this.web3.utils.hexToUtf8(blockItem.returnValues.documentURI)
    );
    const document = root.value;
    console.log("ROOT VALUE", root.value);
    console.log("document", document);
    this.showVideo = true;
    this.videoBase64 = root.value.content;
  }

  async printPdf() {}
}
</script>
