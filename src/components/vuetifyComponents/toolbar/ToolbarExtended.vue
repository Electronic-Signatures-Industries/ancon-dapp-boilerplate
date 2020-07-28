<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Extended -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Toolbars can be extended without using the <code>extension</code> slot.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                color="grey lighten-4"
                flat
                height="200px"
                tile
            >
                <v-toolbar extended>
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
  name: "ToolbarExtended",

  data: () => ({
  })
};
</script>