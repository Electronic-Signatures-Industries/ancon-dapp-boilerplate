<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Entrega CAFE"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, EntregaCafe } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-entregacafe',
  props: ['entregacafe'],
  watch: {
    entregacafe: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenEntregaCAFE extends Vue {
  item: EntregaCafe = EntregaCafe.EnviadoReceptorElectronicamente;
  items = Object.entries(EntregaCafe)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(EntregaCafe).find((i) => i[1] === this.item);
    this.$emit('update:entregacafe', this.item);
  }
}
</script>
