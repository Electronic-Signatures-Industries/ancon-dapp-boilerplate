<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Emision"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  TasaITBMS,
  ITBMS,
  TipoEmision,
} from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipoemision',
})
export default class GenTipoEmision extends Vue {
  value: TipoEmision | any = -1;
  items = Object.entries(TipoEmision)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoEmision).find((i) => i[1] === this.value);
    this.$emit('input', this.value);
  }
}
</script>
