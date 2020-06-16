<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Abreviatura de Cod. Bienes y Servicios"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  DescBienes,
  CatBienes,
} from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-cat-bienes',
})
export default class CatBienesAutocomplete extends Vue {
  value = '';
  items = Object.entries(CatBienes).map(([v, k]) => ({ key: v, value: k }));

  change() {
    this.$emit('input', this.value);
  }
}
</script>
