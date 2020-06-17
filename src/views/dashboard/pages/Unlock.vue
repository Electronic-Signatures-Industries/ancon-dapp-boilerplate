<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Passphrase</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                required
                v-model="value"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                class="input-group--focused"
                @click:append="showPassword = !showPassword"
                :error="validations.value"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="change">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { TypedRFE, TasaISC, ISC } from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Session } from './Session';

@Component({
  name: 'xdv-unlock',
  props: ['value', 'show'],
  watch: {
    show: async function( current, old) {
      if (old === false && current) {
        const has = await Session.hasUnlock();
        if (has) {
          this.$emit('input', await Session.getUnlock());
          current = false;
        }
      }
    },
  },
})
export default class Unlock extends Vue {
  value: string = '';
  show: boolean;
  showPassword = false;

  validations: any = { password: false };
  async change() {
  
    this.$emit('input', this.value);
  }

  cancel() {
    //  no-op
    this.show = false;
  }
}
</script>
