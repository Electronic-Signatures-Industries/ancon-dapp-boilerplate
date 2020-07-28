<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Dense toolbars -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Dense toolbars reduce their height to 48px. When using in conjunction with the <span class="grey--text text--darken-4 font-weight-bold">prominent</span> prop, will reduce height to 96px.
        </v-list-item-subtitle>
        <div class="mt-12">
                <v-card
                    color="grey lighten-4"
                    flat
                    height="200px"
                    tile
                >
                    <v-toolbar dense>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Title</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    </v-toolbar>
                </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "ToolbarDence",

  data: () => ({
  })
};
</script>