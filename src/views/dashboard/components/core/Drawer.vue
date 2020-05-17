<template>
  
  
</template>

<script>
import { SolidoSingleton } from "./SolidoSingleton";

// Utilities
import { mapState } from "vuex";
import Vue from "vue";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    offchain: false,
    contracts: [],
    solidoProps: {},
    isAdmin: false,
    isRecipient: false,
    renderItems: [{
    }],
    items: [
      {
        show: [2],
        icon: "mdi-at",
        title: "Sitios Durables",
        to: "/durable_website"
      },
      
    ]
  }),

  mounted: async function() {
    const props = await SolidoSingleton.getProps();
    if (props && !props.offchain) {
      this.contracts = props.ethereum.contracts;
      await this.menuItems();
      //  this.$props.expandOnHover = true;
    } else {
      this.offchain = true;
      // this.$props.expandOnHover = false;
    }
  },
  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
    },

    profile() {
      return {
        avatar: true,
        title: this.$t("avatar")
      };
    }
  },

  methods: {
    menuItems: async function() {
      if (this.offchain) return;
      const address = this.contracts.Documents.defaultAccount;
      let res = [];

      try {
        this.isAdmin = await this.contracts.Documents.methods.isAdmin(address);
      } catch (e) {
        // not admin
        this.isAdmin = false;
      }

      try {
        this.isRecipient = await this.contracts.Documents.methods.isRecipient(
          address
        );
      } catch (e) {
        // not admin
        this.isRecipient = false;
      }
      if (this.isAdmin && this.isRecipient) {
        res = this.items.filter(
          i => i.show.indexOf(1) > -1 || i.show.indexOf(0) > -1
        );
      } else if (this.isAdmin) {
        res = this.items.filter(i => i.show.indexOf(0) > -1);
      } else if (this.isRecipient) {
        res = this.items.filter(
          i => i.show.indexOf(1) > -1 || i.show.indexOf(2) > -1
        );
      } else {
        res = this.items.filter(i => i.show.indexOf(2) > -1);
      }
      this.renderItems = res.map(this.mapItem);
    },
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: item.title // this.$t(item.title)
      };
    }
  }
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
