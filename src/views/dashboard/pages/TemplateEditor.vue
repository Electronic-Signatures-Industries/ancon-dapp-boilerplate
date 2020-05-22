<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Generales</v-expansion-panel-header>
        <v-expansion-panel-content> </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Items</v-expansion-panel-header>
        <v-expansion-panel-content> </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Totales</v-expansion-panel-header>
        <v-expansion-panel-content>
          <fe-total :template="template" v-bind:totales.sync="model"></fe-total>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script lang="ts">
import { TypedRFE, Totales } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TotalIndex from './widgets/totales/Totales.vue';
import Countries from './widgets/Countries.vue';
@Component({
  components: {
    'fe-total': TotalIndex,
  },
})
export default class TemplateEditor extends Vue {
  model: Totales = new Totales();
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
  };
  beforeMount() {
    this.model.dNroItems = 1;
  }
}
</script>
