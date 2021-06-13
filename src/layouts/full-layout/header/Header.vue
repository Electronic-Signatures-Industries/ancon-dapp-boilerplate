<template>
  <v-app-bar app clipped-left clipped-right color="black" dark>
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-icon">
        <img src="../../../assets/klip_white.png" width="64" />

      </span>
      <!-- 
        <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/logo-light-text.png" class="mt-2" />
      </span> -->
    </v-toolbar-title>
    <!---Logo part -->
    <!---Search part -->
    <!-- <v-btn dark icon class="mr-1 d-sm-block d-none" @click="searchbox">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
 -->
    <div v-if="showSearch" class="searchinput primary">
      <template>
        <v-text-field
          placeholder="Search & hit enter"
          class="mt-3 mb-0"
          append-icon="mdi-close"
          @click:append="searchbox"
        ></v-text-field>
      </template>
    </div>
    <!---/Search part -->
    <v-spacer />
    <!---right part -->
    <!---Notification -->
    <!-- <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-1">
          <v-badge color="red" dot>
            <v-icon>mdi-message</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <h4 class="px-5 py-3 pt-2 font-weight-medium title">Notifications</h4>
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in notifications" :key="i" @click="href">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class>
                <v-btn class="mr-3" depressed fab small dark :color="item.iconbg">
                  <v-icon dark>{{ item.icon }}</v-icon>
                </v-btn>
              </div>
              <div>
                <h4 class="font-weight-medium">{{ item.title }}</h4>
                <span class="text--secondary caption descpart d-block text-truncate">{{item.desc}}</span>
                <small class="text--secondary">{{item.time}}</small>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!---Notification -->
    <!---Messages -->
    <!-- <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-2">
          <v-badge color="red" dot>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <h4 class="px-5 pt-2 py-3 font-weight-medium title">Messages</h4>
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in messages" :key="i" @click="href">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class="mr-3">
                <v-badge bordered bottom :color="item.avatarstatus" dot offset-x="10" offset-y="10">
                  <v-avatar>
                    <img
                      :src="'https://www.wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/assets/images/users/' + item.avatar + '.jpg'"
                      :alt="item.title"
                    />
                  </v-avatar>
                </v-badge>
              </div>
              <div>
                <h4 class="font-weight-medium">{{ item.title }}</h4>
                <span class="text--secondary caption descpart d-block text-truncate">{{item.desc}}</span>
                <small class="text--secondary">{{item.time}}</small>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!---Messages -->
    <v-row>
      <!-- <v-col> <b>Wallet address</b> {{ walletInfo.address }} </v-col> -->
    </v-row>
    <!---User -->
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-2">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-content>
          <div style="width:500px;height:200px;padding:10px">
            <v-list-item two-line>
              <v-list-item-title>
                <p><b>DID</b></p> 
                {{ this.didId }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-title>
                <p><b>ADDRESS</b></p> 
                {{ this.currentAddress }}</v-list-item-title>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-title>
                <p><b>BALANCE</b></p> 
                {{ this.balance }} {{this.currencyName}} 
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list-item-content>
      </v-list>
    </v-menu>
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
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { Session } from "../../../views/dashboard/pages/shared/Session";
import copy from "copy-to-clipboard";
// Utilities
import { mapState, mapMutations } from "vuex";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeystoreIndex } from "../shared/KeystoreIndex";
import Moment from "moment";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BN from "bn.js";



export default {
  name: "Header",

  components: {
    [VueQrcode.name]: VueQrcode
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    didId: {
      type: String,
      default: '12345678',
    },
    currentAddress:{
      type: String,
      default: '12345678',
    },
    balance:{
      type: String,
      default: '12345678',
    },
    currencyName:{
      type: String,
      default: '12345678',
    }
  },
  data: () => ({
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
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    searchbox: function () {
      this.showSearch = !this.showSearch;
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
