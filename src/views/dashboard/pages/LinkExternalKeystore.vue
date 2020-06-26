<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Link external keystore</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
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
          <v-row>
            <v-col cols="6" md="6">
              <v-select
                persistent-hint
                hint="Default DID signer"
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

            <v-col cols="6" md="6">
              <v-select
                persistent-hint
                hint="Default X509 signer"
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
        <v-row>
          <v-col>
            <v-btn color="blue darken-1" text @click="link">Link</v-btn>
          </v-col>
        </v-row>
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
import { TypedRFE, TasaISC, ISC } from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import Eth from '@ledgerhq/hw-app-eth';
import {
  KeystoreIndex,
  Capability,
  DIDSigner,
  X509Signer,
} from './KeystoreIndex';
import { Session } from './Session';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  name: 'xdv-link-external-keystore',
  props: ['show', 'value', 'keystore'],
})
export default class LinkExternalKeystore extends Vue {
  value: {
    type: 'walletconnect' | 'xdv' | 'pkcs11' | 'ledger';
    defaultDIDSigner: DIDSigner;
    defaultX509Signer: X509Signer;
  };
  show;
  keystore: KeystoreIndex;

  defaultDIDSignerOptions = [
    {
      key: 'Ledger',
      value: DIDSigner.Ledger,
    },
    {
      key: 'WalletConnect',
      value: DIDSigner.Walletconnect,
    },
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
    {
      key: 'PKCS#12',
      value: X509Signer.PKCS12,
    },
    {
      key: 'XDV Self Signed',
      value: X509Signer.XDV,
    },
  ];
  alertMessage: string = '';
  alertType: string = '';

  async linkLedger() {

    const transport = await TransportWebUSB.open();
    const eth = new Eth(transport);

    const addr = await eth.getAddress("44'/60'/0'/0/0");

  }

  async linkWalletconnect() {
    // Check if connection is already established
    if (!Session.walletConnect.connected) {
      // create new session
      Session.walletConnect.createSession();
    } else {
      const chain = Session.walletConnect.chainId;
      const address = Session.walletConnect.accounts[0];
      const keystore = {
        ...this.keystore,
        linkedExternalKeystores: {
          ...this.keystore.linkedExternalKeystores,
          walletconnect: {
            address,
            chain,
            capability: Capability.Sign,
            connected: true,
          },
        },
      };
      await Session.setWalletRefs(keystore, true);
      this.alertType = 'info';
      this.alertMessage = 'Already connected';
    }
  }

  async link() {
    if (this.value.type === 'walletconnect') {
      await this.linkWalletconnect();
    }

    if (this.value.type === 'ledger') {
      await this.linkLedger();
    }
  }
  async mounted() {
    // Create a connector
    Session.walletConnect = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    });

    const onUpdateKeystore = async (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      const keystore = {
        ...this.keystore,
        linkedExternalKeystores: {
          ...this.keystore.linkedExternalKeystores,
          walletconnect: {
            address: accounts[0],
            chain: chainId,
            capability: Capability.Sign,
            connected: true,
          },
        },
      };
      await Session.setWalletRefs(keystore, true);
    };
    // Subscribe to connection events
    Session.walletConnect.on('connect', onUpdateKeystore);

    Session.walletConnect.on('session_update', onUpdateKeystore);

    Session.walletConnect.on('disconnect', async (error, payload) => {
      if (error) {
        throw error;
      }
      const keystore = {
        ...this.keystore,
        linkedExternalKeystores: {
          ...this.keystore.linkedExternalKeystores,
          walletconnect: {
            connected: false,
            ...this.keystore.linkedExternalKeystores.walletconnect,
          },
        },
      };
      await Session.setWalletRefs(keystore, true);
      // Delete connector
    });
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
    this.$emit('input', this.value);
  }
}
</script>
