<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Ubicaciones"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE,  Ubicaciones } from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-ubicaciones',
})
export default class Locations extends Vue {
  value = '';
  items = Object.entries(Ubicaciones).map(([v, k]) => ({ key: v, value: k }));

  change() {
    this.$emit('input', this.value);
  }
}
</script>
