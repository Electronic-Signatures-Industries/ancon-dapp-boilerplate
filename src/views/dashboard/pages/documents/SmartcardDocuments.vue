<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>

    <v-card>
      <v-tabs background-color="blue-berry accent-4" dark v-model="tabIndex">
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
                <v-col offset-sm="9" class="d-flex align-items-center"
                  ><cryptoicon symbol="bnb" size="24" class="cripto-icon" />
                  {{
                    balances.bnb
                  }}
                </v-col>
                <v-col class="d-flex align-items-center">
                  <cryptoicon symbol="dai" size="24" class="cripto-icon" />
                  {{
                    balances.dai
                  }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1" xs="1">
                  <v-progress-circular
                    indeterminate
                    v-if="loading"
                    color="primary"
                  ></v-progress-circular>
                </v-col>
                <v-col xs="6" sm="6" offset-sm="2">
                  <v-file-input
                    multiple
                    v-if="item.settings.signing !== 'pades'"
                    show-size
                    chips
                    label="Files"
                    v-model="files"
                  ></v-file-input>
                  <v-file-input
                    multiple
                    v-if="item.settings.signing === 'pades'"
                    show-size
                    chips
                    :accept="item.settings.signing.contentType"
                    label="PDF Documents"
                    v-model="files"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="12" class="d-flex">
                  <v-radio-group v-model="typelink.mode" mandatory row>
                    <v-radio label="Onchain timestamp" value="1"></v-radio>
                    <v-radio label="Non fungible token" value="2"></v-radio>
                    <v-radio label="SWARM" value="3"></v-radio>
                    <!-- <v-radio
                      label="Only decentralized storage"
                      value="3"
                    ></v-radio> -->
                  </v-radio-group>
                  <v-checkbox
                    v-model="emulateSmartcard"
                    label="Emulate Smartcard"
                    v-if="item.settings.signing == 'pkcsjwt'"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="center" xs="12">
                  <v-btn
                    color="pink"
                    v-if="connected === false"
                    @click="web3Connect"
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
                    Sign
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
                    <div>IPLD index {{ cidindex }}</div>

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
                                  <v-btn v-show="false"
                                    @click="
                                      loadCid(
                                        item.cid,
                                        viewItems.type,
                                        item.name,
                                        item.contentType
                                      )
                                    "
                                    ><v-icon right dark> mdi-download </v-icon>
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
                  <v-card-title class="text-h5"> Transactions </v-card-title>

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
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Wallet } from "xdv-universal-wallet-core";
import "share-api-polyfill";

import { BigNumber, ethers } from "ethers";
import { AnconManager } from "../../../../views/dashboard/pages/wallet/anconManager";
import { SwarmManager  } from "../../../../views/dashboard/pages/wallet/SwarmManager";
import { firstValueFrom, forkJoin, map, Subject } from "rxjs";
import { base64 } from "ethers/lib/utils";
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
  DAIAddress: string = `0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867`;
  tabIndex = null;
  tabitems = [
    {
      key: "simple",
      label: "Simple",
      settings: {
        signing: "simple",
        contentType: null,
      },
    },
    // {
    //   key: "pkcsjwt",
    //   label: "Protected JWT",
    //   settings: {
    //     signing: "pkcsjwt",
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
  viewItems = [];
  transactions = [];
  emulateSmartcard = false;
  wallet: Wallet;

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
    this.swarm = new SwarmManager();
    const hash = await this.swarm.createPostageStamp(this.files[0]);
    console.log(hash)
    // @ts-ignore
    this.$confirm({
      auth: true,
      message: "Please enter a passphrase",
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
    this.ancon = new AnconManager();

    // TODO: Ask for passphrase
    await this.ancon.start(passphrase);
    // @ts-ignore
    if (window.BinanceChain) {
      // @ts-ignore
      await BinanceChain.enable();
    } else {
      // @ts-ignore
      await window.ethereum.enable();
    }
    this.connected = true;
    this.currentAccount = (await this.web3Selector.enable())[0];

    this.ethersInstance = new ethers.providers.Web3Provider(this.web3Selector);

    // DAI
    this.daiContract = new ethers.Contract(
      this.DAIAddress,
      xdvnftAbi.DAI.raw.abi,
      this.ethersInstance.getSigner()
    );
    // XDVNFT
    this.ethersContract = new ethers.Contract(
      xdvnftAbi.XDVNFT.address.bsctestnet,
      xdvnftAbi.XDVNFT.raw.abi,
      this.ethersInstance.getSigner()
    );
    this.anchorContract = new ethers.Contract(
      xdvAbi.networks["97"].address,
      xdvAbi.abi,
      this.ethersInstance.getSigner()
    );
    await this.loadBalances();
    await this.loadTransactions();
  }

  async loadBalances() {
    setInterval(async () => {
      const [daiBal] = await this.daiContract.functions.balanceOf(
        this.currentAccount
      );

      const bnb = await this.ethersInstance.getBalance(this.currentAccount);

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
    lnk = await this.createSimpleDocumentNode(this.files);

    if (lnk && this.typelink.mode === "1") {
      this.result = await this.anchor(lnk);
    } else if (lnk && this.typelink.mode === "2") {
      this.result = await this.mintNft(lnk);
    } else {
      // none
    }

    this.cidindex = lnk;
    await this.loadViewer();
    await this.loadTransactions();
    this.loading = false;
  }

  async mounted() {
    if (this.$router.currentRoute.params.cid) {
      this.cidindex = this.$router.currentRoute.params.cid || "";
      await this.loadViewer();
    }

    await this.loadTransactions();
  }

  /** Creates simple document node */
  async createSimpleDocumentNode(files?: File[]) {
    this.unlockPin = false;
    this.canUpload = false;
    this.loading = true;
    const fee = {
      amount: [
        {
          denom: "token",
          amount: "1",
        },
      ],
      gas: "5000000",
    };
    try {
      this.cids = [];
      this.items = [];
      await this.ancon.did.authenticate();

      // 1) Upload CIDs
      for (let index = 0; index < this.files.length; index++) {
        const file = this.files[index];
        let result = await this.ancon.blobToKeccak256(file);
        const msg = {
          path: file.name,
          did: this.ancon.did.id,
          from: this.ancon.account,
          time: file.lastModified.toString(),
          mode: "",
          content: base64.encode(result.content),
          contentType: file.type,
          creator: this.ancon.account,
        };
        const { transaction, cid }: any = await this.ancon.anconClient.addFile({
          did: this.ancon.did.id,
          file: msg,
          fee,
        });
        this.cids.push({
          cid: cid.toString(),
          name: file.name,
          contentType: file.type,
        });
        this.items = [
          ...this.items,
          {
            file,
            cid,
          },
        ];
      }

      // 2) Create and store Ancon metadata
      const { transaction, cid }: any =
        await this.ancon.anconClient.executeMetadata(
          {
            name: "Simple signing",
            description: "Description",
            image: `${this.cids[0].cid}/${this.cids[0].name}`,
            sources: this.cids.map((i) => i.cid),
            owner: this.currentAccount, //binance acc
            parent: undefined,
            verifiedCredentialRef: undefined,
            links: undefined,
            creator: this.ancon.account, //binance acccosmos acc
            did: this.ancon.did.id,
            from: this.currentAccount, //binance acc
            fee
          },
        );

      return cid;
    } catch (e) {
      this.loading = false;
      this.$confirm({
        message: `Transaction failed with message ${e.message}`,
        buttons: {
          yes: "OK",
        },
      });
    }
    return null;
  }

  get web3Selector() {
    // @ts-ignore
    if (window.BinanceChain) {
      // @ts-ignore
      return BinanceChain;
    } else {
      // @ts-ignore
      return window.ethereum;
    }
  }

  async mintNft(uri: string) {
    // anchor to nft
    let gasLimit = await this.daiContract.estimateGas.approve(
      this.currentAccount,
      this.ethersContract.address
    );
    gasLimit = BigNumber.from(gasLimit).add(50000).toBigInt().toString(10);
    const [allowed] = await this.daiContract.functions.allowance(
      this.currentAccount,
      this.ethersContract.address
    );

    if (!(allowed as BigNumber).eq("1000000000000000000")) {
      const approve = await this.daiContract.functions.approve(
        this.ethersContract.address,
        "1000000000000000000",
        {
          gasPrice: "22000000000",
          gasLimit,
        }
      );

      await approve.wait(1);
    }
    gasLimit = await this.ethersContract.estimateGas.mint(
      this.currentAccount,
      uri
    );
    gasLimit = BigNumber.from(gasLimit).add(50000).toBigInt().toString(10);

    const txmint = await this.ethersContract.functions.mint(
      this.currentAccount,
      uri,
      {
        gasPrice: "22000000000",
        gasLimit,
      }
    );

    const log = await txmint.wait(1);
    //
    this.txid = log.blockHash;

    this.loading = false;
  }

  async loadViewer() {
    if (this.ancon && this.cidindex) {
      const res = await this.ancon.getObject(this.cidindex);
      
      const result = await this.ancon.getObject(res.image.split('/')[0], res.image.split('/')[1])
      
      this.viewItems = {
        signedFiles: [{
          cid: res.image,
          ...(result)
        }]
      } as any;
    }
  }

  async anchor(uri: string) {
    // anchor to nft
    let gasLimit = await this.daiContract.estimateGas.approve(
      this.currentAccount,
      this.anchorContract.address
    );
    gasLimit = BigNumber.from(gasLimit).add(50000);

    const [allowed] = await this.daiContract.functions.allowance(
      this.currentAccount,
      this.anchorContract.address
    );
    if (!(allowed as BigNumber).eq("2000000000000000000")) {
      const approve = await this.daiContract.functions.approve(
        this.anchorContract.address,
        "2000000000000000000",
        {
          gasPrice: "22000000000",
          gasLimit: gasLimit,
        }
      );

      await approve.wait(1);
    }

    gasLimit = await this.anchorContract.estimateGas.addDocument(
      `did:ethr:${this.currentAccount}`,
      uri,
      "anchoring",
      [this.currentAccount]
    );

    const document = await this.anchorContract.functions.addDocument(
      `did:ethr:${this.currentAccount}`,
      uri,
      "anchoring",
      [this.currentAccount],
      {
        gasPrice: "22000000000",
        gasLimit,
      }
    );

    const log = await document.wait(1);
    this.txid = log.blockHash;
    this.loading = false;
  }
  async printPdf() {}
}
</script>
