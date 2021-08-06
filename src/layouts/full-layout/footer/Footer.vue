<template>
  <v-footer app class="footerpart" inset>
    <v-row justify="space-between">
      <v-col md="6">
        <span
          >© Industrias de Firmas Electronicas SA,
          {{ new Date().getFullYear() }} <br />
          XDV v3.0 Made with
          <v-icon small color="red"> mdi-heart </v-icon> in Panama
        </span>
      </v-col>
      <v-col md="6" align="right">
        <v-btn href="mailto:info@ifesa.tech" text offset="10"
          > Inquiry business solutions</v-btn
        >
        <v-btn href="mailto:info@ifesa.tech" text offset="10"
          > Support</v-btn
        >
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
