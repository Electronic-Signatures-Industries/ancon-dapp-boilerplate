<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Lateral screens -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When changing the default action of your button, it is recommended that you display a transition to signify a change. We do this by binding the <code>key</code> prop to a piece of data that can properly signal a change in action to the Vue transition system. While you can use a custom transition for this, ensure that you set the <code>mode</code> prop to <span class="grey--text text--darken-4 font-weight-bold">out-in</span>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card id="lateral">
                <v-toolbar
                dark
                tabs
                flat
                color="success"
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>Page title</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <template v-slot:extension>
                    <v-tabs
                    v-model="tabs"
                    align-with-title
                    >
                    <v-tab href="#one">Item One</v-tab>
                    <v-tab href="#two">Item Two</v-tab>
                    <v-tab href="#three">Item Three</v-tab>
                    <v-tabs-slider color="info"></v-tabs-slider>
                    </v-tabs>
                </template>
                </v-toolbar>
                <v-card-text>
                <v-tabs-items v-model="tabs">
                    <v-tab-item
                    v-for="content in ['one', 'two', 'three']"
                    :key="content"
                    :value="content"
                    >
                    <v-card
                        height="200px"
                        flat
                    >
                    </v-card>
                    </v-tab-item>
                </v-tabs-items>
                </v-card-text>
                <v-fab-transition>
                <v-btn
                    :key="activeFab.icon"
                    :color="activeFab.color"
                    fab
                    large
                    dark
                    bottom
                    left
                    class="v-btn--example"
                >
                    <v-icon>{{ activeFab.icon }}</v-icon>
                </v-btn>
                </v-fab-transition>
            </v-card>
        </div>
    </div>
</template>

<style>
  #lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
</style>

<script>
export default {
  name: "FabLateralScreen",

  data: () => ({
      fab: false,
      hidden: false,
      tabs: null,
  }),
  computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { color: 'success', icon: 'mdi-share-variant' }
          case 'two': return { color: 'error', icon: 'mdi-lead-pencil' }
          case 'three': return { color: 'info', icon: 'mdi-chevron-up' }
          default: return {}
        }
      },
    },
};
</script>