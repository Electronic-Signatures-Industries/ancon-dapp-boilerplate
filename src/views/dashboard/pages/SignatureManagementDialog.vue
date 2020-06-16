<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Sign documents</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="6" md="6">
              <v-radio-group v-model="value.operation" label="Operation" column>
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
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="None"
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
                label="Files"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                required
                :items="wallets"
                v-model="value.wallet"
                label="Wallet"
                item-text="name"
                item-value="name"
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                required
                :items="algos"
                v-model="value.algorithm"
                label="Algorithm"
                single-line
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-select
                required
                :items="outputs"
                v-model="value.output"
                return-object
                item-text="key"
                item-value="value"
                label="Output"
                single-line
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="change">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { AlgorithmTypeString, AlgorithmType } from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';

export enum SigningOutput {
  QR,
  JWT,
  VCRef,
  XDVRef,
  Base64,
}
export const SignOutput = [
  { key: 'QR Code' , value: SigningOutput.QR },
  { key: 'JWT' , value: SigningOutput.JWT },
  { key: 'VC link' , value: SigningOutput.VCRef },
  { key: 'XDV link' ,value: SigningOutput.XDVRef },
  { key: 'Base 64', value: SigningOutput.Base64 },
];
@Component({
  name: 'xdv-sign',
  props: ['value', 'show', 'wallets'],
})
export default class SignatureManagementDialog extends Vue {
  value: {
    operation: 'sign' | 'verify';
    specification: 'none' | 'cms' | 'xmldsig';
    algorithm: string;
    output: any;
    wallet: KeystoreIndex;
    files: File[];
  };
  outputs = SignOutput;
  wallets: KeystoreIndex[];
  algos: AlgorithmTypeString[] = ['RSA', 'ES256K', 'P256', 'ED25519', 'BLS'];
  show = false;
  change() {
    this.$emit('input', this.value);
  }
}
</script>
