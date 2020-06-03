<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-card  class="mx-auto">
      <v-toolbar color="pink" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Documentos</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list two-line>
        <v-list-item-group v-model="selected" multiple active-class="primary">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.title">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.headline"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.action"
                  ></v-list-item-action-text>
                  <v-icon v-if="!active" color="grey lighten-1">
                    mdi-star
                  </v-icon>

                  <v-icon v-else color="yellow">
                    star
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { TypedRFE, Totales, DGen, Emisor, Receptor } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class DriveComponent extends Vue {
  loading = false;
  selected = [];
  items = [
    {
      action: 'Hace 15 min',
      headline: 'Certificado de salvoconducto',
      title: 'RUC 18-17-17 DV 25',
      subtitle:
        "Salvoconducto para empresa, creado falta firmar",
    },
    {
      action: '1 de Mayo de 2020',
      headline: 'Documento para solicitud de permiso de construccion',
      title: 'Empresas La Constructora',
      subtitle:
        "Documento firmado",
    },
    {
      action: '1 de Junio de 2020',
      headline: 'Gaceta Oficial',
      title: 'Uso de mascarillas',
      subtitle:
        "Almacenado para posterior firmado",
    },

  ];
}
</script>
