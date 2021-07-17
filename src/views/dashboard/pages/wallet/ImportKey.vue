<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Passphrase</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="form" autocomplete="off">
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
        <v-btn color="blue darken-1" text @click="show = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="change">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { TypedRFE, TasaISC, ISC } from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'xdv-unlock',
  props: ['value', 'show'],
})
export default class Unlock extends Vue {
  value: string = '';
  show = false;
  showPassword = false;


  validations: any = { password: false };
  change() {
    this.$emit('input', this.value);
  }
}
</script>
