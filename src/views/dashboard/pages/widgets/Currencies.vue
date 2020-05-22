<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Monedas"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema, Monedas } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'fe-monedas',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: String
    }
})
export default class Currencies extends Vue {
  item = '';
  items = Object.entries(Monedas).map(([v, k]) => ({ key: v, value: k }));

  change() {
      this.$emit('change', this.item)
  }
}
</script>
