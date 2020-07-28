<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Extended Height -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The extension's height can be customized.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                color="grey lighten-4"
                flat
                height="200px"
                tile
            >
                <v-toolbar extended extension-height="100">
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
  name: "ToolbarExtendedHeight",

  data: () => ({
  })
};
</script>