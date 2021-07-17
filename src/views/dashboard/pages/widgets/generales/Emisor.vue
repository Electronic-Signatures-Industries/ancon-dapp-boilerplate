<template>
  <div>
    <v-row>
      <v-col cols="4">
        <fe-generales-tiporuc
          v-model="tipoRuc"
        ></fe-generales-tiporuc>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="rucDV" label="RUC y DV"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="value.dNombEm"
          label="Nombre"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="value.dSucEm"
          label="Sucursal"
          v-on:change="change"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="value.dCoordEm"
          label="Coordenadas"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="value.dDirecEm"
          label="Direccion"
          v-on:change="change"
        ></v-text-field>
      </v-col>

      <v-col cols="6">
        <fe-ubicaciones
          v-model="value.gUbiEm"
          :error="!!validations.gUbiEm"
          @input="change"
          @change="validate('gUbiEm')"
        ></fe-ubicaciones>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="telefonos"
          label="Telefonos"
          hint="Separe los telefonos con ;"
          v-on:change="change"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="correos"
          label="Correo electronicos"
          hint="Separe los correo electronicos con ;"
          v-on:change="change"
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  TasaITBMS,
  ITBMS,
  Emisor,
} from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GenRucType from './RucType.vue';
import { validate } from 'class-validator';
import Locations from '../Locations.vue';

@Component({
  components: {
    'fe-generales-tiporuc': GenRucType,
    'fe-ubicaciones': Locations,
  },
  name: 'fe-generales-emisor',

})
export default class GenEmisor extends Vue {
  value: Emisor = new Emisor();
  tipoRuc: number = 0;
  rucDV: string = '';
  telefonos = '';
  correos = '';
  validations = {};
  async validate(key) {
    this.validations = {};
    let resp = await validate(this.value);
    resp.map((i) => {
      this.validations = {
        [i.property]: i,
        ...this.validations,
      };
    });
  }
  change() {
    this.value.dCorElecEmi = this.correos.split(';');
    this.value.dTfnEm = this.telefonos.split(';');
    this.value.gRucEmi = {
      dTipoRuc: this.tipoRuc,
      dRuc: this.rucDV.split(' ')[0],
      dDV: this.rucDV.split(' ')[1],
    };
    this.$emit('input', { ...this.value });
  }
}
</script>
