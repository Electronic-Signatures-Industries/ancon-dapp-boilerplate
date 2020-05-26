<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Emision"
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
  TipoEmision,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipoemision',
  props: ['tipoemision'],
  watch: {
    tipoemision: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenTipoEmision extends Vue {
  item: TipoEmision = TipoEmision.UsoPosteriorOpsNormal;
  items = Object.entries(TipoEmision)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoEmision).find((i) => i[1] === this.item);
    this.$emit('update:tipoemision', this.item);
  }
}
</script>
