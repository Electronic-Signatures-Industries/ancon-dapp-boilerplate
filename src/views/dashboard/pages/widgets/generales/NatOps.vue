<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Naturaleza de Operacion"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoNaturalezaOperacion,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tiponatops',
  props: ['tiponatops'],
  watch: {
    tiponatops: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenTipoNatOps extends Vue {
  item: TipoNaturalezaOperacion = TipoNaturalezaOperacion.Compra;
  items = Object.entries(TipoNaturalezaOperacion)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoNaturalezaOperacion).find(
      (i) => i[1] === this.item
    );
    this.$emit('update:tiponatops', this.item);
  }
}
</script>
