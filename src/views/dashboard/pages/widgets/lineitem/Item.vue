<template>
  <v-data-table
    :headers="headers"
    :items="items"
    dense
    :hide-default-footer="true"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn
              @click="createNewItem"
              color="primary"
              dark
              class="mb-2"
              v-on="on"
              >Nuevo</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" autocomplete="off">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Detalle</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="editModel.dSecItem"
                            label="Secuencia"
                            :value="template.dSecItem.default"
                            :error="!!validations.dSecItem"
                            @change="validate('dSecItem')"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            required
                            v-model.number="editModel.dDescProd"
                            :error="!!validations.dDescProd"
                            label="Descripción"
                            hint="C03:Descripción del producto o servicio"
                            @change="validate('dDescProd')"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="editModel.dCodProd"
                            :error="!!validations.dCodProd"
                            label="Cod. Interno"
                            hint="Codigo interno del item"
                            @change="validate('dCodProd')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            hint="C05:Unidad de medida del código interno"
                            v-model="editModel.cUnidad"
                            :error="!!validations.cUnidad"
                            label="Unidad Interno"
                            @change="validate('cUnidad')"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            required
                            v-model.number="editModel.cCantCodInt"
                            :error="!!validations.cCantCodInt"
                            label="Cantidad"
                            hint=" C06:Cantidad del producto o servicio en la unidad de medida del código interno"
                            @change="validate('cCantCodInt')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-menu
                            hint="C07:Fecha de fabricación/elaboración"
                            ref="fabMenu"
                            v-model="fabMenu"
                            :close-on-content-click="false"
                            :return-value.sync="fechaFab"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="fechaFab"
                                label="Fabricacion"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaFab" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="fabMenu = false"
                                >Cancelar</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.fabMenu.save(fechaFab)"
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-menu
                            hint="C08:Fecha de caducidad"
                            ref="expireMenu"
                            v-model="expireMenu"
                            :close-on-content-click="false"
                            :return-value.sync="fechaExpire"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="fechaExpire"
                                label="Expira"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="fechaExpire" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="expireMenu = false"
                                >Cancelar</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.expireMenu.save(fechaExpire)"
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <fe-cat-bienes
                            v-bind:catbienes.sync="editModel.dCodCPBSabr"
                            :error="!!validations.dCodCPBSabr"
                            label="Codigo CPBS corto"
                            @change="validate('dCodCPBSabr')"
                          ></fe-cat-bienes>
                        </v-col>

                        <v-col cols="12" md="4">
                          <fe-desc-bienes
                            v-bind:descbienes.sync="editModel.dCodCPBScmp"
                            :error="!!validations.dCodCPBScmp"
                            label="Codigo CPBS completo"
                            @change="validate('dCodCPBScmp')"
                          ></fe-desc-bienes>
                        </v-col>
                        <v-col cols="12" md="4">
                          <fe-unidades
                            v-bind:units.sync="editModel.cUnidadCPBS"
                            :error="!!validations.cUnidadCPBS"
                            label="Unidad"
                            @change="validate('cUnidadCPBS')"
                          ></fe-unidades>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-textarea
                            v-model.number="editModel.dInfEmFE"
                            label="Observaciones"
                            :error="!!validations.dInfEmFE"
                            @change="validate('dInfEmFE')"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Precios</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <fe-item-precio
                        required
                        v-model.number="editModel.gPrecios"
                        label="Precio"
                        :error="!!validations.gPrecios"
                        @change="validate('gPrecios')"
                      ></fe-item-precio> </v-expansion-panel-content
                  ></v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>GTIN</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <fe-item-codigo
                        v-bind:codigo.sync="editModel.gCodItem"
                        :error="!!validations.gCodItem"
                        label="GTIN"
                        @change="validate('gCodItem')"
                      ></fe-item-codigo> </v-expansion-panel-content
                  ></v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>ITBMS</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <fe-item-itbms
                        required
                        v-bind:itbms.sync="editModel.gITBMSItem"
                        :error="!!validations.gITBMSItem"
                        label="ITBMS"
                        @change="validate('gITBMSItem')"
                      ></fe-item-itbms> </v-expansion-panel-content
                  ></v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>ISC</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <fe-item-isc
                        v-bind:isc.sync="editModel.gISCItem"
                        :error="!!validations.gISCItem"
                        label="ISC"
                        @change="validate('gISCItem')"
                      ></fe-item-isc> </v-expansion-panel-content></v-expansion-panel
                ></v-expansion-panels>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import {
  TypedRFE,
  TypedRFESchema,
  FormaPago,
  FormaPagoType,
  Item,
  DescBienes,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TotalFormaPago from './FormaPago.vue';
import TotalBonificacion from './Bonificacion.vue';
import { validateOrReject, validate } from 'class-validator';
import ItemPrecio from './Precio.vue';
import ItemISC from './ISC.vue';
import ItemITBMS from './ITBMS.vue';
import ItemCodigo from './Codigo.vue';
import Units from '../Units.vue';
import Codes from '../Codes.vue';
import CatBienesAutocomplete from '../Codes.vue';
import DescBienesAutocomplete from '../CodeDescriptions.vue';
import moment from 'moment';
@Component({
  name: 'fe-item',
  props: ['itemindex', 'template'],
  watch: {
    itemindex: function(current, old) {
      if (current) {
        this.fechaFab = current.dFechaFab.toISOString().substr(0, 10);
        this.fechaExpire = current.dFechaCad.toISOString().substr(0, 10);

        this.item = { ...current };
      }
    },
  },
  components: {
    'fe-cat-bienes': CatBienesAutocomplete,
    'fe-desc-bienes': DescBienesAutocomplete,
    'fe-unidades': Units,
    'fe-item-codigo': ItemCodigo,
    'fe-item-itbms': ItemITBMS,
    'fe-item-isc': ItemISC,
    'fe-item-precio': ItemPrecio,
  },
})
export default class ItemIndex extends Vue {
  valid = true;

  template: any;
  items: any[] = [];

  dialog = false;
  headers = [
    { text: 'Secuencia', value: 'dSecItem' },
    { text: 'Descripcion', value: 'dDescProd' },
    { text: 'GTIN', value: 'gCodItem.dGTINCom' },

    { text: 'Cod. Interno', value: 'dCodProd' },
    { text: 'Unidad', value: 'cUnidad' },
    { text: 'Cantidad', value: 'cCantCodInt' },
    { text: 'Fabricacion', value: 'dFechaFab' },
    { text: 'Caducidad', value: 'dFechaCad' },
    { text: 'CPBS corto', value: 'dCodCPBSabr' },
    { text: 'CPBS completo', value: 'dCodCPBScmp' },
    { text: 'Unidad CPBS', value: 'cUnidadCPBS' },
    { text: 'Observaciones', value: 'dInfEmFE' },
    { text: 'Precio', value: 'gPrecios' },
    { text: 'ITBMS', value: 'gITBMSItem.dValITBMS' },
    { text: 'ISC', value: 'gISCItem.dValISC' },
    { text: '', value: 'actions', sortable: false },
  ];
  editedIndex = -1;
  editModel = new Item();
  defaultItem = new Item();
  fabMenu = false;
  expireMenu = false;
  fechaFab = new Date().toISOString().substr(0, 10);
  fechaExpire = new Date().toISOString().substr(0, 10);

  formTitle = '';
  validations = {};

  createNewItem() {
    this.editModel = new Item();
    this.defaultItem = new Item();
  }
  async validate(key) {
    this.validations = {};
    let resp = await validate(this.editModel);
    resp.map((i) => {
      this.validations = {
        [i.property]: i,
        ...this.validations,
      };
    });
  }
  editItem(item) {
    this.editedIndex = this.items.indexOf(item);
    this.editModel = Object.assign({}, item);
    this.dialog = true;
    this.change();
  }

  deleteItem(item) {
    const index = this.items.indexOf(item);
    confirm('Are you sure you want to delete this item?') &&
      this.items.splice(index, 1);
    this.change();
  }

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editModel = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.items[this.editedIndex], this.editModel);
    } else {
      this.items.push({ ...this.editModel });
    }
    this.change();
    this.close();
  }
  change() {
    this.$emit(
      'update:itemindex',
      this.items.map((i) => {
        i.dFechaFab = moment(this.fechaFab).toDate();
        i.dFechaCad = moment(this.fechaExpire).toDate();
        return { ...i };
      })
    );
  }

  created() {
    this.template = this.$props.template;
    //    this.model = this.$props.item;
  }
}
</script>
