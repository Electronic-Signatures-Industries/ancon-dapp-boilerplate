<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="indigo"
    ></v-progress-linear>
    <v-alert :type="alertType" v-if="alertMessage">{{ alertMessage }}</v-alert>
    <div v-if="!!documentBlock">
      <v-card
        class="mx-auto"
        v-for="(item, index) in documentBlock.metadata"
        v-bind:key="item._id"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-if="item.contentType === 'application/pdf'"
              >mdi-pdf-box</v-icon
            >
            <v-icon v-else>mdi-file</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{
              item.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.contentType }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <h3>Document detail</h3>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Hash</b> {{ item.hash.replace('0x', '') }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Signature</b> {{ getSignature(item) }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Has Qualified Signature</b>
                {{ !!item.documentSignature ? 'yes' : 'no' }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Size</b> {{ item.size / 1000 }} kb
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Last Modified</b> {{ new Date(item.lastModified) }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Created</b> {{ new Date(1000 * item.created) }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon @click="downloadFile(item, index)">mdi-download</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon @click="shareTo(item, index)">mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="mx-auto">
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <h3>Event log</h3>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Document Block</b> {{ documentBlock.block }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Root hash</b>
                <a target="_blank" :href="getUrl(documentBlock.rootHash)">{{
                  documentBlock.rootHash
                }}</a>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Parent hash</b>
                <a target="_blank" :href="getUrl(documentBlock.parentHash)">{{
                  documentBlock.parentHash
                }}</a>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Content transaction reference</b> {{ documentBlock.txs }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="text--primary">
                <b>Timestamp</b> {{ new Date(1000 * documentBlock.timestamp) }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <xdv-unlock
        v-model="password"
        :wallet="wallet"
        @load="onUnlock"
      ></xdv-unlock>
    </div>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CacheService } from '../shared/CacheService';
import {
  XVDSwarmNodeBlock,
  DriveSwarmManager,
} from '../shared/DriveSwarmManager';
import { ethers } from 'ethers';
import { Wallet } from 'xdvplatform-wallet/src';
import { Session } from '../shared/Session';
import Unlock from './Unlock.vue';
import { ShareUtils } from '../shared/ShareUtils';

@Component({
  components: {
    'xdv-unlock': Unlock,
  },
})
export default class DocumentDetails extends Vue {
  cacheService: CacheService = new CacheService();
  documentBlock: XVDSwarmNodeBlock &
    PouchDB.Core.IdMeta &
    PouchDB.Core.GetMeta = null;
  loading = false;
  alertMessage = '';
  wallet: Wallet = new Wallet();
  itemIndex: any;
  itemHash: any;

  async shareTo(item, index) {
    const { currentKeystore } = await Session.getSessionInfo();

    if (!this.wallet.mnemonic) {
      await this.wallet.open(currentKeystore.keystore);
      this.itemHash = item.hash;
      return;
    }
    const driveManager = new DriveSwarmManager(this.wallet);
    await driveManager.shareEphemeralLink(
      this.$router.currentRoute.params.user,
      this.documentBlock.txs,
      null,
      item.hash,
      true
    );
  }

  async onUnlock() {
    try {
      const driveManager = new DriveSwarmManager(this.wallet);
      await driveManager.shareEphemeralLink(
        this.$router.currentRoute.params.user,
        this.documentBlock.txs,
        null,
        this.itemHash,
        true
      );
    } catch (e) {
      console.log(e);
    }
  }

  async downloadFile(item, index) {
    const res = await ShareUtils.openEphemeralLink(
      this.$router.currentRoute.params.user,
      this.documentBlock.txs,
      null,
      item.hash
    );

    await res.downloadFile();
  }

  async mounted() {
    if (
      this.$router.currentRoute.params.id &&
      this.$router.currentRoute.params.user
    ) {
      const user = this.$router.currentRoute.params.user;
      const swarmFeed = await this.wallet.getSwarmNodeQueryable(user);

      const blockRef = this.$router.currentRoute.params.id;
      const blocks: XVDSwarmNodeBlock[] =  await DriveSwarmManager.cacheService.getBlocks();
      let current = await swarmFeed.bzz.downloadData(blockRef);
      const block = blocks.find(i => i.txs === current.txs);
      this.documentBlock = block;
    }
  }

  getUrl(ref) {
    return `#/user/${this.$router.currentRoute.params.user}/details/${ref}`;
  }
  getSignature(item) {
    const sig = ethers.utils
      .joinSignature({
        // @ts-ignore
        r: '0x' + item.signature.r,
        // @ts-ignore
        s: '0x' + item.signature.s,
        // @ts-ignore
        recoveryParam: item.signature.recoveryParam,
      })
      .replace('0x', '');

    return `${sig.substring(0, 50)}...${sig.substring(
      sig.length - 50,
      sig.length
    )}`;
  }
}
</script>
