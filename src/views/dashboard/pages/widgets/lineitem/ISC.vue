<template>
  <v-row
    ><v-col cols="6">
      <v-autocomplete
        :items="items"
        item-text="key"
        item-value="value"
        label="Tasa ISC"
        v-model="item.dValISC"
        v-on:change="change"
      ></v-autocomplete>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="item.dTasaISC"
        label="Valor"
        v-on:change="change"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  TasaISC,
  ISC,
} from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-item-isc',
  props: ['isc'],
  watch: {
    isc: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class ItemISC extends Vue {
  item: ISC = new ISC();
  items = Object.entries(TasaISC)
    .filter((e) => !isNaN(e[0] as any))
    .map((e) => ({ key: e[1], value: e[0] }));

  change() {
    this.$emit('update:isc', { ...this.item });
  }
}
</script>
