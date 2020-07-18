<template>
    <v-main fluid>
      <router-view  />
      <dashboard-core-footer />
    </v-main>
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
  }
}
</script>
