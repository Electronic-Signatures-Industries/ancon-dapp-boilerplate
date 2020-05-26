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
  TipoGeneracion,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipogeneracion',
})
export default class GenTipoGeneracion extends Vue {
  value: TipoGeneracion | any = -1; // TipoGeneracion.SistemaFacturacionContribuyente;
  items = Object.entries(TipoGeneracion)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoGeneracion).find(
      (i) => i[1] === this.value
    );
    this.$emit('input', this.value);
  }
}
</script>
