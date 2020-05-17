<template>
  <div>
    <v-content v-if="!!solidoProps">
      <router-view />
      <dashboard-core-footer />
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SolidoSingleton } from "./SolidoSingleton";

@Component({
  name: "DashboardCoreView",
  components: {
    DashboardCoreFooter: () => import("./Footer.vue")
  }
})
export default class DashboardCoreView extends Vue {
  solidoProps = null;
  async mounted() {
    this.solidoProps = await SolidoSingleton.getProps();
  }
}
</script>
