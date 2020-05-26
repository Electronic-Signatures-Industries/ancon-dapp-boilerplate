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
          v-model="value.dNombRec"
          label="Nombre"
          v-on:change="change"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="value.dDirecRec"
          label="Direccion"
          v-on:change="change"
        ></v-text-field>
      </v-col>

      <v-col cols="6">
        <fe-ubicaciones
          v-model="value.gUbiRec"
          :error="!!validations.gUbiRec"
          @input="change"
          @change="validate('gUbiRec')"
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

    <v-row>
      <v-col cols="12">
        <fe-paises
          v-model="value.cPaisRec"
          :error="!!validations.cPaisRec"
          @input="change"
          @change="validate('cPaisRec')"
        ></fe-paises>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  TasaITBMS,
  ITBMS,
  Receptor,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Countries from '../Countries.vue';
import GenRucType from './RucType.vue';
import { validate } from 'class-validator';
import Locations from '../Locations.vue';

@Component({
  components: {
    'fe-ubicaciones': Locations,
    'fe-paises': Countries,
    'fe-generales-tiporuc': GenRucType,
  },
  name: 'fe-generales-receptor',
  // props: ['receptor'],
  // watch: {
  //   receptor: function(current, old) {
  //     if (current) {
  //       this.telefonos = current.dCorElecEmi.join(';');
  //       this.correos = current.dTfnEm.join(';');
  //       this.tipoRuc = current.gRucRec.dTipoRuc;
  //       this.rucDV = `${current.gRucRec.dRuc} ${current.gRucRec.dDV}`;
  //       this.value = { ...current };
  //     }
  //   },
  // },
})
export default class GenReceptor extends Vue {
  value: Receptor = new Receptor();
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
    this.value.dCorElecRec = this.correos.split(';');
    this.value.dTfnRec = this.telefonos.split(';');
    this.value.gRucRec = {
      dTipoRuc: this.tipoRuc,
      dRuc: this.rucDV.split(' ')[0],
      dDV: this.rucDV.split(' ')[1],
    };
    this.$emit('input', { ...this.value });
  }
}
</script>
