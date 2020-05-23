<template>
  <v-row
    ><v-col md="4">
      <v-autocomplete
        :items="items"
        item-text="key" hint="D301: Forma de pago de la factura "
        item-value="value"
        label="Forma de pago"
        v-model="item"
        v-on:change="change"
      ></v-autocomplete>
    </v-col>
    <v-col md="4">
      <v-text-field hint="D303: Valor de la fracción pagada utilizando esta forma de pago "
        v-model.number="cuota"
        label="Valor de Cuota"
        v-on:change="change"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field hint="D302: Descripción de forma de pago no listada en el formato"
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
  FormaPago,
  FormaPagoType,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VAutocomplete } from 'vuetify/lib';

@Component({
  name: 'fe-total-forma-pago',
  components: {
    'v-autocomplete': VAutocomplete,
  },
  props: ['formapago'],
})
export default class TotalFormaPago extends Vue {
  item: FormaPago = FormaPago.Credito;
  items = Object.entries(FormaPago).map(([v, k]) => ({ key: v, value: k }));
  cuota = 0;
  descripcion = '';
  change() {
    this.$emit('update:formapago', {
      iFormaPago: this.item,
      dVlrCuota: this.cuota,
      dFormaPagoDesc: this.descripcion,
    } as FormaPagoType);
  }
}
</script>
