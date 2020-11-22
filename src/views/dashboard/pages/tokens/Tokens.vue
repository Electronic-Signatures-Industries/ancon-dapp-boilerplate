<template>
  <v-container>
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Send</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="to" label="To" required></v-text-field>
          <v-text-field v-model="amount" label="Amount" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="transfer()">Transfer</v-btn>
        </v-card-actions>
      </v-card>
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
      <v-toolbar color="blue accent-4" dark dense>
        <v-toolbar-title>Wallet {{ address }}</v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-slot:extension>
          <v-btn
            color="red"
            dark
            small
            absolute
            bottom
            right
            fab
            style="z-index:5"
          >
            <v-speed-dial transition="slide-y" v-model="fab" direction="left"
              ><template v-slot:activator>
                <v-icon>mdi-plus</v-icon>
              </template>
              <v-tooltip top>
                <span>Add token</span>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    v-on="on"
                    @click="displayAddDialog = true"
                    small
                    color="red accent-4"
                  >
                    <v-icon>mdi-link</v-icon>
                  </v-btn>
                </template></v-tooltip
              >
            </v-speed-dial>
          </v-btn>
        </template>
      </v-toolbar>

      <xdv-unlock
        v-model="password"
        :wallet="wallet"
        @load="onUnlock"
      ></xdv-unlock>

      <xdv-add-token
        v-model="addTokenModel"
        :show="displayAddDialog"
        @input="onAddToken"
      ></xdv-add-token>

      <v-list two-line flat style="z-index: -5;">
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
                  <v-col>
                    <v-icon @click="send(item)" color="blue accent-5">
                      mdi-send
                    </v-icon></v-col
                  ><v-col v-if="item.hasRSAKeys">
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
import { Wallet, X509, LDCryptoTypes, DIDDocument } from 'xdvplatform-wallet';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { KeystoreIndex, DIDSigner, X509Signer } from './KeystoreIndex';
import moment from 'moment';
import { Session, Token } from './Session';
import copy from 'copy-to-clipboard';
import { Subject, forkJoin } from 'rxjs';
import Unlock from './Unlock.vue';

import Web3 from 'web3';
import { ContractInterface } from './TokenABI';
const { thorify } = require('thorify');

import { ContractFactory } from './ContractFactory';
import AddToken from './AddToken.vue';
import { TokenContract } from './TokenContract';
import { BigNumber } from 'ethers/utils';

@Component({
  components: {
    'xdv-unlock': Unlock,
    'xdv-add-token': AddToken,
  },
})
export default class TokensComponent extends Vue {
  loginDialog: boolean = false;
  alertMessage = '';
  alertType = '';
  lastDefault: any;
  displayAddDialog = false;
  tokens: any;
  address: string;
  show(e) {
    this.open = false;
    setTimeout(() => {
      this.open = true;
    }, 100);
  }
  currentToken: TokenContract = null;
  loading = false;
  validations: any = { password: false };
  valid = false;
  dialog = false;
  open = false;
  selected = null;
  addTokenModel = {};
  to = '';
  amount = '';
  hasErrors = false;
  fab = false;
  items = [
    {
      title: 'No tokens found, please add one',
    },
  ];
  subscriptions = {};
  password = '';
  wallet: Wallet = new Wallet();
  keystoreIndexItem = new KeystoreIndex();

  async onAddToken() {
    const token = Object.assign(new Token(), this.addTokenModel);
    token.chain = 'vechain';
    await Session.setTokens(token);
    await this.loadTokens();
    this.displayAddDialog = false;
  }

  async mounted() {
    const session = await Session.getSessionInfo();

    this.address = session.currentKeystore.address;
    await this.wallet.open(session.currentKeystore.keystore);
  }

  async onUnlock() {
    await this.loadTokens();
  }

  send(item) {
    this.currentToken = item;
    this.dialog = true;
  }

  async transfer() {
    this.loading = true;
    const s = this.currentToken.token.subscribe().subscribe((update) => {
      this.currentToken.bal = update / 1e18;
     
      s.unsubscribe()
    });
    const log = await this.currentToken.token.send(this.to, 1 * this.amount * 1e18);
    this.loading = false;
    this.dialog = false;
  }

  async loadTokens() {
    this.loading = true;
    this.tokens = await ContractFactory.loadContracts(this.wallet, '0x27');
    this.loading = false;

    if (this.tokens) {
      this.items = [];
      this.tokens.map(async (token) => {
        const symbol = await token.contract.methods.symbol();

        const name = await token.contract.methods.name();
        const bal = await token.balance(token.defaultAccount);
        const item = {
          headline: name,
          title: symbol,
          bal: bal / 1e18,
          token,
          ...token,
        };
        this.items.push(item);
      });
    }
  }
}
</script>