<template>
  <v-row
    ><v-col cols="6">
      <v-autocomplete
        :items="items"
        item-text="key"
        item-value="value"
        label="Cod. de Retencion"
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
  Retencion,
  CodigoRetencion,
} from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-total-retencion',
  props: ['retencion'],
})
export default class TotalRetencion extends Vue {
  valor = 0;
  item = '';
  items = Object.entries(CodigoRetencion)
    .filter((e) => !isNaN(e[0] as any))
    .map((e) => ({ key: e[1], value: e[0] }));

  change() {
    this.$emit('update:retencion', {
      cCodRetenc: this.item,
      cValRetenc: this.valor,
    });
  }
}
</script>
