<template>
    <v-row
      ><v-col cols="6">
        <v-text-field
          v-model.number="valor"
          label="Valor"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="descripcion"
          label="Descripcion"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
</template>
<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  OtrosImpuestos,
  Bonificaciones,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-total-bonificacion', 
  props: ['bonificacion'],
})
export default class TotalBonificacion extends Vue {
  descripcion = '';
  valor = 0;
  menu = false;
  change() {
    this.$emit('update:bonificacion', {
      dDetalDesc: this.descripcion,
      dValDesc: this.valor,
    } as Bonificaciones);
  }
}
</script>
