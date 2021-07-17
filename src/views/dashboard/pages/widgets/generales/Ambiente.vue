<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Ambiente"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  TasaITBMS,
  ITBMS,
  TipoAmbiente,
} from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipoambiente',
  // props: ['tipoambiente'],
  // watch: {
  //   tipoambiente: function(current, old) {
  //     if (current) {
  //       this.item = { ...current };
  //     }
  //   },
  // },
})
export default class GenTipoAmbiente extends Vue {
  value: TipoAmbiente | any = -1;
  items = Object.entries(TipoAmbiente)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    this.$emit('input', this.value);
  }
}
</script>
