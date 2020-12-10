<template>
  <v-content>
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Signing Modules</span>
        </v-card-title>

        <v-card-text>
          <v-form autocomplete="off">
            <!-- <v-row>
              <v-col cols="12" md="12">
                <v-radio-group
                  v-model="value.type"
                  class="font-weight-medium"
                  label="Type"
                  column
                >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-radio
                        v-on="on"
                        class="font-weight-medium"
                        label="WalletConnect"
                        color="red"
                        value="walletconnect"
                      ></v-radio>
                    </template>
                    <span>WalletConnect</span>
                  </v-tooltip> 
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-radio
                        v-on="on"
                        class="font-weight-medium"
                        label="Ledger"
                        color="red"
                        value="ledger"
                      ></v-radio>
                    </template>
                    <span>Ledger</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-radio
                        v-on="on"
                        class="font-weight-medium"
                        label="PKCS#11 Smart Card"
                        color="red"
                        value="pkcs11"
                      ></v-radio>
                    </template>
                    <span>PKCS#11 Smart card</span>
                  </v-tooltip>
                </v-radio-group>
              </v-col>
            </v-row>
             -->
            <v-row>
              <v-col cols="12" md="12">
                <v-select
                  persistent-hint
                  hint="DID signer"
                  required
                  :items="defaultDIDSignerOptions"
                  v-model="value.defaultDIDSigner"
                  item-text="key"
                  class="font-weight-medium"
                  item-value="value"
                  @input="setDefaultSignerProtocol"
                  label="Select default DID signer"
                  single-line
                ></v-select>
              </v-col>

              <v-col cols="12" md="12">
                <v-select
                  persistent-hint
                  hint="X509 signer"
                  required
                  :items="defaultX509SignerOptions"
                  v-model="value.defaultX509Signer"
                  item-text="key"
                  class="font-weight-medium"
                  item-value="value"
                  @input="setDefaultSignerProtocol"
                  label="Select default X509 signer"
                  single-line
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  persistent-hint
                  hint="Slots"
                  required
                  :items="slots"
                  v-model="value.hw"
                  item-text="key"
                  class="font-weight-medium"
                  item-value="value"
                  v-if="!p12.canSelect"
                  @input="setHardwareModule"
                  label="Select hardware module slot"
                  single-line
                ></v-select>
              </v-col>
              <v-row>
                <v-col cols="12" md="12">
                  <v-file-input
                    prepend-icon="mdi-paperclip"
                    v-model="p12.file"
                    show-size
                    class="font-weight-medium"
                    v-if="p12.canSelect"
                    label="P12"
                    @input="storeP12"
                    dense
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="6">
                  <v-text-field
                    required
                    v-model="pin"
                    @blur="setPIN"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                    :error="!!validations.password"
                    :hint="validations.password"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                  <v-alert text color="green" v-if="message">{{
                    message
                  }}</v-alert>
                </v-col>
              </v-row>
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
                <v-alert text :color="alertType" v-if="alertMessage">
                  {{ alertMessage }}
                </v-alert>
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
  </v-content>
</template>
<script lang="ts">
import { TypedRFE, TasaISC, ISC } from "xdvplatform-wallet/src";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { SmartCardConnectorPKCS11 } from "../shared/SmartCardConnector";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Eth from "@ledgerhq/hw-app-eth";
import {
  KeystoreIndex,
  Capability,
  DIDSigner,
  X509Signer,
} from "../shared/KeystoreIndex";
import { Session } from "../shared/Session";
import { async } from "rxjs/internal/scheduler/async";
import { map, filter } from "rxjs/operators";
import { Wallet } from "xdvplatform-wallet";
import forge from "node-forge";

@Component({
  name: "xdv-link-external-keystore",
  props: ["show", "value", "keystore", "wallet"],
})
export default class LinkExternalKeystore extends Vue {
  wallet: Wallet;
  value: {
    type: "walletconnect" | "xdv" | "pkcs11" | "ledger";
    defaultDIDSigner: DIDSigner;
    defaultX509Signer: X509Signer;
    hw: "";
  };
  show;
  keystore: KeystoreIndex;

  defaultDIDSignerOptions = [
    {
      key: "Ledger",
      value: DIDSigner.Ledger,
    },
    {
      key: "WalletConnect",
      value: DIDSigner.Walletconnect,
    },
    {
      key: "XDV",
      value: DIDSigner.XDV,
    },
  ];
  defaultX509SignerOptions = [
    {
      key: "PKCS#12",
      value: X509Signer.PKCS12,
    },
    {
      key: "PKCS#11",
      value: X509Signer.PKCS11,
    },
    // {
    //   key: 'XDV Self Signed',
    //   value: X509Signer.XDV,
    // },
  ];
  loading = false;
  alertMessage: string = "";
  alertType: string = "";
  pin = "";
  showPassword = "";
  validations = { password: undefined };
  slots = [];
  p12 = {
    file: undefined,
    canSelect: false,
  };
  message = "";
  smartCardConnector = new SmartCardConnectorPKCS11();

  async setHardwareModule() {}

  async setPIN() {
    if (this.value.defaultX509Signer === X509Signer.PKCS12) {
      await this.storeP12();
    }
  }

  async linkLedger() {
    const transport = await TransportWebUSB.open();
    const eth = new Eth(transport);
    const addr = await eth.getAddress("44'/60'/0'/0/0");
  }

  async linkSmartCard() {
    // login
    this.slots = (await this.smartCardConnector.getSlots()) as any;
    await this.onSelectHWModule(this.slots[0], null);
  }

  @Watch("value.hw")
  async onSelectHWModule(current, old) {
    let keystore;
    if (this.value.defaultX509Signer === X509Signer.PKCS11) {
      keystore = {
        ...this.keystore,
        linkedExternalKeystores: {
          ...this.keystore.linkedExternalKeystores,
          pkcs11: {
            tokenIndex: this.slots.findIndex(
              (i) => i.key === current.slotDescription
            ),
            capability: Capability.Sign,
          },
        },
      };
    }
    this.keystore = keystore;
    await Session.setWalletRefs(keystore, true);
  }

  getKeyFromP12(p12: any, password: string) {
    const keyData = p12.getBags(
      { bagType: forge.pki.oids.pkcs8ShroudedKeyBag },
      password
    );
    let pkcs8Key = keyData[forge.pki.oids.pkcs8ShroudedKeyBag][0];

    if (typeof pkcs8Key === "undefined") {
      pkcs8Key = keyData[forge.pki.oids.keyBag][0];
    }

    if (typeof pkcs8Key === "undefined") {
      throw new Error("Unable to get private key.");
    }

    let pemKey = forge.pki.privateKeyToPem(pkcs8Key.key);
    pemKey = pemKey.replace(/\r\n/g, "");

    return pemKey;
  }

  getCertificateFromP12(p12: any) {
    const certData = p12.getBags({ bagType: forge.pki.oids.certBag });
    const certificate = certData[forge.pki.oids.certBag][0];

    let pemCertificate = forge.pki.certificateToPem(certificate.cert);
    pemCertificate = pemCertificate.replace(/\r\n/g, "");
    const commonName = certificate.cert.subject.attributes[0].value;
    return { pemCertificate, commonName };
  }

  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async storeP12() {
    let keystore;
    let ab = await (this.p12.file as Blob).arrayBuffer();
    let b64 = this.arrayBufferToBase64(ab);
    const temp = forge.asn1.fromDer(forge.util.decode64(b64), false);
    const p12 = forge.pkcs12.pkcs12FromAsn1(temp, this.pin);
    const { pemCertificate, commonName } = this.getCertificateFromP12(p12);
    this.message = commonName;
    const key = this.getKeyFromP12(p12, this.pin);

    //  const pvk = forge.pki.privateKeyFromPem(key); // PEM
    // const certificate = forge.pki.certificateFromPem(pemCertificate); // PEM

    if (this.value.defaultX509Signer === X509Signer.PKCS12) {
      keystore = {
        ...this.keystore,
        linkedExternalKeystores: {
          ...this.keystore.linkedExternalKeystores,
          pkcs12: {
            name: commonName,
            capability: Capability.Any,
          },
        },
      };
    }
debugger
    await this.wallet.setImportKey(`import:P12:${this.wallet.id}`, {
      pvk: key,
      certificate: pemCertificate,
    });
    this.keystore = keystore;
    await Session.setWalletRefs(keystore, true);
  }

  async mounted() {
    this.value.defaultX509Signer = X509Signer.PKCS11;
    await this.smartCardConnector.initialize();
    this.smartCardConnector.subscribe
      .pipe(
        filter((i) => i && i.type === "slots"),
        map((res) => {
          return Object.keys(res.slots).map((k) => {
            return {
              value: JSON.parse(res.slots[k]),
              key: JSON.parse(res.slots[k]).slotDescription,
            };
          });
        })
      )
      .subscribe((i) => (this.slots = i));
  }

  async setDefaultSignerProtocol() {
    const keystore = {
      ...this.keystore,
      defaultDIDSigner: this.value.defaultDIDSigner,
      defaultX509Signer: this.value.defaultX509Signer,
    };

    await Session.setWalletRefs(keystore, true);
  }
  async change() {
    await this.setDefaultSignerProtocol();
    this.$emit("input", this.value);
  }

  @Watch("value.defaultX509Signer")
  async onX509SignerChange(current: X509Signer) {
    if (current === X509Signer.PKCS11) {
      this.p12.canSelect = false;
      await this.linkSmartCard();
    } else if (current === X509Signer.PKCS12) {
      this.p12.canSelect = true;
      this.commonName = "";
    } else {
      const keystore = {
        ...this.keystore,
        defaultDIDSigner: this.value.defaultDIDSigner,
        defaultX509Signer: this.value.defaultX509Signer,
      };

      await Session.setWalletRefs(keystore, true);
    }
  }

  @Watch("value.defaultDIDSigner")
  async onDIDSignerChange(current: DIDSigner) {
    if (current === DIDSigner.Ledger) {
      await this.linkLedger();
    } else {
      const keystore = {
        ...this.keystore,
        defaultDIDSigner: this.value.defaultDIDSigner,
        defaultX509Signer: this.value.defaultX509Signer,
      };

      await Session.setWalletRefs(keystore, true);
    }
  }
}
</script>
