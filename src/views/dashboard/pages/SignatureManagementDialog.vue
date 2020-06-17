<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Sign documents</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="6" md="6">
              <v-radio-group
                v-model="value.operation"
                class="font-weight-medium"
                label="Operation"
                column
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="Sign"
                      color="red"
                      value="sign"
                    ></v-radio>
                  </template>
                  <span>Sign</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="Verify"
                      color="red"
                      value="verify"
                    ></v-radio>
                  </template>
                  <span>Verify</span>
                </v-tooltip>
              </v-radio-group>
            </v-col>
            <v-col cols="6" md="6">
              <v-radio-group
                v-model="value.specification"
                label="Specification"
                column
                class="font-weight-medium"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="None"
                      @change="filter"
                      color="red"
                      value="none"
                    ></v-radio>
                  </template>
                  <span>No signing specification applied</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="CMS"
                      @change="filter"
                      color="red"
                      value="cms"
                    ></v-radio>
                  </template>
                  <span>CMS/PKCS#7 - X509 only</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="XmlDsig"
                      @change="filter"
                      color="red"
                      value="xmldsig"
                    ></v-radio>
                  </template>
                  <span>XML Digital Signatures - X509 only</span>
                </v-tooltip>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-file-input
                prepend-icon="mdi-paperclip"
                v-model="value.files"
                multiple
                show-size
                class="font-weight-medium"
                v-if="value.isBinaryEnabled"
                label="Files"
              ></v-file-input>
              <v-textarea
                v-model="value.content"
                v-if="!value.isBinaryEnabled"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                required
                class="font-weight-medium"
                :items="wallets"
                v-model="value.wallet"
                @change="setWalletId"
                label="Wallet"
                item-text="name"
                item-value="name"
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="6">
              <v-select
                required
                class="font-weight-medium"
                :items="algos"
                v-model="value.algorithm"
                label="Algorithm"
                :readonly="value.specification !== 'none'"
                single-line
              ></v-select>
            </v-col>

            <v-col cols="6" md="6">
              <v-select
                required
                :items="outputs"
                v-model="value.output"
                item-text="key"
                class="font-weight-medium"
                item-value="value"
                :readonly="value.specification === 'xmldsig'"
                label="Output"
                single-line @change="execute"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-textarea
                v-model="signatureView"
                v-if="signatureView"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" cols="12">
              <v-alert text color="blue" v-if="loading">
                <v-progress-circular
                  indeterminate
                  v-if="loading"
                  color="blue darken-1"
                ></v-progress-circular>
                Signing...
              </v-alert>
              <v-alert text color="red" v-if="hasErrors">
                {{ alertMessage }}
              </v-alert>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        
                <v-btn color="blue darken-1" text @click="change">OK</v-btn>
        <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  AlgorithmTypeString,
  AlgorithmType,
  Wallet,
  CMSSigner,
} from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import { base64, arrayify } from 'ethers/utils';
const promiseFileReader = require('promise-file-reader');
export enum SigningOutput {
  QR,
  JWT,
  VCRef,
  XDVRef,
  Base64,
  PKCS7PEM,
  XMLDSIG,
}
export const SignOutput = [
  { key: 'QR Code', value: SigningOutput.QR },
  { key: 'JWT', value: SigningOutput.JWT },
  { key: 'VC link', value: SigningOutput.VCRef },
  { key: 'XDV link', value: SigningOutput.XDVRef },
  { key: 'Base 64', value: SigningOutput.Base64 },
  { key: 'CMS - PKCS#7 PEM', value: SigningOutput.PKCS7PEM },
  { key: 'XmlDsig Attached', value: SigningOutput.XMLDSIG },
];
interface SignatureManagementModel {
  executeLabel: string;
  canExecute: boolean;
  isBinaryEnabled: boolean;
  operation: 'sign' | 'verify';
  specification: 'none' | 'cms' | 'xmldsig';
  algorithm: AlgorithmTypeString;
  output: any;
  wallet: KeystoreIndex;
  files: File[];
}

@Component({
  name: 'xdv-sign',
  props: ['value', 'wallet', 'show', 'wallets'],
  watch: {
    value: async function(
      current: SignatureManagementModel,
      old: SignatureManagementModel
    ) {
      current.canExecute = true;

      current.isBinaryEnabled = false;
      if (current.operation === 'verify') {
        current.isBinaryEnabled = current.output === SigningOutput.QR;
      } else {
        current.isBinaryEnabled = true;
      }

      if (current.files && current.files.length > 0) {
        if (current.specification === 'xmldsig') {
          current.canExecute = !!current.files.find((f) =>
            f.name.toLowerCase().includes('.xml')
          );
        }
      }
      current.executeLabel = current.operation === 'sign' ? 'Sign' : 'Verify';

    },
  },
})
export default class SignatureManagementDialog extends Vue {
  value: SignatureManagementModel;

  hasErrors = false;
  alertMessage = '';
  loading = false;
  cloneWallets;
  signatureView: string = '';
  wallet: Wallet;
  outputs = SignOutput;
  wallets: KeystoreIndex[];
  algos: AlgorithmTypeString[] = ['RSA', 'ES256K', 'P256', 'ED25519', 'BLS'];
  show;

  beforeUpdate() {
    this.cloneWallets = [...this.wallets];
  }
  change() {
    this.$emit('input', this.value);
  }

  filter() {
    if (this.value.specification === 'cms') {
      this.wallets = this.cloneWallets.filter((i) => !i.address);
      this.value.algorithm = 'RSA';
      // this.value.output = SigningOutput.PKCS7PEM;
    } else if (this.value.specification === 'xmldsig') {
      this.wallets = this.cloneWallets.filter((i) => !i.address);
      this.value.algorithm = 'RSA';
      this.value.output = SigningOutput.XMLDSIG;
    } else {
      this.wallets = [...this.cloneWallets];
    }
  }

  setWalletId() {
    this.wallet.id = this.value.wallet.keystore;
  }
  async execute() {
    // get algo
    const kp = await this.wallet.getPrivateKey(this.value.algorithm);
    const keyExports = await this.wallet.getPrivateKeyExports(
      this.value.algorithm
    );
    let result;
    if (this.value.operation === 'sign') {
      // get content to sign
      if (this.value.isBinaryEnabled) {
        // sign file blobs
        if (this.value.specification === 'cms') {
          this.loading = true;
          // sign with CMS, return detached
          const rsaKeys = await this.wallet.getImportKey(
            `import:X509:${this.wallet.id}`
          );
          try {
            let data = await this.value.files[0].arrayBuffer();
            result = CMSSigner.sign(
              rsaKeys.key.selfSignedCert,
              rsaKeys.key.pemAsPrivate,
              Buffer.from(data)
            );
          } catch (e) {
            console.log(e);
          }
        } else if (this.value.specification === 'xmldsig') {
          // sign with xmldsig, return embedded
          const rsaKeyCert = await this.wallet.getImportKey(
            this.value.wallet.keystore
          );
        } else {
          // sign regular
          if (this.value.output === SigningOutput.JWT) {
            // if jwt usse jwt signer
          }
        }
      } else {
        // sign something else
      }

      // raw output
      setTimeout(() => {
      this.loading = false;}, 1000);
      if (this.value.output === SigningOutput.PKCS7PEM) {
        this.signatureView = result;
      }
      if (this.value.output === SigningOutput.Base64) {
        // convert output to base64
        this.signatureView = base64.encode(Buffer.from(result));
      }
      if (this.value.output === SigningOutput.QR) {
        // convert output to qr
      }
      if (this.value.output === SigningOutput.XDVRef) {
        // take output and upload to Swarm using DriveSwarmManager
      }
    } else {
      // get content to verify
      if (this.value.isBinaryEnabled) {
        // verify file blobs
      } else {
        // verify content
        if (this.value.specification === 'cms') {
          // sign with CMS, return detached
          const rsaKeyCert = await this.wallet.getImportKey(
            this.value.wallet.keystore
          );
        } else if (this.value.specification === 'xmldsig') {
          // sign with xmldsig, return embedded
          const rsaKeyCert = await this.wallet.getImportKey(
            this.value.wallet.keystore
          );
        } else {
          // sign regular
          if (this.value.output === SigningOutput.JWT) {
            // if jwt usse jwt signer
          }
        }
      }

      // raw output

      if (this.value.output === SigningOutput.Base64) {
        // convert output to base64
      }
      if (this.value.output === SigningOutput.QR) {
        // convert output to qr
      }
      if (this.value.output === SigningOutput.XDVRef) {
        // take output and upload to Swarm using DriveSwarmManager
      }
    }
  }
}
</script>
