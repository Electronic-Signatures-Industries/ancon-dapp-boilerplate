<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div>
          <v-progress-linear
            :active="loading"
            indeterminate
            color="teal"
          ></v-progress-linear>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field v-model="license" label="Licencia" required />
          </v-col>

          <v-btn
            color="success"
            class="mr-4"
            :disabled="loading"
            @click="activate"
          >
            Activar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// import { ReactiveBindings } from 'solido-provider-ethers'
// import { Invoice } from '../Invoice'
import { ethers } from "ethers";
import EthCrypto from "eth-crypto";
import * as moment from "moment";
import * as ipfs from "ipfs-http-client";
import { forkJoin } from "rxjs";
import {
  SolidoSingleton,
} from "../../components/core/SolidoSingleton";
import { MiddlewareOptions } from "../../../../libs";

const md5 = require("js-md5");

@Component({
  name: "Client"
})
export default class Client extends Vue {
  menu = false;
  menu2 = false;
  contracts: any;
  dialogs = {
    debtor: false,
    supplier: false,
    trust: false
  };

  // data
  loading: boolean = false;
  currentInvoice: object = {};
  subsAddInvoice = null;
  subsCertifyInvoice = null;
  subsCertifyDocs = null;
  license = "";
  valid = false;
  modal = false;

  async mounted() {
    const solidoProps: MiddlewareOptions = await SolidoSingleton.getProps();

    const contracts = solidoProps.ethereum.contracts;

    this.contracts = contracts;
  }

  async getPublicKey() {
    // Must be done by backend API
    const contract = this.contracts.Documents.instance;
    const signer = contract.provider.getSigner();

    const hash = await ethers.utils.keccak256(
      this.contracts.Documents.defaultAccount
    );
    const sig = await signer.signMessage(ethers.utils.arrayify(hash));
    const publicKey = ethers.utils.recoverPublicKey(hash, sig);

    return publicKey.replace("0x", "");
  }

  async encrypt(values: string) {
    // Must be done by backend API
    const contract = this.contracts.Documents.instance;
    const signer = contract.provider.getSigner();

    const hash = await ethers.utils.keccak256(
      this.contracts.Documents.defaultAccount
    );
    const sig = await signer.signMessage(ethers.utils.arrayify(hash));
    const publicKey = ethers.utils.recoverPublicKey(hash, sig);

    const data: any = await EthCrypto.encryptWithPublicKey(
      publicKey.replace("0x", ""),
      values
    );

    return EthCrypto.cipher.stringify(data);
  }

  async activate() {
    let { license } = this.$data;
    const lic = ethers.utils.sha256(ethers.utils.toUtf8Bytes(license));

    const { web3 } = window as any;

    this.loading = true;
    const pub = this.getPublicKey();
    const estimate = await this.contracts.Documents.instance.estimate.addIdentity(
      this.contracts.Documents.defaultAccount,
      pub,
      0,
      lic
    );

    const gas = estimate.toNumber();
    const res = await this.contracts.Documents.instance.functions.addIdentity(
      this.contracts.Documents.defaultAccount,
      pub,
      0,
      lic,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;
  }
}

// handle.sed'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
