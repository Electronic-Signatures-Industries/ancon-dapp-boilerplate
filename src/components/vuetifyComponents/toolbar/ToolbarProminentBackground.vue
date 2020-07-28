<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Prominent w/ Background -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Toolbars can display a background as opposed to a solid color. This can be modified by using the <span class="grey--text text--darken-4 font-weight-bold">img</span> slot and providing your own v-img component. Backgrounds can be faded using a v-app-bar.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-toolbar
                dark
                prominent
                src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Vuetify</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-export</v-icon>
                </v-btn>
            </v-toolbar>
        </div>
    </div>
</template>

<script>
export default {
  name: "ToolbarProminentBackground",

  data: () => ({
  })
};
</script>