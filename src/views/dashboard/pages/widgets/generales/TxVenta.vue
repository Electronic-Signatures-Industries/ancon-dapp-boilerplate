<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Transaccion de Venta"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoTransaccionVenta,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipotxventa',
  props: ['tipotxventa'],
  watch: {
    tipotxventa: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenTipoTxVenta extends Vue {
  item: TipoTransaccionVenta = TipoTransaccionVenta.Giro;
  items = Object.entries(TipoTransaccionVenta)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoTransaccionVenta).find(
      (i) => i[1] === this.item
    );
    this.$emit('update:tipotxventa', this.item);
  }
}
</script>
