<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Documento"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  TasaITBMS,
  ITBMS,
  TipoDocumento,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipodocumento',
})
export default class GenTipoDocumento extends Vue {
  value: TipoDocumento | any = -1;// TipoDocumento.FacturaOpsInterna;
  items = Object.entries(TipoDocumento)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoDocumento).find((i) => i[1] === this.value);
    this.$emit('input', this.value);
  }
}
</script>
