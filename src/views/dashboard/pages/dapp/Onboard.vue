<template>
  <v-container fluid>
    <v-alert prominent type="error">
      <v-row align="center">
        <v-col
          ><h3>
            Para acceder a Mensajeria de Documentos Verificables, instale Metamask.
          </h3></v-col
        >
      </v-row>
    </v-alert>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Onboard",
  components: {}
})
export default class DashboardCoreView extends Vue {

  mounted() {}
}
</script>
