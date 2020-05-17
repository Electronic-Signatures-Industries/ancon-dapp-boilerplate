<template>
  <v-app>
    <dashboard-core-app-bar v-if="canInit" />
    <!-- <dashboard-core-drawer v-if="canInit" /> -->
    <dashboard-core-view v-if="canInit" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { SolidoSingleton } from "./components/core/SolidoSingleton";
import Onboard from "bnc-onboard";
import Web3 from "web3";

@Component({
  name: "DashboardIndex",
  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar.vue"),
    DashboardCoreView: () => import("./components/core/View.vue")
  }
})
export default class DashboardIndex extends Vue {
  solidoProps = { db: null, contracts: null };
  onboarding = null;
  onboard = null;
  defaultNetwork = 3;
  startOnboarding = null;
  onboardSync = {
    address: this.handleAddressChange,
    network: this.handleNetworkChange,
    balance: this.handleBalanceChange,
    wallet: this.handleWalletChange
  };
  _network = 3;
  _address = "";
  canInit = false;

  get address() {
    return localStorage.getItem("address");
  }
  set address(value) {
    localStorage.setItem("address", value);
  }
  get network() {
    return +localStorage.getItem("network");
  }
  set network(value: number) {
    localStorage.setItem("network", value.toString());
  }
  handleAddressChange(address) {
    this.address = address;
  }

  async handleNetworkChange(networkId) {
    this.network = networkId;
  }

  handleBalanceChange(balance) {}

  handleWalletChange(wallet) {
    localStorage.setItem("selectedWallet", wallet.name);
  }

  async mounted() {
    if (this.$route.path.indexOf("verify_credentials") > -1
    || this.$route.path.indexOf("workflow") > -1
    || this.$route.path.indexOf("durable_website") > -1) {
      const props = await (this as any).$loadOffchainDependencies({
        networkId: this.network,
        account: this.address
      });
      SolidoSingleton.setProps(props);
      this.canInit = true;

      return;
    }

    this.onboard = Onboard({
      dappId: (Vue as any).appconfig.BLOCKNATIVE_API_KEY,
      networkId: this.defaultNetwork,
      subscriptions: this.onboardSync,
      walletSelect: undefined,
      walletCheck: undefined
    });

    if (!(window as any).ethereum) {
      this.$router.push({ path: "onboard" });
    } else if (localStorage.getItem("selectedWallet") === null) {
      // display onboard.js

      const hasSelected = await this.onboard.walletSelect();
      if (!hasSelected) {
        // need to select
      } else {
        const self = this;
        const init = await this.onboard.walletCheck();
        setTimeout(async () => {
          const props = await (self as any).$loadOnchainDependencies({
            networkId: self.onboard.getState().network,
            account: self.onboard.getState().address
          });
          SolidoSingleton.setProps(props);
          self.canInit = init;
          self.$router.push({ path: "client" });
        }, 800);
      }
    } else {
      // get the selectedWallet value from local storage
      const previouslySelectedWallet = window.localStorage.getItem(
        "selectedWallet"
      );

      // call wallet select with that value if it exists
      if (previouslySelectedWallet != null) {
        await this.onboard.walletSelect(previouslySelectedWallet);
      }
      const props = await (this as any).$loadOnchainDependencies({
        networkId: this.network,
        account: this.address
      });
      await (window as any).ethereum.enable();
      SolidoSingleton.setProps(props);
      this.canInit = true;
    }
  }
}
</script>
