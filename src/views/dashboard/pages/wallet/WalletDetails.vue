<template>
  <v-expansion-panel-content>
    <v-list>
      <v-list-item
        v-for="(item, i) in this.items"
        two-line
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-expansion-panel-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { KeystoreIndex } from "../shared/KeystoreIndex";

interface WalletDetailsItem {
  title: String;
  subtitle: String;
}

@Component({})
export default class WalletDetails extends Vue {
  @Prop()
  readonly didId: String;

  @Prop()
  readonly currentAddress: String;

  @Prop()
  readonly currentKeystore?: KeystoreIndex;

  get items(): WalletDetailsItem[] {
    return [{
      title: "DID",
      subtitle: this.didId
    }, {
      title: "Address",
      subtitle: this.currentAddress
    }, {
      title: "Linked to Smart Card",
      subtitle: this.getP11Name()
    }, {
      title: "Linked to P12",
      subtitle: this.getP12Name()
    }, {
      title: "Creation Date",
      subtitle: this.getKeystoreCreationDate()
    }]
  }

  getKeystoreCreationDate(): String {
    if (!this.currentKeystore) return '';
    return new Date(this.currentKeystore.created).toString();
  }

  getP11Name() {
    return this?.currentKeystore?.linkedExternalKeystores?.pkcs11?.tokenIndex || "no";
  }

  getP12Name() {
    if (this?.currentKeystore?.linkedExternalKeystores?.pkcs12) {
      return (
        this.currentKeystore.linkedExternalKeystores.pkcs12?.name ||
        "No name found"
      );
    }

    return "no";
  }
}
</script>