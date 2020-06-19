<template>
  <v-dialog v-model="show" max-width="800px" persistent>
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
                v-model="value.presets"
                label="Presets"
                column
                class="font-weight-medium"
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
                  <span>No signing presets applied</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="Qualified Signature"
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
                      label="DGI Factura Electronica"
                      color="red"
                      value="xmldsig"
                    ></v-radio>
                  </template>
                  <span>XML Digital Signatures - X509 only</span>
                </v-tooltip>

                <!--
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="W3C Verifiable Claim"
                      color="red"
                      value="vc"
                    ></v-radio>
                  </template>
                  <span>Verifiable Claim</span>
                </v-tooltip> -->

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="XDV Document"
                      color="red"
                      value="xdv"
                    ></v-radio>
                  </template>
                  <span>XDV</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-radio
                      v-on="on"
                      class="font-weight-medium"
                      label="Ethereum Signed Typed Data"
                      color="red"
                      value="eip712"
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
                :accept="accept"
                show-size
                class="font-weight-medium"
                v-if="value.isBinaryEnabled"
                label="Files"
                dense
              ></v-file-input>
              <v-textarea
                v-model="value.content"
                v-if="!value.isBinaryEnabled"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row v-if="signingOptions">
            <v-col cols="4" md="4">
              <v-select
                required
                class="font-weight-medium"
                :items="displayWallets"
                v-model="value.wallet"
                @change="setWalletId"
                label="Wallet"
                dense
                item-text="name"
                item-value="name"
                return-object
                single-line
              ></v-select>
            </v-col>
            <v-col cols="4" md="4">
              <v-select
                required
                dense
                class="font-weight-medium"
                :items="algos"
                v-model="value.algorithm"
                label="Algorithm"
                :readonly="value.presets !== 'none'"
                single-line
              ></v-select>
            </v-col>

            <v-col cols="4" md="4">
              <v-select
                dense
                required
                :items="outputs"
                v-model="value.output"
                item-text="key"
                class="font-weight-medium"
                item-value="value"
                :readonly="value.presets === 'xmldsig'"
                @input="execute"
                label="Output"
                single-line
              ></v-select>
            </v-col>
          </v-row>

          <v-row v-if="signingOptions">
            <v-col cols="10" md="10">
              <v-textarea
                label="Signature"
                class="font-weight-medium"
                v-model="signatureView"
                :disabled="!signatureView"
              ></v-textarea>
            </v-col>
            <v-col cols="2" rows="2">
              <v-row>
                <v-col>
                  <v-tooltip top>
                    <span>Download</span>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        v-on="on"
                        @click="downloadXDVCompactSignature"
                        small
                        color="red accent-4"
                      >
                        <v-icon>mdi-file-download</v-icon>
                      </v-btn>
                    </template></v-tooltip
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-tooltip top>
                    <span>Share XDV Link</span>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        v-on="on"
                        @click="uploadAndShareLink"
                        small
                        color="red accent-4"
                      >
                        <v-icon>mdi-file-upload</v-icon>
                      </v-btn>
                    </template></v-tooltip
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row v-if="!signingOptions">
            <v-col cols="12" md="12">
              <v-list two-line flat>
                <v-list-item-group>
                  <template v-for="(item, index) in verificationReport">
                    <v-list-item :key="item.subtitle">
                      <v-list-item-content>
                        <v-list-item-title
                          v-if="item.isError"
                          v-text="item.title"
                          class="red--text font-weight-medium"
                        ></v-list-item-title>

                        <v-list-item-title
                          v-if="!item.isError"
                          v-text="item.title"
                          class="green--text font-weight-medium"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="item.headline"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-text="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.action"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider
                      v-if="index + 1 < verificationReport.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
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
                {{ operationType }} ...
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
        <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
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
  XmlDsig,
} from 'xdvplatform-wallet';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { KeystoreIndex } from './KeystoreIndex';
import { base64, arrayify } from 'ethers/utils';
import { Session } from './Session';
import { ShareUtils, XDVFileFormat } from './ShareUtils';
import { create } from 'xmlbuilder2';
export enum SigningOutput {
  QR,
  JWT,
  VCRef,
  XDVRef,
  Base64,
  PKCS7PEM,
  XMLDSIG,
  EthereumSignature,
}
export const PDF_API_URL = 'http://localhost:8081/';
export const SignOutput = [
  { key: 'QR Code', value: SigningOutput.QR },
  { key: 'JWT', value: SigningOutput.JWT },
  //  { key: 'VC link', value: SigningOutput.VCRef },
  { key: 'XDV link', value: SigningOutput.XDVRef },
  { key: 'Base 64', value: SigningOutput.Base64 },
  { key: 'CMS - PKCS#7 PEM', value: SigningOutput.PKCS7PEM },
  { key: 'XmlDsig Attached', value: SigningOutput.XMLDSIG },
  { key: 'Ethereum Signature', value: SigningOutput.EthereumSignature },
];
interface SignatureManagementModel {
  content: File[];
  executeLabel: string;
  canExecute: boolean;
  isBinaryEnabled: boolean;
  operation: 'sign' | 'verify';
  presets: 'none' | 'cms' | 'xmldsig' | 'vc' | 'xdv' | 'eip712';
  algorithm: AlgorithmTypeString;
  output: any;
  wallet: KeystoreIndex;
  files: File[] | File;
}

@Component({
  name: 'xdv-sign',
  props: ['value', 'wallet', 'show'],
})
export default class SignatureManagementDialog extends Vue {
  value: SignatureManagementModel;

  hasErrors = false;
  signingOptions = true;
  alertMessage = '';
  loading = false;
  displayWallets = [];
  cloneWallets = [];
  signatureView: string = '';
  wallet: Wallet;
  outputs = SignOutput;
  algos: AlgorithmTypeString[] = ['RSA', 'ES256K', 'P256', 'ED25519', 'BLS'];
  show;
  operationType: string = '';
  accept = '*/*';
  shareFormat: XDVFileFormat;
  validated: any;
  contentValidated: XDVFileFormat;
  verificationReport: any = [];

  @Watch('value.operation')
  async onChangeOps(ops, oldVal) {
    this.signingOptions = ops === 'sign' ? true : false;
  }

  @Watch('value.presets')
  async onChange(presets, oldVal) {
    this.accept = '*/*';
    this.value.isBinaryEnabled = true;

    if (this.value.operation === 'sign') {
      this.operationType = 'Signing...';

      if (presets === 'cms') {
        this.displayWallets = this.cloneWallets.filter((i) => !i.address);
        this.value.algorithm = 'RSA';
        this.value.output = SigningOutput.PKCS7PEM;
      } else if (presets === 'xmldsig') {
        this.accept = 'text/xml';
        this.displayWallets = this.cloneWallets.filter((i) => !i.address);
        this.value.algorithm = 'RSA';
        this.value.output = SigningOutput.XMLDSIG;
      } else if (presets === 'vc') {
        this.displayWallets = this.cloneWallets.filter((i) => i.address);
        this.value.algorithm = 'ES256K';
        this.value.output = SigningOutput.VCRef;
      } else if (presets === 'xdv') {
        this.displayWallets = this.cloneWallets.filter((i) => i.address);
        this.value.algorithm = 'ES256K';
        this.value.output = SigningOutput.XDVRef;
      } else if (presets === 'eip712') {
        this.displayWallets = this.cloneWallets.filter((i) => i.address);
        this.value.algorithm = 'ES256K';
        this.value.isBinaryEnabled = false;
        this.value.output = SigningOutput.EthereumSignature;
      } else {
        this.displayWallets = [...this.cloneWallets];
      }
    } else {
      this.operationType = 'Verifying...';

      if (presets === 'cms') {
        this.displayWallets = this.cloneWallets.filter((i) => !i.address);
        this.value.algorithm = 'RSA';
        this.value.isBinaryEnabled = true;
      } else if (presets === 'xmldsig') {
        this.accept = '*/*';
        this.displayWallets = this.cloneWallets.filter((i) => !i.address);
        this.value.algorithm = 'RSA';
        this.value.isBinaryEnabled = true;
      } else if (presets === 'vc') {
        this.displayWallets = this.cloneWallets.filter((i) => i.address);
        this.value.algorithm = 'ES256K';
        this.value.isBinaryEnabled = false;
      } else if (presets === 'xdv') {
        this.displayWallets = this.cloneWallets.filter((i) => i.address);
        this.value.algorithm = 'ES256K';
        this.value.isBinaryEnabled = false;
      } else if (presets === 'eip712') {
        this.displayWallets = this.cloneWallets.filter((i) => i.address);
        this.value.algorithm = 'ES256K';
        this.value.isBinaryEnabled = false;
      } else {
        this.displayWallets = [...this.cloneWallets];
      }
    }
    await this.execute();
  }

  @Watch('value.operation')
  async onOperationChange(value, oldVal) {
    if (value === 'verify') {
      this.operationType = 'Verifying...';
    } else {
      this.operationType = 'Signing...';
    }
  }

  @Watch('value.wallet')
  async onWalletChange(value, oldVal) {
    if (
      value.id &&
      this.value.files &&
      this.value.files.length > 0 &&
      !this.loading
    ) {
      await this.execute();
    }
  }

  @Watch('value.files')
  async onFilesChange(value, oldVal) {
    if (value && value.length > 0 && this.value.wallet.id && !this.loading) {
      await this.execute();
    }
  }

  async beforeUpdate() {
  
  
    const has = await Session.hasUnlock();
    if (!has) {
      await this.wallet.open(this.value.wallet.id);
    }
  }
  async mounted() {
    const w = await Session.getWalletRefs();
    this.cloneWallets = [...w];
    this.displayWallets = [...w];
  }
  change() {
    this.$emit('input', this.value);
  }
  onClose() {
    this.cloneWallets = [];
    this.displayWallets = [];
    this.$emit('close');
  }

  setWalletId() {
    this.wallet.id = this.value.wallet.keystore;
  }

  addVerificationReport({ SimpleReport }) {
    this.verificationReport = [];
    this.verificationReport = SimpleReport.Signature.Errors.map((e) => {
      return {
        isError: true,
        subtitle: `Signature Id ${SimpleReport.Signature['@Id']}`,
        headline: `Signed by ${SimpleReport.Signature.CertificateChain.Certificate.qualifiedName} - Signed by ${SimpleReport.Signature.CertificateChain.Certificate.id}`,
        title: e,
      };
    });
  }

  async openXDVCompactSignature(blob: Blob) {
    if (blob.name.indexOf('.xdv') > -1) {
      const ab = await blob.text();
      return JSON.parse(ab) as XDVFileFormat;
    }
    return null;
  }

  async downloadXDVCompactSignature() {
    await ShareUtils.downloadFileFromObject(
      {
        ...this.shareFormat,
      },
      this.value.files.name + '.xdv'
    );
  }

  async uploadAndShareLink() {
    // later
  }

  async execute() {
    const apiurl = `${(Vue as any).appconfig.API_URL}xdv_verify`;

    const has = await Session.hasUnlock();
    if (!has && this.value.algorithm.length === 0) return;
    // get algo
    const kp = await this.wallet.getPrivateKey(this.value.algorithm);
    const keyExports = await this.wallet.getPrivateKeyExports(
      this.value.algorithm
    );
    let result;
    if (this.value.files && this.value.files.length === 0) return;
    if (this.value.operation === 'sign') {
      if (this.value.wallet.name === undefined) return;
      // get content to sign
      if (this.value.isBinaryEnabled) {
        // sign file blobs
        if (this.value.presets === 'cms' && this.value.files) {
          this.loading = true;
          // sign with CMS, return detached
          const rsaKeys = await this.wallet.getImportKey(
            `import:X509:${this.wallet.id}`
          );
          try {
            let data = await this.value.files.arrayBuffer();
            result = CMSSigner.sign(
              rsaKeys.key.selfSignedCert,
              rsaKeys.key.pemAsPrivate,
              Buffer.from(data)
            );

            // store ref
            this.shareFormat = {
              content: base64.encode(Buffer.from(data)),
              pubCert: rsaKeys.key.selfSignedCert,
              signature: result,
            };
          } catch (e) {
            console.log(e);
          }
        } else if (this.value.presets === 'xmldsig') {
          // sign with xmldsig, return embedded
          const rsaKeys = await this.wallet.getImportKey(
            `import:X509:${this.wallet.id}`
          );
          try {
            let data = await this.value.files.text();
            const signedDocuments = await XmlDsig.signFEDocument(
              rsaKeys.key.pemAsPrivate,
              rsaKeys.key.selfSignedCert,
              data
            );
            result = signedDocuments.xml;

            // store ref
            this.shareFormat = {
              content: base64.encode(Buffer.from(data)),
              pubCert: rsaKeys.key.selfSignedCert,
              signature: result,
            };
          } catch (e) {
            console.log(e);
          }
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
        this.loading = false;
      }, 1000);
      if (this.value.output === SigningOutput.PKCS7PEM) {
        this.signatureView = result;
      } else if (this.value.output === SigningOutput.Base64) {
        // convert output to base64
        this.signatureView = base64.encode(Buffer.from(result));
      } else if (this.value.output === SigningOutput.QR) {
        // convert output to qr
      } else if (this.value.output === SigningOutput.XDVRef) {
        // take output and upload to Swarm using DriveSwarmManager
      } else {
        this.signatureView = result;
      }
    } else {
      const formUrlEncode = (payload) =>
        Object.keys(payload)
          .map((key) => {
            return (
              encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])
            );
          })
          .join('&');

      // verify content
      switch (this.value.presets) {
        case 'cms':
          this.loading = true;
          let sharedSignedDocument = await this.openXDVCompactSignature(
            this.value.files
          );

          try {
            const payload = {
              signature: sharedSignedDocument.signature,
              from: this.value.wallet.address,
              contents: sharedSignedDocument.content,
              token: '12345',
              filename: this.value.files.name.replace('.xdv', '.p7'),
              certificate: btoa(sharedSignedDocument.pubCert),
            };
            const res = await fetch(apiurl, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: formUrlEncode(payload),
            });

            const text = await res.text();
            this.validated = create(text).end({
              format: 'object',
            });
            this.addVerificationReport(this.validated);
            this.contentValidated = sharedSignedDocument;
          } catch (e) {
            console.log(e);
          }
          break;
        case 'xmldsig':
          this.loading = true;

          try {
            sharedSignedDocument = await this.openXDVCompactSignature(
              this.value.files
            );

            const payload = {
              signature: sharedSignedDocument.signature,
              from: this.value.wallet.address,
              token: '12345',
              certificate: btoa(sharedSignedDocument.pubCert),
              filename: 'fe.xml',
            };
            const res = await fetch(apiurl, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: formUrlEncode(payload),
            });
            const text = await res.text();
            this.validated = create(text).end({
              format: 'object',
            });
            this.addVerificationReport(this.validated);
            this.contentValidated = sharedSignedDocument;
          } catch (e) {
            alert(e.message);
          }
          break;
        default:
          return;
      }
      this.loading = false;
    }
  }
}
</script>
