<template>
  <v-form v-model="valid" autocomplete="off">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Detalle</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="4">
              <fe-generales-tipoambiente
                v-bind:tipoambiente.sync="model.iAmb"
                :error="!!validations.iAmb"
                @input="handleInput"
                @change="validate('iAmb')"
              ></fe-generales-tipoambiente>
            </v-col>
            <v-col cols="12" md="4">
              <fe-generales-tipoemision
                v-bind:tipoemision.sync="model.iTpEmis"
                :error="!!validations.iTpEmis"
                @input="handleInput"
                @change="validate('iTpEmis')"
              ></fe-generales-tipoemision>
            </v-col>

            <v-col cols="12" md="4">
              <fe-generales-tipodocumento
                v-bind:tipodocumento.sync="model.iDoc"
                :error="!!validations.iDoc"
                @input="handleInput"
                @change="validate('iDoc')"
              ></fe-generales-tipodocumento>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dNroDF"
                :error="!!validations.dNroDF"
                label="Número del documento fiscal"
                hint="Número del documento fiscal"
                @change="validate('dNroDF')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dPtoFacDF"
                :error="!!validations.dPtoFacDF"
                label="Punto de Facturación"
                hint="Punto de Facturación del documento fiscal"
                @change="validate('dPtoFacDF')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.number="model.dSeg"
                :error="!!validations.dSeg"
                label="Codigo de Seguridad"
                hint="Codigo de Seguridad"
                @change="validate('dSeg')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-menu
                hint="Fecha de emision"
                ref="emisionMenu"
                v-model="emisionMenu"
                :close-on-content-click="false"
                :return-value.sync="fechaEmision"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fechaEmision"
                    label="Fecha de Emision"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fechaEmision" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="emisionMenu = false"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.emisionMenu.save(fechaEmision)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="6">
              <v-menu
                hint="Fecha de salida"
                ref="salidaMenu"
                v-model="salidaMenu"
                :close-on-content-click="false"
                :return-value.sync="fechaSalida"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fechaSalida"
                    label="Fecha de Salida"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fechaSalida" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="salidaMenu = false"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.salidaMenu.save(fechaSalida)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <fe-generales-tiponatops
                v-bind:tiponatops.sync="model.iNatOp"
                :error="!!validations.iNatOp"
                @input="handleInput"
                @change="validate('iNatOp')"
              ></fe-generales-tiponatops>
            </v-col>
            <v-col cols="12" md="4">
              <fe-generales-tipoops
                v-bind:tipoops.sync="model.iTipoOp"
                :error="!!validations.iTipoOp"
                @input="handleInput"
                @change="validate('iTipoOp')"
              ></fe-generales-tipoops>
            </v-col>

            <v-col cols="12" md="4">
              <fe-generales-destino
                v-bind:destino.sync="model.iDest"
                :error="!!validations.iDest"
                @input="handleInput"
                @change="validate('iDest')"
              ></fe-generales-destino>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <fe-generales-tipogeneracion
                v-bind:tipogeneracion.sync="model.iProGen"
                :error="!!validations.iProGen"
                @input="handleInput"
                @change="validate('iProGen')"
              ></fe-generales-tipogeneracion>
            </v-col>
            <v-col cols="12" md="4">
              <fe-generales-tipotxventa
                v-bind:tipotxventa.sync="model.iTipoTranVenta"
                :error="!!validations.iTipoTranVenta"
                @input="handleInput"
                @change="validate('iTipoTranVenta')"
              ></fe-generales-tipotxventa>
            </v-col>

            <v-col cols="12" md="4">
              <fe-generales-tiposucursal
                v-bind:tiposucursal.sync="model.iTipoSuc"
                :error="!!validations.iTipoSuc"
                @input="handleInput"
                @change="validate('iTipoSuc')"
              ></fe-generales-tiposucursal>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Observaciones</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea
            v-model.number="model.dInfEmFE"
            label="Observaciones"
            :error="!!validations.dInfEmFE"
            @change="validate('dInfEmFE')"
          ></v-textarea>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Emisor</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea
            v-model.number="model.dInfEmFE"
            label="Observaciones"
            :error="!!validations.dInfEmFE"
            @change="validate('dInfEmFE')"
          ></v-textarea>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Receptor</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea
            v-model.number="model.dInfEmFE"
            label="Observaciones"
            :error="!!validations.dInfEmFE"
            @change="validate('dInfEmFE')"
          ></v-textarea>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Autorizaciones de descargas</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-textarea
            v-model.number="model.dInfEmFE"
            label="Observaciones"
            :error="!!validations.dInfEmFE"
            @change="validate('dInfEmFE')"
          ></v-textarea>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Contigencia</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="model.dMotCont"
                :error="!!validations.dMotCont"
                label="Monto de Contingencia"
                hint="Razón de la operación en contingencia"
                @change="validate('dMotCont')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                hint="Fecha de contingencia"
                ref="contMenu"
                v-model="contMenu"
                :close-on-content-click="false"
                :return-value.sync="fechaCont"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fechaCont"
                    label="Fecha de Contigencia"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fechaCont" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="contMenu = false"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.contMenu.save(fechaCont)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>CAFE</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="4">
              <fe-generales-formcafe
                v-bind:formcafe.sync="model.iFormCafe"
                :error="!!validations.iFormCafe"
                @input="handleInput"
                @change="validate('iFormCafe')"
              ></fe-generales-formcafe>
            </v-col>
            <v-col cols="12" md="4">
              <fe-generales-entregacafe
                v-bind:entregacafe.sync="model.iEntCafe"
                :error="!!validations.iEntCafe"
                @input="handleInput"
                @change="validate('iEntCafe')"
              ></fe-generales-entregacafe>
            </v-col>

            <v-col cols="12" md="4">
              <fe-generales-enviocontenedor
                v-bind:enviocontenedor.sync="model.dEnvFe"
                :error="!!validations.dEnvFe"
                @input="handleInput"
                @change="validate('dEnvFe')"
              ></fe-generales-enviocontenedor>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-form>
</template>

<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  FormaPago,
  FormaPagoType,
  DGen,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TotalFormaPago from './FormaPago.vue';
import TotalBonificacion from './Bonificacion.vue';
import { validateOrReject, validate } from 'class-validator';
import GenTipoAmbiente from './Ambiente.vue';
import GenTipoEmision from './Emision.vue';
import moment from 'moment';
import GenTipoDocumento from './Documento.vue';
import GenTipoOps from './Ops.vue';
import GenTipoNatOps from './NatOps.vue';
import GenSucursal from './Sucursal.vue';
import GenFormCAFE from './FormCAFE.vue';
import GenTipoGeneracion from './Generacion.vue';
import GenTipoTxVenta from './TxVenta.vue';
import GenEntregaCAFE from './DeliverCAFE.vue';
import GenEnvioContenedor from './DeliveryContainer.vue';
import GenDestino from './Destino.vue';
@Component({
  name: 'fe-generales',
  props: ['generales', 'template'],
  watch: {
    generales: function(current, old) {
      if (current) {
        this.fechaCont = current.dFechaCont.toISOString().substr(0, 10);
        this.fechaEmision = current.dFechaEm.toISOString().substr(0, 10);
        this.fechaSalida = current.dFechaSalida.toISOString().substr(0, 10);
        this.model = { ...current };
      }
    },
  },
  components: {
    'fe-generales-tipoambiente': GenTipoAmbiente,
    'fe-generales-tipoemision': GenTipoEmision,
    'fe-generales-tipodocumento': GenTipoDocumento,

    'fe-generales-tipoops': GenTipoOps,
    'fe-generales-tiponatops': GenTipoNatOps,
    'fe-generales-tiposucursal': GenSucursal,

    'fe-generales-tipotxventa': GenTipoTxVenta,
    'fe-generales-tipogeneracion': GenTipoGeneracion,
    'fe-generales-formcafe': GenFormCAFE,

    'fe-generales-enviocontenedor': GenEnvioContenedor,
    'fe-generales-entregacafe': GenEntregaCAFE,
    'fe-generales-destino': GenDestino,
  },
})
export default class GeneralesIndex extends Vue {
  contMenu = false;
  fechaCont = new Date().toISOString().substr(0, 10);

  emisionMenu = false;
  fechaEmision = new Date().toISOString().substr(0, 10);

  salidaMenu = false;
  fechaSalida = new Date().toISOString().substr(0, 10);

  model: DGen = new DGen();
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
    this.model.dFechaCont = moment(this.fechaCont).toDate();
    this.model.dFechaEm = moment(this.fechaEmision).toDate();
    this.model.dFechaSalida = moment(this.fechaSalida).toDate();
    this.$emit('update:generales', { ...this.model });
  }

  created() {
    this.template = this.$props.template;
  }
}
</script>
