<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model.number="item.dGTINCom"
          hint="C301:Código GTIN del ítem, para la unidad de comercialización"
          label="GTIN Comercializacion"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model.number="item.dCantGTINCom"
          hint="C302:Cantidad del producto o servicio en el Código GTIN del ítem de comercialización"
          label="Cantidad"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model.number="item.dGTINInv"
          hint="C303:Código GTIN del ítem, para la unidad de inventario"
          label="GTIN Inventario"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model.number="item.dCantComInvent"
          hint="C304:Cantidad del producto o servicio en el Código GTIN del ítem de inventario"
          label="Cantidad"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { TypedRFE,  CodigoItem } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-item-codigo',
  props: ['codigo'],
  watch: {
    codigo: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class ItemCodigo extends Vue {
  item: CodigoItem = new CodigoItem();

  change() {
    this.$emit('update:codigo', { ...this.item });
  }
}
</script>
