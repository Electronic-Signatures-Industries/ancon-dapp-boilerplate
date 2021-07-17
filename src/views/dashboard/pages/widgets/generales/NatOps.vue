<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Naturaleza de Operacion"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoNaturalezaOperacion,
} from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tiponatops',
})
export default class GenTipoNatOps extends Vue {
  value: TipoNaturalezaOperacion | any = -1;// TipoNaturalezaOperacion.Compra;
  items = Object.entries(TipoNaturalezaOperacion)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoNaturalezaOperacion).find(
      (i) => i[1] === this.value
    );
    this.$emit('input', this.value);
  }
}
</script>
