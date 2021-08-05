<template>
  <v-footer app class="footerpart" inset>
    <v-col cols="12">
      <v-btn href="mailto:info@ifesa.tech" text offset="10">Inquiry business solutions</v-btn>
      <br/>
      <br/>
      <span
        >© Industrias de Firmas Electronicas SA,
        {{ new Date().getFullYear() }} <br/> https://ifesa.tech/ - XDV v3.0 
        Made with <v-icon small color="red"> mdi-heart </v-icon> in Panama
      </span>
    </v-col>
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