<template>
  <v-app-bar app dense color="black" dark>
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-icon">
        <img src="../../../assets/xdv.png" width="64" />
      </span>
    </v-toolbar-title>
    <v-row justify="space-between">
      <v-col md="6">
        
      </v-col>
      <v-col md="6" align="right">
        <v-btn href="https://bafybeic5al5fyuj2hohxo37xnwzyoojpwrhv2vpmd3azwpx22i2hcjaqiu.ipfs.infura-ipfs.io/wallet-1.0.0.jar" text offset="10"
          > Download signer</v-btn
        >
        <v-btn href="https://twitter.com/molekilla/status/1416434509944393736?s=20" text offset="10"
          > Guides</v-btn
        >
      </v-col>
    </v-row>

    <!---User -->
    <v-dialog v-model="shareAddressDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Share Address</span>
        </v-card-title>

        <v-card-text>
          <qrcode value="walletInfo.address" :options="{ width: 200 }"></qrcode>
          {{ walletInfo.address }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="shareAddressDialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="copyAddress()">Copy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script lang="ts">
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { Session } from "../../../views/dashboard/pages/shared/Session";
import copy from "copy-to-clipboard";
// Utilities
import { mapState, mapMutations } from "vuex";
import { ethers } from "ethers";
const xdvnftAbi = require("../../../../src/abi/xdvnft");
const xdvAbi = require("../../../../src/abi/xdv.json");

export default {
  name: "Header",

  components: {
    [VueQrcode.name]: VueQrcode,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    balances: {
      bnb: 0,
      dai: 0,
      daiMock: 0,
    },
    connected: false,
    shareAddressDialog: false,
    showLogo: true,
    showSearch: false,
    notifications: [
      {
        title: "Launch Admin",
        iconbg: "error",
        icon: "mdi-link-variant",
        desc: "Just see the my new admin!",
        time: "9:30AM",
      },
      {
        title: "Event today",
        iconbg: "success",
        icon: "mdi-calendar-check",
        desc: "Just a reminder that you have event",
        time: "10:30AM",
      },
      {
        title: "Settings",
        iconbg: "info",
        icon: "mdi-cog",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Pavan Kumar",
        iconbg: "indigo",
        icon: "mdi-account",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    messages: [
      {
        title: "Sonu Nigam",
        avatar: "1",
        avatarstatus: "success",
        desc: "Singing Show tonigh at 9pm!",
        time: "9:30AM",
      },
      {
        title: "Sonu Nigam",
        avatar: "2",
        avatarstatus: "error",
        desc: "The greate malody songs ever sung",
        time: "10:30AM",
      },
      {
        title: "Arijit singh",
        avatar: "3",
        avatarstatus: "warning",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Pavan Kumar",
        avatar: "4",
        avatarstatus: "success",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    walletInfo: {
      address: "",
    },
    walletActions: [{ key: "Show QR" }],
    href() {
      return (location.href = "#/wallet");
    },
  }),

  computed: {
    ...mapState(["Sidebar_drawer"]),
  },

  mounted: async function () {
    const { currentKeystore } = await Session.getSessionInfo();
    this.walletInfo = currentKeystore || {
      address: "",
    };
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    web3Selector() {
      // @ts-ignore
      if (window.BinanceChain) {
        // @ts-ignore
        return BinanceChain;
      } else {
        // @ts-ignore
        return window.ethereum;
      }
    },
    async web3Connect() {
      // @ts-ignore
      if (window.BinanceChain) {
        // @ts-ignore
        await BinanceChain.enable();
      } else {
        // @ts-ignore
        await window.ethereum.enable();
      }
      this.connected = true;
      await this.loadBalances();
    },
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    searchbox: function () {
      this.showSearch = !this.showSearch;
    },
    async loadBalances() {
      this.currentAccount = (await this.web3Selector().enable())[0];
      this.ethersInstance = new ethers.providers.Web3Provider(
        this.web3Selector()
      );
      this.DAIAddress = `0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867`;

      const dai = new ethers.Contract(
        this.DAIAddress,
        xdvnftAbi.DAI.raw.abi,
        this.ethersInstance.getSigner()
      );

      setInterval(async () => {
        const [daiBal] = await dai.functions.balanceOf(this.currentAccount);
        const daiMock = new ethers.Contract(
          xdvnftAbi.DAI.address.bsctestnet,
          xdvnftAbi.DAI.raw.abi,
          this.ethersInstance.getSigner()
        );
        const [daiMockBal] = await daiMock.functions.balanceOf(
          this.currentAccount
        );

        const bnb = await this.ethersInstance.getBalance(this.currentAccount);

        this.balances.bnb = ethers.utils.formatEther(bnb);
        this.balances.dai = ethers.utils.formatEther(daiBal);
        this.balances.daiMock = ethers.utils.formatEther(daiMockBal);
      }, 1250);
    },
    copyAddress: function () {
      copy(this.walletInfo.address);
    },
    handleAction: function (item) {
      if (item.key === "Show QR") {
        this.shareAddressDialog = true;
      }
      // if (item.key === 'Share address') {

      //   // @ts-ignore
      //   navigator.share(
      //     {
      //       title: 'XDV Wallet address',
      //       text: this.walletInfo.address,
      //       url: 'https://app.xdv.digital'
      //     },
      //     // @ts-ignore
      //     {
      //       // @ts-ignore
      //       copy: true,
      //       email: true,
      //       print: true,
      //       sms: true,
      //       smessenger: true,
      //       // @ts-ignore
      //       facebook: true,
      //       whatsapp: true,
      //       twitter: true,
      //       linkedin: true,
      //       telegram: true,
      //       skype: true,
      //     }
      //   );
      // }
    },
  },
};
</script>

<style lang="scss">
.v-application #main-sidebar.theme--dark.white {
  background: #363636 !important;
}
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>
