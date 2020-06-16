<template>
  <v-row
    ><v-col>
      <v-autocomplete
        :items="items"
        item-text="key"
        item-value="value"
        label="TiempoPago"
        v-model="item"
        hint="D12: Tiempo de pago"
        v-on:change="change"
      ></v-autocomplete> </v-col
  ></v-row>
</template>
<script lang="ts">
import { TypedRFE,  TiempoPago } from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-total-tiempo-pago',
  props: ['tiempopago'],
})
export default class TotalTiempPago extends Vue {
  item = '';
  items = Object.entries(TiempoPago)
    .filter((e) => !isNaN(e[0] as any))
    .map((e) => ({ key: e[1], value: e[0] }));

  change() {
    this.$emit('update:tiempopago', this.item);
  }
}
</script>
