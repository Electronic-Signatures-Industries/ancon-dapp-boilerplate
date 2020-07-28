<template>
    <v-navigation-drawer v-model="Customizer_drawer" app  temporary :right="!$vuetify.rtl">
        
      <!---Theme Color -->
      <div class="px-4 py-4">
      <span>Theme</span>
      <v-switch v-model="$vuetify.theme.dark" class="mt-2"  hide-details primary  label="Dark" />
      </div>
      <v-divider></v-divider>
      <!---Theme Color -->
      <div class="px-4 py-4">
      <span>RTL</span>
      <v-switch v-model="$vuetify.rtl" class="mt-2"  hide-details  primary  label="Right to Left" />
      </div>
      <v-divider></v-divider>
      <!---Sidebar Type -->
      <div class="px-4 py-4">
      <span>Mini Sidebar</span>
      <v-switch  v-model="internalValue" hide-details class="mt-2" label="Mini variant" ></v-switch>
      </div>
      <v-divider></v-divider>
      <!---Theme color -->
      <div class="px-4 py-4">
      <span>Navbar & Theme Color</span>
      <v-item-group v-model="themecolor">
        <v-item
          v-for="tcolor in themecolors"
          :key="tcolor"
          :value="tcolor"
          class="mt-2"
        >
          <template v-slot="{ active, toggle }">
            <v-avatar
              :class="active && 'v-settings__item--active'"
              :color="tcolor"
              class="v-settings__item mr-2"
              size="25"
              
              @click="toggle"
            />
          </template>
        </v-item>
      </v-item-group>
      </div>
      <v-divider></v-divider>
      <!---Sidebar Color -->
      <div class="px-4 py-4">
      <span>Sidebar Colors</span>
      <v-item-group v-model="setSidebarColor">
          <v-item
          v-for="color in SidebarColors"
          :key="color"
          :value="color"
          class="mt-2"
          >
          <template v-slot="{ active, toggle}">
              <v-avatar
              :class="active && 'v-sidebar_active'"
              :color="color"
              class="v-settings__item mr-2"
              size="25"
              @click="toggle"
              />
          </template>
          </v-item>
      </v-item-group>
      </div>
      <!---End Sidebar Color -->
          
    </v-navigation-drawer>
</template>

<script>
import Proxyable from 'vuetify/lib/mixins/proxyable'
  export default {
    name: 'Customizer',
    mixins: [Proxyable],
    data: () => ({
      right: false,
      SidebarColor: '',
      SidebarColors: [
        'white',  
        '#2b2b2b',
        'rgb(44, 59, 164)',
        'rgb(96, 44, 164)',
        'rgb(151, 210, 219)',
        'rgb(77, 86, 100)' 
      ],
      themecolor: '#1e88e5',
      themecolors: [
          '#1e88e6',
          '#21c1d6',
          '#fc4b6c',
          '#563dea',
          '#9C27b0',
          '#ff9800',
      ],
    }),
    computed: {
        Customizer_drawer: {
            get () { return this.$store.state.Customizer_drawer },
            set (val) { this.$store.commit('SET_CUSTOMIZER_DRAWER', val) },
        },
        setSidebarColor: {
            get () { return this.$store.state.SidebarColor },
            set (val) { this.$store.commit('SET_SIDEBAR_COLOR', val) },
        }
    },
    watch: {
        themecolor (val) {
          this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = val,
          this.$vuetify.theme.themes[this.isLight ? 'light' : 'dark'].primary = val
        },
        setSidebarColor (val) {
        this.$store.commit('SET_SIDEBAR_COLOR', val)
      },
    },
     methods: {
         
     } 
  }
</script>

<style lang="scss">
   .v-application .v-item-group .v-sidebar_active {
        border:1px solid black !important;
    }
</style>