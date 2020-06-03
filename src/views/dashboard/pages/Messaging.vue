<template>
  <v-container>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="teal"
    ></v-progress-linear>
    <v-card  class="mx-auto">
      <v-toolbar color="deep-purple accent-4" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Mensajeria</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-file-send</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list subheader>
        <v-subheader>Document compartidos recientes</v-subheader>

        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'"
              >mdi-message-text</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>Sesiones anteriores</v-subheader>

        <v-list-item v-for="item in items2" :key="item.title" >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { TypedRFE, Totales, DGen, Emisor, Receptor } from 'xdvplatform-tools';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class MessagingComponent extends Vue {
  loading = false;

  items = [
    {
      active: true,
      title: 'Jason Oner',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    },
    {
      active: true,
      title: 'Ranee Carlson',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    },
    {
      title: 'Cindy Baker',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    },
    {
      title: 'Ali Connors',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    },
  ];
  items2 = [
    {
      title: 'Travis Howard',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    },
  ];

  handleUpdate(item) {
    //   this.model = { ...item };
  }
}
</script>
