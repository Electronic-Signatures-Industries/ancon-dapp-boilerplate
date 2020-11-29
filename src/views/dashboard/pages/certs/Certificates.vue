<template>
  <v-container>
    <v-dialog v-model="displayPurchaseCert" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Find subdomain to create ID</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                @keyup="verifyDomain()"
                v-model="purchaseDomainModel.name"
                label="Name"
                required
                class="input-group--focused"
                  :error="!!purchaseDomainModel.exists" :hint="purchaseDomainModel.label"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="purchaseDomainModel.domain"
                label="Domain"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="nextPage()">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="displayPurchaseCert" width="600px">
      <!-- // GENERATE ACCESS TOKEN ON THE BACKEND
import snsWebSdk from '@sumsub/websdk'

let accessToken = "{accessToken}"
let applicantEmail = "test@example.org"
let applicantPhone = "+491758764512"

let snsWebSdkInstance = snsWebSdk.Builder("https://test-api.sumsub.com", "basic-kyc")
    .withAccessToken(accessToken, () => {
        // EXPIRATION HANDLER
        /* generate a new token and launch WebSDK again */
    })
    .withConf({
        lang: "es",
        email: applicantEmail,
        phone: applicantPhone, // if available
        onMessage: (type, payload) => {
            console.log('WebSDK onMessage', type, payload)
        },
        onError: (error) => {
            console.log('WebSDK onError', error)
        },
    }).build()

snsWebSdkInstance.launch('#sumsub-websdk-container') -->
    </v-dialog>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo accent-4"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertType.length > 0">{{
      alertMessage
    }}</v-alert>

    <v-card class="mx-auto" tile>
      <v-toolbar color="black accent-4" dark>
        <v-toolbar-title>Certificates</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="selected"
          :items="searchResults"
          :loading="loading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="name"
          label="Search certificates"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title> No certificates found </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-ethereum</v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
            >
              {{ item.address }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-text="item.address"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon @click="copyAddress(item.address)">mdi-clipboard</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>

        <template v-slot:extension>
          <v-btn
            color="red"
            dark
            small
            absolute
            bottom
            right
            fab
            style="z-index: 5"
          >
            <v-speed-dial transition="slide-y" v-model="fab" direction="left"
              ><template v-slot:activator>
                <v-icon>mdi-plus</v-icon>
              </template>
              <v-tooltip top>
                <span>Purchase certificate</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="displayPurchaseCert = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-certificate</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
            </v-speed-dial>
          </v-btn>
        </template>
      </v-toolbar>

      <v-list two-line flat style="z-index: -5">
        <v-list-item-group v-model="selected" class="blue--text">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.symbol" @click="currentToken = item">
              <v-list-item-avatar>
                <v-img :src="item.icon"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class="text-h5"
                  v-text="item.bal"
                ></v-list-item-title> </v-list-item-content
              ><v-list-item-action>
                <v-row>
                  <v-col v-if="item.hasRSAKeys">
                    <v-icon color="blue accent-5">
                      mdi-file-lock
                    </v-icon></v-col
                  ><v-col v-if="item.hasLedger">
                    <v-icon color="green accent-5">
                      mdi-link-lock
                    </v-icon></v-col
                  ><v-col v-if="item.hasWalletConnect">
                    <v-icon color="pink accent-5">
                      mdi-cellphone-lock
                    </v-icon></v-col
                  >
                </v-row>
              </v-list-item-action>
            </v-list-item>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Wallet, X509, LDCryptoTypes, DIDDocument } from "xdvplatform-wallet";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeystoreIndex, DIDSigner, X509Signer } from "../shared/KeystoreIndex";
import moment from "moment";
import { Session } from "../shared/Session";
import copy from "copy-to-clipboard";
import { Subject, forkJoin } from "rxjs";
import { BigNumber } from "ethers/utils";
import { CertificateService } from './CertificateService';

@Component({
  components: {},
})
export default class CertificatesComponent extends Vue {
  loginDialog: boolean = false;
  alertMessage = "";
  alertType = "";
  lastDefault: any;
  displayPurchaseCert = false;
  tokens: any;
  address: string;
  network: any;
  show(e) {
    this.open = false;
    setTimeout(() => {
      this.open = true;
    }, 100);
  }

  loading = false;
  validations: any = { password: false };
  valid = false;
  dialog = false;
  open = false;
  search = '';
  selected = null;
  purchaseDomainModel = {
    name: '',
    domain: 'xdv.digital',
    exists: null,
    label: '',
  };
  to = "";
  amount = "";
  hasErrors = false;
  fab = false;
  searchResults = [];
  items = [
    {
      title: "No certificates found, please add one",
    },
  ];
  subscriptions = {};
  password = "";
  wallet: Wallet = new Wallet();
  keystoreIndexItem = new KeystoreIndex();
  certService = new CertificateService();
  /**
   *  on purchase certificate
   */
  async onPurchaseCertificate() {
    //    await this.loadTokens();
    this.displayPurchaseCert = false;
  }

  async verifyDomain() {
    this.purchaseDomainModel.exists = await this.certService.find(
      this.purchaseDomainModel.name,
      this.purchaseDomainModel.domain
    );

    if (this.purchaseDomainModel.exists) {
      this.purchaseDomainModel.label = "Id already exists"
    } else {
      this.purchaseDomainModel.label = "Available";
    }
  }
  async mounted() {
    const session = await Session.getSessionInfo();
    if (session.currentKeystore === null) return;
    this.address = session.currentKeystore.address;
    await this.wallet.open(session.currentKeystore.keystore);
  }
}
</script>