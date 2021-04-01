<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Token</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Name"
                value=""
                v-model="value.name"
                class="input-group--focused"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Symbol"
                value=""
                v-model="value.symbol"
                class="input-group--focused"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Decimals"
                value=""
                v-model="value.decimals"
                class="input-group--focused"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Address"
                value=""
                v-model="value.address"
                class="input-group--focused"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="Network"
                value=""
                v-model="value.network"
                class="input-group--focused"
              ></v-text-field>
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
</template>
<script lang="ts">
import { TypedRFE, TasaISC, ISC } from 'xdvplatform-wallet/src';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Session } from '../shared/Session';

@Component({
  name: 'xdv-add-token',
  props: ['show', 'value'],
})
export default class AddToken extends Vue {
  value;
  loading = false;
  show;
  alertMessage: string = '';
  alertType: string = '';

  async change() {
    this.$emit('input', this.value);
  }
}
</script>