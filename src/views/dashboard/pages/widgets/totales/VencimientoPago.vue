<template>
  <v-row
    ><v-col cols="6">
      <v-text-field
        v-model="item.dSecItem"
        label="Secuencia"
        v-on:input="change"
        hint="D501: Número secuencial de cada fracción de pago a plazo "
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        hint="D503: Valor de la fracción "
        v-model="item.dValItPlazo"
        label="Valor"
        v-on:input="change"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-menu
        hint="D502: Fecha de vencimiento de la fracción "
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="fecha"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="fecha"
            label="Fecha de Vencimiento"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="fecha" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(fecha)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="item.dInfPagPlazo"
        hint="D504: Informaciones de interés del emitente"
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
  CodigoRetencion,
  VencimientoPago,
} from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({
  name: 'fe-total-vencimiento-pago',
  props: ['vencimientopago'],
  watch: {
    vencimientopago: function(current, old) {
      if (current) {
        this.fecha = current.dFecItPlazo.toISOString().substr(0, 10);
        this.item = { ...current };
      }
    },
  },
})
export default class TotalVencimientoPago extends Vue {
  fecha = new Date().toISOString().substr(0, 10);

  item: VencimientoPago = new VencimientoPago();

  menu = false;
  change() {
    this.item.dFecItPlazo = moment(this.fecha).toDate();
    this.$emit('update:vencimientopago', { ...this.item });
  }
}
</script>
