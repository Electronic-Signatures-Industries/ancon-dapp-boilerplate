<template>
  <v-autocomplete
    :items="items"
    dense
    item-text="key"
    item-value="value"
    label="Unidades"
    v-model="item"
    v-on:change="change"
  ></v-autocomplete>
</template>
<script lang="ts">
import { TypedRFE, TypedRFESchema, Unidades } from '@xdvplatform/fe-builder';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'fe-unidades',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: String
    }
})
export default class Units extends Vue {
  item = '';
  items = Object.entries(Unidades).map(([v, k]) => ({ key: v, value: k }));

  change() {
      this.$emit('change', this.item)
  }
}
</script>
