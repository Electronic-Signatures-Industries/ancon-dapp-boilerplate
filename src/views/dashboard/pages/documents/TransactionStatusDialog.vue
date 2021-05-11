<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Transacción</span>
      </v-card-title>

      <v-card-text>
        {{ transactionStatus }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="setVisible(false)"
        >
          Cancel
        </v-btn>

        <v-btn
          data-cy="confirm"
          color="blue darken-1"
          text
          @click="onConfirm()"
        >
          OK
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

  @Emit('update:show')
  setVisible(newStatus: boolean) {
    return newStatus;
  }

  @Emit('confirm')
  onConfirm() {}
} 
</script>