<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-card class="mx-auto" tile>
      <v-toolbar color="blue-grey" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Cartera Digital</v-toolbar-title>


        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-wallet-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { TypedRFE, Totales, DGen, Emisor, Receptor } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class WalletComponent extends Vue {
  show(e) {
    this.open = false;
    setTimeout(() => {
      this.open = true;
    }, 100);
  }
  loading = false;
  x;
  y;
  open = false;
  item = 1;
  items = [
    {
      action: 'mdi-wallet',
      title: 'Firma Calificada de la oficina',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma de prueba',
      active: true,
      items: [
        { title: 'Algoritmo: RSA' },
        { title: '2048 bits' },
        { title: 'No exportable' },
      ],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma calificada uso personal',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma no calificada - blockchain',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma para factura electronica',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma para aprobaciones en grupo',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'mdi-wallet',
      title: 'Firma para votaciones de junta directiva',
      items: [{ title: 'List Item' }],
    },
  ];
  handleUpdate(item) {
    //   this.model = { ...item };
  }
}
</script>
