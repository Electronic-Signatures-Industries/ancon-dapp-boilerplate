<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-break-point="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
    v-bar
  >
    <!-- <v-list-item two-line class="profile-bg">
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/men/81.jpg" />
      </v-list-item-avatar>

      <v-list-item-content class="white--text">
        <v-list-item-title>Dohnathan Deo</v-list-item-title>
        <v-list-item-subtitle class="caption white--text">Webdesigner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item> -->

    <v-list expand nav class="mt-1">
      <template v-for="(item, i) in items">
        <!---If Sidebar Caption -->
        <v-row v-if="item.header" :key="item.header" align="center">
          <v-col cols="12">
            <v-subheader v-if="item.header" class="d-block text-truncate">{{ item.header }}</v-subheader>
          </v-col>
        </v-row>
        <!---If Sidebar Caption -->
        <BaseItemGroup v-else-if="item.children" :key="`group-${i}`" :item="item"></BaseItemGroup>

        <BaseItem v-else :key="`item-${i}`" :item="item" />
      </template>
      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarItems from "./SidebarItems";
export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: SidebarItems
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      }
    }
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {}
};
</script>
<style lang="scss">
#main-sidebar{
  box-shadow:1px 0 20px rgba(0,0,0,.08);
  -webkit-box-shadow:1px 0 20px rgba(0,0,0,.08);
  .v-navigation-drawer__border{
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item{
      &__icon--text,
      &__icon:first-child{
        justify-content: center;
        text-align: center;
        width: 20px;
        
      }
  }
  .profile-bg{
    background:url('../../../assets/images/user-info.jpg') no-repeat;
    .v-avatar{
      padding:45px 0;
    }
  }
  

}
</style>