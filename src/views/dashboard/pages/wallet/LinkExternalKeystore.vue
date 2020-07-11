<template>
  <v-content>
    <v-dialog v-model="showSCLogin" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Enter smartcard PIN</span>
        </v-card-title>

        <v-card-text>
          <v-form autocomplete="off">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  required
                  v-model="pin"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  class="input-group--focused"
                  @click:append="showPassword = !showPassword"
                  :error="!!validations.password"
                  :hint="validations.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showSCLogin = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="loginSmartCard">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Link external hardware / software module</span>
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
                  @input="setHardwareModule"
                  label="Select hardware module slot"
                  single-line
                ></v-select>
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
import { TypedRFE, TasaISC, ISC } from 'xdvplatform-wallet/src';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { SmartCardConnectorPKCS11 } from '../shared/SmartCardConnector';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import Eth from '@ledgerhq/hw-app-eth';
import {
  KeystoreIndex,
  Capability,
  DIDSigner,
  X509Signer,
} from '../shared/KeystoreIndex';
import { Session } from '../shared/Session';
import { async } from 'rxjs/internal/scheduler/async';
import {
  PKCS11ToolBindingsConfig,
  PKCS11ToolBindings,
} from '../shared/PKCS11ToolBindings';

@Component({
  name: 'xdv-link-external-keystore',
  props: ['show', 'value', 'keystore'],
})
export default class LinkExternalKeystore extends Vue {
  value: {
    type: 'walletconnect' | 'xdv' | 'pkcs11' | 'ledger';
    defaultDIDSigner: DIDSigner;
    defaultX509Signer: X509Signer;
    hw: '';
  };
  show;
  keystore: KeystoreIndex;

  defaultDIDSignerOptions = [
    {
      key: 'Ledger',
      value: DIDSigner.Ledger,
    },
    // {
    //   key: 'WalletConnect',
    //   value: DIDSigner.Walletconnect,
    // },
    {
      key: 'XDV',
      value: DIDSigner.XDV,
    },
  ];
  defaultX509SignerOptions = [
    {
      key: 'PKCS#11',
      value: X509Signer.PKCS11,
    },
    // {
    //   key: 'PKCS#12',
    //   value: X509Signer.PKCS12,
    // },
    {
      key: 'XDV Self Signed',
      value: X509Signer.XDV,
    },
  ];
  loading = false;
  alertMessage: string = '';
  alertType: string = '';
  pin = '';
  showPassword = '';
  isLoginSmartCardReady: boolean;
  validations = { password: undefined };
  showSCLogin = false;
  slots = [];

  async setHardwareModule() {}

  async loginSmartCard() {
    try {
      // // login
      // const config = this.pkcs11Config;
      // config.isSimulator = true;
      // await smartCardConnector.login(this.pin);
      this.isLoginSmartCardReady = true;
      // this.validations.password = 'Invalid PIN';
      // await this.linkSmartCard();
      this.showSCLogin = false;
    } catch (e) {
      console.log(e);
      this.validations.password = false;
      this.isLoginSmartCardReady = false;
    }
  }

  async linkLedger() {
    const transport = await TransportWebUSB.open();
    const eth = new Eth(transport);

    const addr = await eth.getAddress("44'/60'/0'/0/0");
  }

  async linkSmartCard() {
    const smartCardConnector = new SmartCardConnectorPKCS11();
    // login
    this.slots = await smartCardConnector.getSlots();
    await this.onSelectHWModule(this.slots[0], null);
  }

  @Watch('value.hw')
  async onSelectHWModule(current, old) {
    let keystore;
    if (this.value.defaultX509Signer === X509Signer.PKCS11) {
      keystore = {
        ...this.keystore,
        linkedExternalKeystores: {
          ...this.keystore.linkedExternalKeystores,
          pkcs11: {
            tokenIndex: this.slots.findIndex(i => i.key === current.slotDescription),
            capability: Capability.Sign,
          },
        },
      };
    }
    this.keystore = keystore;
    await Session.setWalletRefs(keystore, true);
  }

  async mounted() {}

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
    this.$emit('input', this.value);
  }

  @Watch('value.defaultX509Signer')
  async onX509SignerChange(current: X509Signer) {
    if (current === X509Signer.PKCS11) {
      await this.linkSmartCard();
    } else {
      const keystore = {
        ...this.keystore,
        defaultDIDSigner: this.value.defaultDIDSigner,
        defaultX509Signer: this.value.defaultX509Signer,
      };

      await Session.setWalletRefs(keystore, true);
    }
  }

  @Watch('value.defaultDIDSigner')
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
