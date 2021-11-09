<template>
  <v-container>
    <v-row>
      <v-col xs="4" sm="4">
        <v-card width="256" min-height="800" tile>
          <v-navigation-drawer permanent>
            <!-- <v-system-bar></v-system-bar> -->
            <v-list>
              <v-list-item>
                <v-col xs="8" sm="8">
                  <v-row class="d-inline-flex">
                    <v-list-item-subtitle
                      >Ethereum address</v-list-item-subtitle
                    >
                    <v-chip class="ma-2" color="#48409A" pill close outlined>
                      <v-icon left> mdi-wallet </v-icon>
                      {{ walletEthAdressDisplay }}
                    </v-chip>
                  </v-row>
                  <v-row class="d-inline-flex">
                    <v-list-item-subtitle
                      >Cosmos EVM address</v-list-item-subtitle
                    >
                    <v-chip class="ma-2" color="#48409A" pill close outlined>
                      <v-icon left> mdi-wallet </v-icon>
                      {{ walletCosmosAddressDisplay }}
                    </v-chip>
                  </v-row>
                </v-col>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list nav dense>
              <v-list-item-group
                v-model="sideBarItems.selectedItem"
                color="primary"
              >
                <v-list-item v-for="(item, i) in sideBarItems.items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-title class="text-h6 mb-1">
              Balances
            </v-list-item-title>
          </v-list-item>
          <v-card-text>
            <v-row>
              <v-col xs="3" sm="3" offset-sm="2">
                <cryptoicon symbol="atom" size="24" class="cripto-icon" />
                {{ balances.bnb }}
              </v-col>
              <v-col xs="3" sm="3">
                <cryptoicon symbol="usdc" size="24" class="cripto-icon" />
                {{ balances.bnb }}
              </v-col>
              <v-col xs="3" sm="3">
                <cryptoicon symbol="dai" size="24" class="cripto-icon" />
                {{ balances.dai }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-progress-linear
          indeterminate
          v-if="loading"
          color="pink"
        ></v-progress-linear>

        <v-card>
          <v-tabs
            background-color="blue-berry accent-4"
            dark
            v-model="tabIndex"
          >
            <v-tab v-for="item in tabitems" :key="item.key">
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabIndex">
            <v-tab-item v-for="item in tabitems" :key="item.key">
              <v-card flat>
                <v-card-text>
                  <v-alert :type="alertType" v-if="alertMessage">{{
                    alertMessage
                  }}</v-alert>

                  <v-row>
                    <v-col xs="6" sm="6" offset-sm="2">
                      <v-file-input
                        multiple
                        v-if="item.settings.signing !== 'transfer'"
                        show-size
                        chips
                        label="Files"
                        v-model="files"
                      ></v-file-input>
                      <v-file-input
                        multiple
                        v-if="item.settings.signing === 'transfer'"
                        show-size
                        chips
                        :accept="item.settings.signing.contentType"
                        label="PDF Documents"
                        v-model="files"
                      ></v-file-input>
                      <v-alert type="alert" dense v-if="cidindex"
                        >Image URI: {{ cidindex }}</v-alert
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col xs="6" sm="6" offset-sm="2">
                      <v-text-field
                        label="Name"
                        required
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col xs="6" sm="6" offset-sm="2">
                      <v-text-field
                        required
                        label="Description"
                        v-model="description"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col xs="6" offset="2">
                      <v-btn
                        color="pink"
                        v-if="connected === false"
                        @click="connect"
                        dark
                      >
                        Connect
                      </v-btn>
                      <v-btn
                        :disabled="files.length === 0"
                        v-if="connected"
                        @click="xdvify"
                        color="primary"
                      >
                        Create metadata and mint
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <v-card>
          <v-tabs
            background-color="blue-berry accent-4"
            dark
            v-model="tabDetailIndex"
          >
            <v-tab v-for="item in tabDetailItems" :key="item.key">
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabDetailIndex">
            <v-tab-item key="details">
              <v-alert type="success" v-if="txid.length > 0" dense dismissible
                >{{ cids.length }} file(s) has been signed and uploaded</v-alert
              >
              <v-card>
                <v-row dense>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="text-h5">
                        Transaction details
                      </v-card-title>

                      <v-card-text v-if="!!cidindex">
                        <div>No transactions</div>
                      </v-card-text>
                      <v-card-text v-if="!!cidindex">
                        <div>Tx {{ txid }}</div>
                        <div>Ancon cid {{ cidindex }}</div>

                        <v-row
                          ><v-col>
                            <v-simple-table dense md="10">
                              <template v-slot:default>
                                <!-- <thead>
                              <tr>
                                <th>CID</th>
                                <th>Content Type</th>
                                <th>Name</th>
                              </tr>
                            </thead> -->
                                <tbody>
                                  <tr
                                    v-for="item in reportVerify"
                                    :key="item.title"
                                  >
                                    <td>
                                      {{ item.title }}
                                    </td>
                                    <td>
                                      {{ item.subtitle }}
                                    </td>
                                    <td>
                                      {{ item.name }}
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-simple-table dense md="10">
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th>CID</th>
                                    <th>Content Type</th>
                                    <th>Name</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="item in viewItems.signedFiles"
                                    :key="item.cid"
                                  >
                                    <td>
                                      {{ item.cid }}
                                    </td>
                                    <td>
                                      {{ item.contentType }}
                                    </td>
                                    <td>
                                      {{ item.name }}
                                    </td>
                                    <td>
                                      <v-btn
                                        v-show="false"
                                        @click="
                                          loadCid(
                                            item.cid,
                                            viewItems.type,
                                            item.name,
                                            item.contentType
                                          )
                                        "
                                        ><v-icon right dark>
                                          mdi-download
                                        </v-icon>
                                        Download</v-btn
                                      >
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-card-actions v-if="!!cidindex">
                        <v-btn @click="shareTo(cidindex)" text
                          ><v-icon right dark> mdi-link </v-icon> Share
                        </v-btn>
                        <v-btn
                          @click="verifyChain(cidindex)"
                          text
                          v-if="viewItems.type === 'jwt'"
                        >
                          <v-icon right dark> mdi-certificate </v-icon> Verify
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
            <v-tab-item key="transactions">
              <v-alert type="success" v-if="txid.length > 0" dense dismissible
                >{{ cids.length }} file(s) has been signed and uploaded</v-alert
              >
              <v-card>
                <v-row dense>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="text-h5">
                        Transactions
                      </v-card-title>

                      <v-card-text>
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">Tx</th>
                                <th class="text-left">Event</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in transactions" :key="item">
                                <td>{{ item.transactionHash }}</td>
                                <td>{{ item.event }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-actions>
                        <!-- <v-btn @click="shareTo" text> Render content </v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <vue-confirm-dialog></vue-confirm-dialog>
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
              <v-btn color="blue darken-1" text @click="xdvify">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "share-api-polyfill";

import { BigNumber, ethers } from "ethers";
import { AnconManager } from "../../../../views/dashboard/pages/wallet/anconManager";
import { AnconWeb3Client } from "../../../../anconjs";
import { SwarmManager } from "../../../../views/dashboard/pages/wallet/SwarmManager";
import { arrayify, base64 } from "ethers/lib/utils";
import Web3, * as web3 from "web3";
import { TxEvent } from "@cosmjs/tendermint-rpc";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

import {
  MsgMetadata,
  MsgMetadataResponse,
  MsgUpdateMetadataOwnership,
} from "@/anconjs/store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module/types/anconprotocol/tx";
import { encoder } from "@/anconjs/store/generated/Electronic-Signatures-Industries/ancon-protocol/ElectronicSignaturesIndustries.anconprotocol.anconprotocol/module";
import {
  LegacyTx,
  MsgEthereumTx,
  MsgEthereumTxResponse,
} from "@/anconjs/store/generated/tharsis/ethermint/ethermint.evm.v1/module/types/ethermint/evm/v1/tx";
const xdvnftAbi = require("../../../../abi/xdvnft");
const xdvAbi = require("../../../../abi/xdv.json");

@Component({
  components: {},
})
export default class SmartcardDocuments extends Vue {
  files: File[] = [];
  canUpload: boolean = false;
  loading: boolean = false;
  pin = "";
  showPassword = false;
  uploadStatus = false;
  typelink = { mode: "2" };
  unlockPin = false;
  ancon: AnconManager;
  swarm: SwarmManager;
  report: unknown = {};
  cids: any = [];
  manifest: any = "";
  items: any = [];
  did = "";
  reportVerify = [];
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
  anchorContract: ethers.Contract;
  result: void;
  txid: any = "";
  balances = {
    bnb: "0",
    dai: "0",
    daiMock: "0",
  };
  connected = false;
  cidindex = "";
  DAIAddress: string = `0x59b0e313070138127dc91F9F357Ba989FE5D57F8`;
  tabIndex = null;
  tabitems = [
    {
      key: "mint",
      label: "Mint NFT",
      settings: {
        signing: "simple",
        contentType: null,
      },
    },
    {
      key: "owner-transfer",
      label: "Transfer NFT Ownership",
      settings: {
        signing: "transfer",
        contentType: null,
      },
    },
    {
      key: "crosschain-swap",
      label: "Crosschain Swap",
      settings: {
        signing: "swap",
        contentType: null,
      },
    },
    // {
    //   key: "crosschain1",
    //   label: "NFT Cross Chain (new recipient token id, unique owner)",
    //   settings: {
    //     signing: "xchain_1",
    //     contentType: null,
    //   },
    // },
    // {
    //   key: "crosschain2",
    //   label: "NFT Cross Chain (new recipient token id, co-owners)",
    //   settings: {
    //     signing: "xchain_2",
    //     contentType: null,
    //   },
    // },
    // {
    //   key: "pades",
    //   label: "Qualified PDF",
    //   settings: {
    //     signing: "pades",
    //     contentType: "application/pdf",
    //   },
    //    },
  ];

  tabDetailIndex = null;
  tabDetailItems = [
    {
      key: "details",
      label: "Details",
      settings: {
        signing: "details",
        contentType: null,
      },
    },
    {
      key: "transactions",
      label: "Transactions",
      settings: {
        signing: "transactions",
        contentType: null,
      },
    },
  ];
  name = "My New Fancy NFT";
  description = "Powered by Ancon Protocol";
  viewItems = [];
  transactions = [];
  emulateSmartcard = false;
  //wallet: Wallet;
  web3instance: Web3;
  anconWeb3client: AnconWeb3Client;
  onboard = null;
  chainId: number;
  web3storageAPIKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE0ZDM0NDExYTYyQkJjMjBEMzkzZDNjN2RhQUE4YzZEMGRmNDY2NjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzUwMTU4NTUyNTIsIm5hbWUiOiJBbmNvbiJ9.TiAmVFS000shN0L9cV3q2SWsJhVW0uxM0ZCEbzTe9QI";
  nftAPIKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlFNWJFMjI2YUU4NzhFZkJGZGU1NzhDM0VkMmY2NDhGMjEzMDBmOGMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTAxNTU4Mzg2OSwibmFtZSI6ImFuY29uIn0.3VIRmGQ3IIfwk4X30NPDSfX8SN3YdFGnPqsYDc-7jlY";
  walletEthAdress = "";
  walletEthAdressDisplay = "Not connected";
  walletCosmosAddress = "";
  walletCosmosAddressDisplay = "Not connected";
  sideBarItems = {
    selectedItem: 0,
    items: [
      { text: "Mint", icon: "mdi-checkerboard-plus" },
      { text: "Transfer", icon: "mdi-bank-transfer" },
      { text: "Crosschain", icon: "mdi-transit-connection-horizontal" },
    ],
  };
  daiWeb3contract: any;
  nftWeb3Contract: any;

  async loadTransactions() {
    if (this.ethersContract) {
      const query = this.ethersContract.filters.Transfer(this.currentAccount);
      this.transactions = [
        ...(await this.ethersContract.queryFilter(query)),
        this.transactions,
      ];
    }

    if (this.anchorContract) {
      const query = this.anchorContract.filters.DocumentAnchored();
      this.transactions = [
        ...(await this.anchorContract.queryFilter(query)),
        this.transactions,
      ];
    }
  }

  /**
   * Downloads a File object
   */
  async downloadFileFromObject(o: any, name: string) {
    try {
      const url = window.URL.createObjectURL(new Blob([o]));
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    } catch (e) {
      throw new Error("No se pudo convertir el archivo");
    }
  }

  /**
   * Loads v-show="false" a cid
   */
  async loadCid(cid: string, type: string) {
    if (this.typelink.mode === "3") {
      //return await this.ipfs.getObject(cid);
    } else {
      // none
    }
    const result = await this.ancon.getObject(cid);

    // if (blob.content === null) {
    //   //TODO: download all sources
    //   //TODO: parse json and make every object clickable
    //   console.log(blob);
    // }

    // await this.downloadFileFromObject(
    //   blob.buffer,
    //   result.value.name,
    //   result.value.contentType
    // );
  }

  openCid(cid: string) {
    const href = `https://explore.ipld.io/#/explore/${cid}`;
    window.open(
      href,
      "_blank",
      "top=500,left=100,frame=false,nodeIntegration=no,menubar=yes"
    );
  }

  async web3Connect() {
    // @ts-ignore
    this.$confirm({
      auth: true,
      message: "Please enter a 24 seed passphrase",
      button: {
        yes: "Yes",
        no: "Cancel",
      },
      /**
       * Callback Function
       * @param {Boolean} confirm
       * @param {String} password
       */
      callback: async (confirm, password) => {
        if (confirm && password) {
          await this.connect(password);
        }
      },
    });
  }

  async connect(passphrase: string) {
    //@ts-ignore
    const accounts = await window.ethereum.enable();
    this.web3instance = new Web3(window.ethereum);
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(
      this.web3instance.currentProvider
    );
    this.anconWeb3client = new AnconWeb3Client(
      "http://localhost:8545",
      provider,
      accounts[0] as string
    );
    await this.anconWeb3client.connect();

    this.walletEthAdress = this.anconWeb3client.ethAccount;

    this.walletEthAdressDisplay = `
      ${this.walletEthAdress.substring(0, 7)}...
      ${this.walletEthAdress.substring(
        this.walletEthAdress.length - 7,
        this.walletEthAdress.length
      )}`;

    this.currentAccount = accounts[0];
    // DAI
    this.daiWeb3contract = new this.web3instance.eth.Contract(
      xdvnftAbi.DAI.raw.abi,
      "0x65c33Cf8d06FA391e79ee1126EFDeB3F1A372403"
    );

    // XDVNFT
    this.nftWeb3Contract = new this.web3instance.eth.Contract(
      xdvnftAbi.XDVNFT.raw.abi,
      "0x52721d527aBeFd2475C4d40E212947962114056d"
    );

    try {
      this.connected = true;

      this.walletCosmosAddress = this.anconWeb3client.cosmosAccount.address;

      this.walletCosmosAddressDisplay = `
      ${this.walletCosmosAddress.substring(0, 7)}...
      ${this.walletCosmosAddress.substring(
        this.walletCosmosAddress.length - 7,
        this.walletCosmosAddress.length
      )}`;

      this.subscribeToMetadataEvents();
      this.subscribeToUpdateMetadataEvents();
      await this.loadBalances();
      await this.loadTransactions();
    } catch (e) {
      alert(e.message);
    }
  }

  async loadBalances() {
    setInterval(async () => {
      const [daiBal] = await this.daiWeb3contract.methods.balanceOf(
        this.currentAccount
      );

      const bnb = await this.web3instance.eth.getBalance(this.currentAccount);

      this.balances.bnb = ethers.utils.formatEther(bnb);
      this.balances.dai = ethers.utils.formatEther(daiBal);
    }, 1250);
  }

  async shareTo(cid) {
    const url = `${location.href}link/${cid}`;

    // @ts-ignore
    navigator.share(
      {
        title: "XDV",
        text: "Sharing this signed document that you requested",
        url,
      },
      // @ts-ignore
      {
        // @ts-ignore
        copy: true,
        email: true,
        print: true,
        sms: true,
        smessenger: true,
        // @ts-ignore
        facebook: true,
        whatsapp: true,
        twitter: true,
        linkedin: true,
        telegram: true,
        skype: true,
      }
    );
  }

  // Stores documents and NFT
  async xdvify() {
    let lnk;
    // simple
    const storage = new Web3Storage({
      token: this.web3storageAPIKey,
    });

    this.loading = true;

    // 1. Upload files - web3.storage
    const cid = await storage.put(this.files, { wrapWithDirectory: true });
    // 2. Create Metadata
    const tx = await this.createMetadata(cid, this.name, this.description);
  }
  // Update Ownership
  async updateOwnership() {
    let lnk;

    this.loading = true;

    // 1. Update
    // TODO: Add Additional UI props
    await this.updateMetadata(lnk);
  }

  // Initiate Ownership
  async initiateCrossNFTOwnership(res) {
    // 1. Call getProof (Cosmos)
    // a. proof req `ancon%s`
    // b. proof req `packet%s` traverse('toMetadata', root)
    // 2. Exec function sendMetadataOwnership(
    // // -- existence proof
    // uint256[] memory leafOpUint,
    // bytes memory prefix,
    // bytes[][] memory existenceProofInnerOp,
    // uint256 existenceProofInnerOpHash,
    // bytes memory existenceProofKey,
    // bytes memory existenceProofValue,
    // bytes memory key,
    // bytes memory value,
    // // -- ics23 packet
    // // bytes memory packet, (abiDecoder de ethers)
    // string memory metadata,
    // uint256 tokenId,
    // address tokenAddress,
    // address to
    // 3. MetadataOwnershipChanged event
  }

  async mounted() {
    if (this.$router.currentRoute.params.cid) {
      this.cidindex = this.$router.currentRoute.params.cid || "";
      await this.loadViewer();
    }

    await this.loadTransactions();
  }

  /** Subscribes to events
   *
   */
  subscribeToMetadataEvents() {
    const query = `message.action='Metadata'`;
    const c = this.anconWeb3client.tm.subscribeTx(query);
    const listener = {
      next: async (log: TxEvent) => {
        // Decode response
        const res = MsgMetadataResponse.decode(log.result.data);
        console.log(res);
        // Hack: Protobuf issue
        const cid = res.cid.split(";")[1];
        console.log(cid);

        // Get CID content from GET /ancon/{cid} or /ancon/{cid}/{path}
        const content =
          await this.anconWeb3client.queryClient.queryReadWithPath(
            cid,
            "/",
            {}
          );

        console.log(content.data);

        this.result = await this.mintNft(cid);
        //  await this.initiateCrossNFTOwnership(res);

        this.cidindex = cid;
        await this.loadViewer();
        await this.loadTransactions();
        this.loading = false;
        c.removeListener(listener);
      },
    };
    c.addListener(listener);
  }

  /** Subscribes to events */
  subscribeToUpdateMetadataEvents() {
    return new Promise((resolve, reject) => {
      const query = `message.action='UpdateMetadataOwnership'`;
      const c = this.anconWeb3client.tm.subscribeTx(query);

      c.addListener({
        next: async (log: TxEvent) => {
          // Decode response
          const res = MsgUpdateMetadataOwnership.decode(log.result.data);
          console.log(res);
          // Hack: Protobuf issue
          const cid = res.hash.split(";")[1];
          console.log(cid);

          // Get CID content from GET /ancon/{cid} or /ancon/{cid}/{path}
          const content =
            await this.anconWeb3client.queryClient.queryReadWithPath(
              cid,
              "/",
              {}
            );

          console.log(content.data);

          let key = cid;
          const path = "";
          const requestProof = await fetch(
            `http://localhost:1317/ancon/proof/${key}${path}`
          );
          const proof = await requestProof.json();

          const root = proof.root;
          const exp = proof.proof;

          console.log(root, exp);
        },
      });
    });
  }

  /** Creates onchain metadata */
  async createMetadata(root, name, description): Promise<any> {
    //did:example:123?service=agent&relativeRef=/credentials#degree
    //did:ethr:9000:tokenaddress?service=erc721&tokenid
    const msg = MsgMetadata.fromPartial({
      creator: this.anconWeb3client.cosmosAccount.address,
      name,
      image: root,
      additionalSources: [],
      links: [],
      owner: `did:ether:9000:${this.currentAccount}`,
      description,
      did: "",
      from: "",
    });
    const encoded = encoder.msgMetadata(msg);

    const fee = {
      amount: [
        {
          denom: "aphoton",
          amount: "4",
        },
      ],
      gas: "200000",
    };
    return this.anconWeb3client.signAndBroadcast(encoded, fee);
  }

  /** Updates metadata ownership*/
  async updateMetadata(metadataCid: string) {
    const msgupd = MsgUpdateMetadataOwnership.fromPartial({
      hash: metadataCid,
      previousOwner: `did:ethr:ancon:${this.anconWeb3client.ethAccount}`,
      newOwner: "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB",
      currentChainId: "9000", // config / settings
      recipientChainId: "3", // config / settings
      sender: this.anconWeb3client.cosmosAccount.address,
    });
    const encoded = encoder.msgUpdateMetadataOwnership(msgupd);

    const fee = {
      amount: [
        {
          denom: "aphoton",
          amount: "4",
        },
      ],
      gas: "200000",
    };
    return this.anconWeb3client.signAndBroadcast(encoded, fee);
  }

  /** Relays message to chain b, returns bool or revert*/
  async relayMessage() {}

  /** Executes nft ownership claim on chain b */
  async executeNftOwnershipClaim() {}

  async     mintNft(uri: string) {
    // anchor to nft
    let gasPrice = ethers.BigNumber.from(22000000000);

    let gasLimit = ethers.BigNumber.from(70000);
    const approveTx = await this.daiWeb3contract.methods
      .approve(this.nftWeb3Contract._address, "1000000000000000000")
      .send({
        gasPrice: gasPrice,
        gas: gasLimit,
        from: this.currentAccount,
      });

    // TODO: wait 5 s

    const mintnft = await this.nftWeb3Contract.methods
      .mint(this.currentAccount, uri)
      .send({
        gasPrice: gasPrice,
        gas: gasLimit,
        from: this.currentAccount,
      });

    // gasLimit = await this.ethersContract.estimateGas.mint(
    //   this.currentAccount,
    //   uri
    // );
    // gasLimit = BigNumber.from(gasLimit).add(50000).toBigInt().toString(10);

    // const txmint = await this.ethersContract.methods.mint(
    //   this.currentAccount,
    //   uri,
    //   {
    //     gasPrice,
    //     gasLimit,
    //   }
    // );

    // const log = await txmint.wait(1);
    //
    //this.txid = log.blockHash;

    this.loading = false;
  }

  async loadViewer() {
    if (this.ancon && this.cidindex) {
      const path = "/";
      const body = await fetch(
        `http://localhost:1317/ancon/${this.cidindex}${path}`
      );

      const res = await body.json();

      this.viewItems = {
        signedFiles: [
          {
            cid: res.image,
            ...res,
          },
        ],
      } as any;
    }
  }

  async printPdf() {}
}
</script>
