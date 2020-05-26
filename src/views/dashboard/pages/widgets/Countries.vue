<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Paises"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema, Paises } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-paises',
  
})
export default class Countries extends Vue {
  value = '';
  items = Object.entries(Paises).map(([v, k]) => ({ key: v, value: k }));

  change() {
    this.$emit('input', this.value);
  }
}
</script>
