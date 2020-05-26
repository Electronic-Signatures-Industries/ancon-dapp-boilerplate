<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Sucursal"
    v-model="value"
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
})
export default class GenSucursal extends Vue {
  value: TipoSucursal | any = -1; // TipoSucursal.Retail;
  items = Object.entries(TipoSucursal)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoSucursal).find(
      (i) => i[1] === this.value
    );
    this.$emit('input', this.value);
  }
}
</script>
