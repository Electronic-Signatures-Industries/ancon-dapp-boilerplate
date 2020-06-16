<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Envio Contenedor FE"
    v-model="value"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, EnvioContenedorFE } from 'xdvplatform-wallet';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-enviocontenedor',
  // props: ['enviocontenedor'],
  // watch: {
  //   enviocontenedor: function(current, old) {
  //     if (current) {
  //       this.item = { ...current };
  //     }
  //   },
  // },
})
export default class GenEnvioContenedor  extends Vue {
  value: EnvioContenedorFE | any = -1;// EnvioContenedorFE.Normal;
  items = Object.entries(EnvioContenedorFE)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(EnvioContenedorFE).find((i) => i[1] === this.value);
    this.$emit('input', this.value);
  }
}
</script>
