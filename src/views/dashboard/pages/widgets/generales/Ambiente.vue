<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Ambiente"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  TasaITBMS,
  ITBMS,
  TipoAmbiente,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipoambiente',
  props: ['tipoambiente'],
  watch: {
    tipoambiente: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenTipoAmbiente extends Vue {
  item: TipoAmbiente = TipoAmbiente.Produccion;
  items = Object.entries(TipoAmbiente)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoAmbiente).find((i) => i[1] === this.item);
    console.log(v);
    this.$emit('update:tipoambiente', this.item);
  }
}
</script>
