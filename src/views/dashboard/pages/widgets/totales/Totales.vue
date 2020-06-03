<template>
  <v-form v-model="valid" autocomplete="off">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Detalle</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dNroItems"
                label="Cantidad"
                :value="template.dNroItems.default"
                @input="handleInput"
                :error="!!validations.dNroItems"
                hint="D13: Número total de ítems de la factura"
                @change="validate('dNroItems')"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-show="template.dTotAcar.visible" md="4">
              <v-text-field
                v-model.number="model.dTotAcar"
                :error="!!validations.dTotAcar"
                label="Valor de Acarreo"
                hint="D07: Valor del acarreo cobrado en el precio total"
                @input="handleInput"
                @change="validate('dTotAcar')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dTotDesc"
                :error="!!validations.dTotDesc"
                label="Suma de Descuentos"
                hint="D06: Suma de los descuentos y bonificaciones concedidos sobre el valor total de la factura"
                @input="handleInput"
                @change="validate('dTotDesc')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                required
                hint="D05: Suma total de monto gravado"
                v-model.number="model.dTotGravado"
                :error="!!validations.dTotGravado"
                label="Gravado"
                @input="handleInput"
                @change="validate('dTotGravado')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dISC"
                :error="!!validations.dISC"
                label="ISC"
                hint="D04: Total del ISC"
                @input="handleInput"
                @change="validate('dISC')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dITBMS"
                :error="!!validations.dITBMS"
                required
                label="ITBMS"
                hint="D03: Total del ITBMS"
                @input="handleInput"
                @change="validate('dITBMS')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dTotNeto"
                :error="!!validations.dTotNeto"
                required
                hint="D02: Suma de los precios antes de impuesto"
                label="Neto"
                @input="handleInput"
                @change="validate('dTotNeto')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dTotRec"
                required
                :error="!!validations.dTotRec"
                hint="D10: Suma de los valores recibidos"
                label="Recibido"
                @input="handleInput"
                @change="validate('dTotRec')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                hint="D08: Valor del seguro cobrado en el precio total"
                v-model.number="model.dTotSeg"
                :error="!!validations.dTotSeg"
                label="Asegurado"
                @input="handleInput"
                @change="validate('dTotSeg')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                hint="Suma total de los ítems con los montos de los impuestos"
                v-model.number="model.dVTotItems"
                label="Total Items"
                :error="!!validations.dVTotItems"
                @input="handleInput"
                required
                @change="validate('dVTotItems')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                hint="D09: Valor total de la factura"
                v-model.number="model.dVTot"
                label="Total"
                required
                :error="!!validations.dVTot"
                @input="handleInput"
                @change="validate('dVTot')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                hint="Vuelto entregado al cliente"
                v-model.number="model.dVuelto"
                label="Vuelto"
                :error="!!validations.dVuelto"
                @input="handleInput"
                @change="validate('dVuelto')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Bonificaciones</v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total-bonificacion-list
            v-bind:bonificacionitems.sync="model.gDescBonif"
            :error="!!validations.gDescBonif"
            label="Bonificaciones"
            @input="handleInput"
            @change="validate('gDescBonif')"
          ></fe-total-bonificacion-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Forma de pagos</v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total-forma-pago-list
            required
            v-bind:formapagoitems.sync="model.gFormaPago"
            :error="!!validations.gFormaPago"
            label="Forma de Pago"
            @input="handleInput"
            @change="validate('gFormaPago')"
          ></fe-total-forma-pago-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Tiempo de pago</v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total-tiempo-pago
            v-bind:tiempopago.sync="model.iPzPag"
            :error="!!validations.iPzPag"
            label="Tiempo de Pago"
            @input="handleInput"
            @change="validate('iPzPag')"
          ></fe-total-tiempo-pago>
        </v-expansion-panel-content> </v-expansion-panel
      ><v-expansion-panel>
        <v-expansion-panel-header>Retenciones</v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total-retencion
            v-bind:retencion.sync="model.gRetenc"
            label="Retenciones"
            :error="!!validations.gRetenc"
            @input="handleInput"
            @change="validate('gRetenc')"
          ></fe-total-retencion>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Otros impuestos</v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total-oit
            v-bind:oit.sync="model.gOTITotal"
            :error="!!validations.gOTITotal"
            label="Otros Impuestos"
            @input="handleInput"
            @change="validate"
          ></fe-total-oit>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Vencimiento de pagos</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <fe-total-vencimiento-pago-list
            v-bind:vencimientopagoitems.sync="model.gPagPlazo"
            label="Vencimiento de Pago"
            :error="!!validations.gPagPlazo"
            @input="handleInput"
            @change="validate"
          ></fe-total-vencimiento-pago-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-form>
</template>

<script lang="ts">
import {
  TypedRFE,
  
  FormaPago,
  FormaPagoType,
  Totales,
} from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TotalFormaPago from './FormaPago.vue';
import TotalBonificacion from './Bonificacion.vue';
import { validateOrReject, validate } from 'class-validator';
import TotalOIT from './OIT.vue';
import TotalVencimientoPago from './VencimientoPago.vue';
import TotalRetencion from './Retencion.vue';
import TotalTiempPago from './TiempoPago.vue';
import TotalVencimientoPagoList from './VencimientoPagoList.vue';
import TotalFormaPagoList from './FormaPagoList.vue';
import TotalBonificacionList from './BonificacionList.vue';
@Component({
  name: 'fe-total',
  props: ['totales', 'template'],
  watch: {
    totales: function(current, old) {
      if (current) {
        // this.fechaFab = current.dFechaFab.toISOString().substr(0, 10);
        this.model = { ...current };
      }
    },
  },
  components: {
    'fe-total-forma-pago-list': TotalFormaPagoList,
    'fe-total-bonificacion-list': TotalBonificacionList,
    'fe-total-oit': TotalOIT,
    'fe-total-vencimiento-pago-list': TotalVencimientoPagoList,
    'fe-total-retencion': TotalRetencion,
    'fe-total-tiempo-pago': TotalTiempPago,
  },
})
export default class TotalIndex extends Vue {
  model: Totales = new Totales();
  template: any;
  valid = true;
  validations = {};
  formTitle = '';
  async validate(key) {
    this.validations = {};
    let resp = await validate(this.model);
    resp.map((i) => {
      this.validations = {
        [i.property]: i,
        ...this.validations,
      };
    });
  }
  handleInput() {
    this.$emit('update:totales', { ...this.model });
  }

  created() {
    this.template = this.$props.template;
  }
}
</script>
