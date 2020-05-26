<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row v-show="!open" no-gutters>
            <v-col cols="4">Generales</v-col>
            <v-col cols="4" class="text--secondary"> # {{ id }} </v-col>
            <v-col cols="2" class="text--secondary"> de {{ emisor }} </v-col>

            <v-col cols="2" class="text--secondary">
              para {{ receptor }}
            </v-col>
          </v-row>
          <v-row v-show="open" no-gutters>
            <v-col cols="4">Generales</v-col>
            <v-col cols="8" class="text--secondary"> </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-generales
            :template="template"
            v-bind:generales.sync="model.dGen"
          ></fe-generales>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row v-show="!open" no-gutters>
            <v-col cols="4">Articulos</v-col>
            <v-col cols="6" class="text--secondary">
              {{ model.gItem.length }} articulos
            </v-col>
            <v-col cols="2" class="text--secondary">
              B./ {{ totalItems }}
            </v-col>
          </v-row>
          <v-row v-show="open" no-gutters>
            <v-col cols="4">Articulos</v-col>
            <v-col cols="8" class="text--secondary"> </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-item
            :template="template"
            v-bind:itemindex.sync="model.gItem"
          ></fe-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row v-show="!open" no-gutters>
            <v-col cols="4">Totales</v-col>
            <v-col cols="6" class="text--secondary"> </v-col>
            <v-col cols="2" class="text--secondary"> B./ {{ totales }} </v-col>
          </v-row>
          <v-row v-show="open" no-gutters>
            <v-col cols="4">Totales</v-col>
            <v-col cols="8" class="text--secondary"> </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total
            :template="template"
            v-bind:totales.sync="model.gTot"
          ></fe-total>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script lang="ts">
import { TypedRFE, Totales, DGen } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TotalIndex from './widgets/totales/Totales.vue';
import Countries from './widgets/Countries.vue';
import ItemIndex from './widgets/lineitem/Item.vue';
import GeneralesIndex from './widgets/generales/Generales.vue';
@Component({
  components: {
    'fe-total': TotalIndex,
    'fe-item': ItemIndex,
    'fe-generales': GeneralesIndex,
  },
})
export default class TemplateEditor extends Vue {
  model: TypedRFE = new TypedRFE();
  openItems = false;
  open = false;
  get totalItems() {
    const n = this.model.gItem.reduce((prev, c) => {
      return c.gPrecios.dValTotItem;
    }, 0);
    return n.toFixed(2);
  }
  get totales() {
    const t = this.model.gTot.dVTot || 0;
    return t.toFixed(2);
  }
  get emisor() {
    const em = this.model.gDGen.gEmis;
    return (em || {}).dNombEm || 'Pendiente';
  }
  get receptor() {
    const receptor = this.model.gDGen.gDatRec;
    return (receptor || {}).dNombRec || 'Pendiente';
  }
  get id() {
    return this.model.dId || 'Pendiente';
  }

  loading = false;
  template = {
    gRetenc: {
      visible: false,
    },
    gPagPlazo: {
      visible: false,
    },
    dTotAcar: {
      visible: false,
    },
    dNroItems: {
      default: 1,
      visible: true,
    },
    dSecItem: {
      default: 1,
      visible: true,
    },
    iPzPag: {
      visible: true,
    },
  };
  beforeMount() {
    this.model.gDGen = new DGen();
    this.model.gItem = [];
    this.model.gTot = new Totales();
    this.model.gTot.dNroItems = 1;
  }
}
</script>
