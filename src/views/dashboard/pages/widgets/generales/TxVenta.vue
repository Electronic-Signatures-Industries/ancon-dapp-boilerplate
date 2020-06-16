<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Tipo de Transaccion de Venta"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  TipoTransaccionVenta,
} from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-tipotxventa',
})
export default class GenTipoTxVenta extends Vue {
  value: TipoTransaccionVenta | any = -1; // TipoTransaccionVenta.Giro;
  items = Object.entries(TipoTransaccionVenta)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(TipoTransaccionVenta).find(
      (i) => i[1] === this.value
    );
    this.$emit('input', this.value);
  }
}
</script>
