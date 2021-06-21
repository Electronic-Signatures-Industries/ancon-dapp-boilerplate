<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Transaction</span>
      </v-card-title>

      <v-card-text>
        {{ transactionStatus }}
      </v-card-text>
      <v-card show="showTransactionCancelBtn">
        Trx hash
          <a target="_blank" :href="'https://testnet.bscscan.com/tx/' + transationAddress">{{ transationAddress }}</a><br/>
        IPLD Url
          <a target="_blank" :href="'https://explore.ipld.io/#/explore/' + ipfsId + '/link'">{{ ipfsId }}</a>
      </v-card>

      <v-card-actions >
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="setVisible(false)"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class TransactionStatusDialog extends Vue {
  @Prop()
  readonly show: boolean;

  @Prop()
  readonly transactionStatus?: string;

  @Prop()
  readonly showTransactionCancelBtn?: boolean;

  @Prop()
  readonly transationAddress?: string;

  @Prop() 
  readonly ipfsId? : string;


  @Emit('update:show')
  setVisible(newStatus: boolean) {
    return newStatus;
  }

  @Emit('confirm')
  onConfirm() {}
} 
</script>