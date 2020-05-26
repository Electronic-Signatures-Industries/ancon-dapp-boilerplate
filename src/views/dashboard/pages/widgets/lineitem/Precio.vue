<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model.number="value.dPrUnit"
          hint="C201:Precio unitario de la transferencia del bien o servicio"
          label="Precio x Unidad"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="value.dPrUnitDesc"
          hint="C202:Descuento en el precio del ítem"
          label="Descuento"
          v-on:change="change"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-text-field
          v-model.number="value.dPrItem"
          hint="C203:Precio del ítem"
          label="Precio"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model.number="value.dPrAcarItem"
          hint="C204:Precio del acarreo"
          label="Acarreo"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="value.dPrSegTime"
          hint="C205:Precio del seguro"
          label="Seguro"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="value.dValTotItem"
          hint="C206:Suma del precio del ítem con los montos de los impuestos"
          label="Total"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  OtrosImpuestos,
  CodigoRetencion,
  Precio,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-item-precio',
 
 
})
export default class ItemPrecio extends Vue {
  value: Precio = new Precio();

  change() {
    this.$emit('input', { ...this.value });
  }
}
</script>
