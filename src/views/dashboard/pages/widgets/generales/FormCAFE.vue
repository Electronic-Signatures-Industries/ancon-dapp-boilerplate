<template>
  <v-autocomplete
    :items="items"
    item-text="key"
    item-value="value"
    label="Formulario CAFE"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import {
  TypedRFE,
  FormularioCafe,
} from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isNumber } from 'class-validator';

@Component({
  name: 'fe-generales-formcafe',
  props: ['formcafe'],
  watch: {
    formcafe: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class GenFormCAFE extends Vue {
  item: FormularioCafe = FormularioCafe.SinGeneracionCAFE;
  items = Object.entries(FormularioCafe)
    .filter((e) => !isNaN(e[1] as any))
    .map((e) => ({ key: e[0], value: e[1] }));

  change() {
    const v = Object.entries(FormularioCafe).find(
      (i) => i[1] === this.item
    );
    this.$emit('update:formcafe', this.item);
  }
}
</script>
