<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="TiempoPago"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema, TiempoPago } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-total-tiempo-pago',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: Number,
  },
})
export default class TotalTiempPago extends Vue {
  item = '';
  items = Object.entries(TiempoPago)
    .filter((e) => !isNaN(e[0] as any))
    .map((e) => ({ key: e[1], value: e[0] }));

  change() {
    this.$emit('change', this.item);
  }
}
</script>
