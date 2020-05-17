<template>
  <div>
    <v-toolbar dense>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-btn icon @click="show">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

        <v-menu v-model="open" open-on-hover top offset-y>
        <v-list>
          <v-list-item v-for="i in items" :key="i.title" @click="goTo(i.href)">
            <v-list-item-title>{{ i.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title class="headline">MDV Workflow and Identity Hub</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn
        :to="{
          name: 'MDV Workflow Editor',
        }"
        icon
      >
        <v-icon>mdi-sitemap</v-icon>
      </v-btn>

      <v-btn
        :to="{
          name: 'Template Deployment',
        }"
        icon
      >
        <v-icon>mdi-rocket</v-icon>
      </v-btn>
      <v-btn
        :to="{
          name: 'Sitios Web Durables',
        }"
        icon
      >
        <v-icon>mdi-server</v-icon>
      </v-btn>
      <v-btn
        :to="{
          name: 'Admin',
        }"
        icon
      >
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>


      <v-btn
        href="https://github.com/molekilla/mdv-contracts"
        target="blank"
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>

      
    </v-toolbar>

    <v-dialog v-model="profileDialog" max-width="690">
      <v-card>
        <v-card-title class="headline">Perfil</v-card-title>

        <v-card-text>
          <v-text-field
            disabled
            v-model="address"
            label="Direccion"
          ></v-text-field>
          <v-text-field v-model="name" label="Nombre"></v-text-field>
          <v-text-field v-model="lastname" label="Apellido"></v-text-field>
          <v-text-field v-model="email" label="Correo"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="setProfile()">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { SolidoSingleton } from './SolidoSingleton';

// Components
import { VHover, VListItem } from 'vuetify/lib';
import Vue from 'vue';

// Utilities
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'DashboardCoreAppBar',

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },



  data: () => ({
    items: [{
      title: 'MDV Documentacion',
      href: 'https://mdv.auth2factor.com',
    }, {
      title: 'DV Digito Verificador Smart Contract',
      href: 'https://gist.github.com/molekilla/3ba0346077db4ec82c7a949eb746be82',
    }, {
      title: 'XDV',
      href: 'https://swarm-gateways.net/bzz:/d5b9063eea355591cf25f875cf93629b6b6a271020fd5b555ad73dd56346d698/#/',
    }],
    offchain: false,
    connected: false,
    lastname: '',
    name: '',
    email: '',
    address: '',
    contracts: null,
    solidoProps: null,
    profileDialog: false,
    open: false,
  }),

  mounted: async function() {
    const props = await SolidoSingleton.getProps();

    if (props.offchain) return;
    let self = this;

    // const user = (await props.storage.getUserModel()) || {};
    // self.email = user.email || '';
    // self.lastname = user.lastname || '';
    // self.name = user.name || '';
    // self.address = user.address || '';
    // self.connected = true || '';
  },
  computed: {
    ...mapState(['drawer']),
  },
  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
    goTo: function(href) {
      location.href = href;
    },
    show: function(e) {
      this.open = false;
      this.x = e.clientX;
      this.y = e.clientY;
      setTimeout(() => {
        this.open = true;
      }, 100);
    },
    async setProfile() {
      const props = await SolidoSingleton.getProps();

      const contracts = props.ethereum.contracts;
      this.solidoProps = props;
      let profile;

      try {
        if (this.profileDialog) {
          this.loading = true;
          const { address, email, name, lastname } = this;
          if (name.length > 0) {
            await props.storage.setUserModel({
              address,
              email,
              name,
              lastname,
            });
          }
          this.profileDialog = false;
        } else {
          const {
            address,
            email,
            name,
            lastname,
          } = await props.storage.getUserModel();
          this.nombre = name;
          this.apellido = lastname;
          this.email = email;

          this.address = contracts.Documents.defaultAccount;
          this.profileDialog = true;
        }
      } catch (e) {
        // alert(e.toString());
      }
    },
  },
};
</script>
