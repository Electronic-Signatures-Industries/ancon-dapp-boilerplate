<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de RUC"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoRuc,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tiporuc',

})
export default class GenRucType extends Vue {
  value: TipoRuc | any = -1; // TipoRuc.Natural;
  items = Object.entries(TipoRuc)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoRuc).find(
      (i) => i[1] === this.value
    );
    this.$emit('input', this.value);
  }
}
</script>
