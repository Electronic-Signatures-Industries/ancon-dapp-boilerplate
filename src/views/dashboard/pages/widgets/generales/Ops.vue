<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Operacion"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoOperacion,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipoops',
})
export default class GenTipoOps extends Vue {
  value: TipoOperacion | any = -1; //TipoOperacion.Compra;
  items = Object.entries(TipoOperacion)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoOperacion).find(
      (i) => i[1] === this.value
    );
    this.$emit('input', this.value);
  }
}
</script>
