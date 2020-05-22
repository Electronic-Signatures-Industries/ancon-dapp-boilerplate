<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Paises"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema, Paises } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'fe-paises',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: String
    }
})
export default class Countries extends Vue {
  item = '';
  items = Object.entries(Paises).map(([v, k]) => ({ key: v, value: k }));

  change() {
      this.$emit('change', this.item)
  }
}
</script>
