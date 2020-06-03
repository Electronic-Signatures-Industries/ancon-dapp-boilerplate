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
import { TypedRFE,  Monedas } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-monedas',
  props: ['monedas'],
  watch: {
    monedas: function(current, old) {
      if (current) {
        this.item = current;
      }
    },
  },
})
export default class Currencies extends Vue {
  item = '';
  items = Object.entries(Monedas).map(([v, k]) => ({ key: v, value: k }));

  change() {
    this.$emit('update:monedas', this.item);
  }
}
</script>
