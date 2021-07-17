<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Send to</span>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off">
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                required
                :items="addresses"
                v-model="value"
                label="To"  
                item-text="name"
                item-value="name"
                return-object
                single-line
              ></v-select>
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
  name: 'xdv-send',
  props: ['value', 'show', 'addresses'],
})
export default class SendTo extends Vue {
  value;
  addresses;
  show;
  change() {
    this.$emit('input', [this.value]);
  }
}
</script>
