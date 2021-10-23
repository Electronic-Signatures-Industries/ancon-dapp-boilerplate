<template>
  <v-footer app class="footerpart pink" inset dark>
    <v-row justify="space-between">
      <v-col md="12">
        <span
          >© Industrias de Firmas Electronicas SA,
          {{ new Date().getFullYear() }} <br />
          Ancon Protocol. Made with
          <v-icon small color="red"> mdi-heart </v-icon> in Panama
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({}),
};
</script>
<style lang="scss">
.v-application .footerpart {
  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.theme--light.v-footer {
  background: white;
}
</style>
