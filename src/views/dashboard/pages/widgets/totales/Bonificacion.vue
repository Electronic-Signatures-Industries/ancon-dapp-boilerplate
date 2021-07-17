<template>
  <v-row
    ><v-col cols="6">
      <v-text-field
        v-model.number="item.dValDesc"
        hint="D201: Monto Descuentos/Bonificaciones y otros ajustes"
        label="Valor"
        v-on:input="change"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="item.dDetalDesc"
        hint="D200: Descripción de descuentos o bonificaciones adicionales aplicados a la factura"
        label="Descripcion"
        v-on:input="change"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  OtrosImpuestos,
  Bonificaciones,
} from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-total-bonificacion',
  props: ['bonificacion'],
  watch: {
    bonificacion: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class TotalBonificacion extends Vue {
  item: Bonificaciones = new Bonificaciones();
  menu = false;
  change() {
    this.$emit('update:bonificacion', { ...this.item });
  }
  mounted() {
    this.item = this.$props.bonificacion || new Bonificaciones();
  }
}
</script>
