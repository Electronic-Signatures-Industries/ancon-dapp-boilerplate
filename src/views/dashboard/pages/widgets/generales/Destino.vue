<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Destino"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, Destino } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-destino',
  props: ['destino'],
  watch: {
    destino: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenDestino extends Vue {
  item: Destino = Destino.Panama;
  items = Object.entries(Destino)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(Destino).find((i) => i[1] === this.item);
    this.$emit('update:destino', this.item);
  }
}
</script>
