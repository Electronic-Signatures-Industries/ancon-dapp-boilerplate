<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Descripcion de Cod. Bienes y Servicios"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE,  DescBienes } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-desc-bienes',
  
})
export default class DescBienesAutocomplete extends Vue {
  value = '';
  items = Object.entries(DescBienes).map(([v, k]) => ({ key: v, value: k }));

  change() {
    this.$emit('input', this.value);
  }
}
</script>
