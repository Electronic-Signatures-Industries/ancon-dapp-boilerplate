<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Unidades"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema, Unidades } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-unidades',
})
export default class Units extends Vue {
  value = '';
  items = Object.entries(Unidades).map(([v, k]) => ({ key: v, value: k }));

  change() {
    this.$emit('input', this.value);
  }
}
</script>
