<template>
  <v-expansion-panel-content>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>DID</v-list-item-title>
          <v-list-item-subtitle>{{ this.didId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        :two-line="this.balance === ''"
        :three-line="this.balance !== ''"
        >
        <v-list-item-content>
          <v-list-item-title>Ethereum Address</v-list-item-title>
          <v-list-item-subtitle>{{ this.currentAddress }}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="this.balance !== ''">
            Balance: {{ this.balance }} {{ this.currencyName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Linked to Smart Card</v-list-item-title>
          <v-list-item-subtitle>{{ this.P11Name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Linked to P12</v-list-item-title>
          <v-list-item-subtitle>{{ this.P12Name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Creation Date</v-list-item-title>
          <v-list-item-subtitle>{{ this.keystoreCreationDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-expansion-panel-content>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeystoreIndex } from "../shared/KeystoreIndex";
import Moment from "moment";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BN from "bn.js";

@Component({})
export default class WalletDetails extends Vue {
  @Prop()
  readonly didId: string;

  @Prop()
  readonly currentAddress: string;

  @Prop()
  readonly currentKeystore?: KeystoreIndex;

  @Prop()
  readonly erc20Contract?: Contract;

  balance = "";
  currencyName = "";

  get keystoreCreationDate(): string {
    if (!this.currentKeystore) return '';
    return Moment(this.currentKeystore.created).toISOString();
  }

  get P11Name() {
    return this?.currentKeystore?.linkedExternalKeystores?.pkcs11?.tokenIndex || "no";
  }

  get P12Name() {
    if (this?.currentKeystore?.linkedExternalKeystores?.pkcs12) {
      return (
        this.currentKeystore.linkedExternalKeystores.pkcs12?.name ||
        "No name found"
      );
    }

    return "no";
  }

  @Watch("erc20Contract")
  async setBalance(val: Contract) {
    if (!val || !this.currentAddress) {
      this.balance = "";
    }
    const [resultInWei, currencyName] = await Promise.all<BN, string>([
      val.methods.balanceOf(this.currentAddress).call(),
      val.methods.name().call()
    ]);
    this.balance = Web3.utils.fromWei(resultInWei);
    this.currencyName = currencyName || "tokens";
  }
}
</script>