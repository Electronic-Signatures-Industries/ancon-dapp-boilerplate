<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Sucursal"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoSucursal,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tiposucursal',
  props: ['tiposucursal'],
  watch: {
    tiposucursal: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenSucursal extends Vue {
  item: TipoSucursal = TipoSucursal.Retail;
  items = Object.entries(TipoSucursal)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoSucursal).find(
      (i) => i[1] === this.item
    );
    this.$emit('update:tiposucursal', this.item);
  }
}
</script>
