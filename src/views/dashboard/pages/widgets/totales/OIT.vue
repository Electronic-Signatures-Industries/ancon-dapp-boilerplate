<template>
  <v-row
    ><v-col cols="6">
      <v-autocomplete
        :items="items"
        item-text="key"
        item-value="value"
        label="Cod. de Otros Impuestos"
        v-model="item"
        v-on:change="change"
      ></v-autocomplete>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="valor"
        label="Valor"
        v-on:change="change"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  OtrosImpuestos,
  CodigoRetencion,
} from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-total-oit',
  props: ['oit']
})
export default class TotalOIT extends Vue {
  valor = 0;
  item = '';
  items = Object.entries(OtrosImpuestos)
    .filter((e) => !isNaN(e[0] as any))
    .map((e) => ({ key: e[1], value: e[0] }));

  change() {
    this.$emit('update:oit', {
      dCodOTITotal: this.item,
      dValOTITotal: this.valor,
    });
  }
}
</script>
