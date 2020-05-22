<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>Totales </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dNroItems"
            label="Cantidad"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dTotAcar"
            label="Valor de Acarreo"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dTotDesc"
            label="Suma de Descuentos"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dTotGravado"
            label="Gravado"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dISC"
            label="ISC"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dITBMS"
            label="ITBMS"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dTotNeto"
            label="Neto"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dTotRec"
            label="Recibido"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dTotSeg"
            label="Asegurado"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dVTotItems"
            label="Total Items"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dVTot"
            label="Total"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="model.dVuelto"
            label="Vuelto"
            @input="handleInput"
            @change="validate"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <fe-total-bonificacion
            v-bind:bonificacion.sync="model.gDescBonif"
            label="Bonificaciones"
            @input="handleInput"
            @change="validate"
          ></fe-total-bonificacion>
        </v-col>

        <v-col cols="12" md="8">
          <fe-total-forma-pago
            v-bind:formapago.sync="model.gFormaPago"
            label="Forma de Pago"
            @input="handleInput"
            @change="validate"
          ></fe-total-forma-pago>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  FormaPago,
  FormaPagoType,
  Totales,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TotalFormaPago from './FormaPago.vue';
import TotalBonificacion from './Bonificacion.vue';

@Component({
  name: 'fe-total',
  props: ['totales'],
  components: {
    'fe-total-forma-pago': TotalFormaPago,
    'fe-total-bonificacion': TotalBonificacion,
  },
})
export default class TotalIndex extends Vue {
  model: Totales = new Totales();
  valid = true;

  validate() {
    // this.model = {
    //   dNroItems: 0,
    // } as Totales;
  }
  handleInput() {
    this.$emit('update:totales', this.model);
  }
}
</script>
