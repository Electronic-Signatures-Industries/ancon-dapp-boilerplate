<template>
  <v-row
    ><v-col cols="6">
      <v-autocomplete
        :items="items"
        item-text="key"
        item-value="value"
        label="Tasa ITBMS"
        v-model="item.dTasaITBMS"
        v-on:change="change"
      ></v-autocomplete>
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="item.dValITBMS"
        label="Valor"
        v-on:change="change"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { TypedRFE,  TasaITBMS, ITBMS } from 'ifesa-dgi-factura-electronica';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'fe-item-itbms',
  props: ['itbms'],
  watch: {
    itbms: function(current, old) {
      if (current) {
        this.item = { ...current };
      }
    },
  },
})
export default class ItemITBMS extends Vue {
  item: ITBMS = new ITBMS();
  items = Object.entries(TasaITBMS).map((e) => ({ key: e[0], value: e[1] }));

  change() {
    this.$emit('update:itbms', { ...this.item });
  }
}
</script>
