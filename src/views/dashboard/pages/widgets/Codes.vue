<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Abreviatura de Cod. Bienes y Servicios"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema,DescBienes, CatBienes } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'fe-cat-bienes',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: String
    }
})
export default class Codes extends Vue {
  item = '';
  items = Object.entries(CatBienes).map(([v, k]) => ({ key: v, value: k }));

  change() {
      this.$emit('change', this.item)
  }
}
</script>
