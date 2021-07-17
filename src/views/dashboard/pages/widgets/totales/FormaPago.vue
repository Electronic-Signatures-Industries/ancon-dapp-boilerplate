<template>
  <v-row
    ><v-col md="4">
      <v-autocomplete
        :items="items"
        item-text="key"
        hint="D301: Forma de pago de la factura "
        item-value="value"
        label="Forma de pago"
        v-model="item.iFormaPago"
        v-on:change="change"
      ></v-autocomplete>
    </v-col>
    <v-col md="4">
      <v-text-field
        hint="D303: Valor de la fracción pagada utilizando esta forma de pago "
        v-model.number="item.dVlrCuota"
        label="Valor de Cuota"
        v-on:input="change"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        hint="D302: Descripción de forma de pago no listada en el formato"
        v-model="item.dFormaPagoDesc"
        label="Descripcion"
        v-on:input="change"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  TypedRFE,
  
  FormaPago,
  FormaPagoType,
} from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VAutocomplete } from 'vuetify/lib';

@Component({
  name: 'fe-total-forma-pago',
  components: {
    'v-autocomplete': VAutocomplete,
  },
  props: ['formapago'],
  watch: {
    formapago: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class TotalFormaPago extends Vue {
  items = Object.entries(FormaPago).map(([v, k]) => ({ key: v, value: k }));
  item: FormaPagoType = new FormaPagoType();
  change() {
    this.$emit('update:formapago', { ...this.item });
  }
  mounted() {
    this.item = this.$props.formapago || new FormaPagoType();
  }
}
</script>
