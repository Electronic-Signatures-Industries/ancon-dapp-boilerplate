<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Prominent toolbars -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
                Prominent toolbars increase the <code>v-toolbar</code>'s height to 128px and positions the <code>v-toolbar-title</code> towards the bottom of the container. This is expanded upon in v-app with the ability to shrink a <span class="grey--text text--darken-4 font-weight-bold">prominent</span> toolbar to a <span class="grey--text text--darken-4 font-weight-bold">dense</span> or <span class="grey--text text--darken-4 font-weight-bold">short</span> one.
                </v-list-item-subtitle>
                <div class="mt-4">
                    <v-card
                        color="grey lighten-4"
                        flat
                        height="200px"
                        tile
                    >
                        <v-toolbar prominent extended>
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
  name: "ToolbarProminent",

  data: () => ({
  })
};
</script>