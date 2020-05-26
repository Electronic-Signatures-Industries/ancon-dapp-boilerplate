<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Documento"
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
  TipoDocumento,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipodocumento',
  props: ['tipodocumento'],
  watch: {
    tipodocumento: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenTipoDocumento extends Vue {
  item: TipoDocumento = TipoDocumento.FacturaOpsInterna;
  items = Object.entries(TipoDocumento)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoDocumento).find((i) => i[1] === this.item);
    this.$emit('update:tipodocumento', this.item);
  }
}
</script>
