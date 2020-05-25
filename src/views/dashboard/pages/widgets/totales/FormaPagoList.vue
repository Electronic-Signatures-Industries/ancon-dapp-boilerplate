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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Agregar forma de pago</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <fe-total-forma-pago
                  v-bind:formapago.sync="editModel.gFormaPago"
                  label="Forma de Pago"
                  :error="!!validations.gFormaPago"
                  @change="validate"
                ></fe-total-forma-pago>
              </v-container>
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
  OtrosImpuestos,
  CodigoRetencion,
  FormaPago,
  FormaPagoType,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import TotalFormaPago from './FormaPago.vue';
import { validate } from 'class-validator';

@Component({
  name: 'fe-total-forma-pago-list',
  props: ['formapagoitems'],
  components: {
    'fe-total-forma-pago': TotalFormaPago,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo' : 'Editar';
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
})
export default class TotalFormaPagoList extends Vue {
  items: any[] = [];

  dialog = false;
  headers = [
    { text: 'Forma de Pago', value: 'gFormaPago.iFormaPago' },
    { text: 'Valor Cuota', value: 'gFormaPago.dVlrCuota' },
    { text: 'Descripcion', value: 'gFormaPago.dFormaPagoDesc' },
    { text: '', value: 'actions', sortable: false },
  ];
  editedIndex = -1;
  editModel = new FormaPagoType();
  defaultItem = new FormaPagoType();

  validations = {};

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
      this.items.push(this.editModel);
    }
    this.change();
    this.close();
  }
  change() {
    this.$emit(
      'update:formapagoitems',
      this.items.map((i) => ({ ...i.gFormaPago }))
    );
  }
  created() {
    this.items = this.$props.formapagoitems || [];
  }
}
</script>
