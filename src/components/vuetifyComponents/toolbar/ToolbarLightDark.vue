<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Light and Dark -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Toolbars come in <span class="grey--text text--darken-4 font-weight-bold">2</span> variants, light and dark. Light toolbars have dark tinted buttons and dark text whereas dark toolbars have white tinted buttons and white text.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card flat>
                <v-container fluid>
                <v-row class="child-flex">
                    <div>
                    <v-toolbar>
                        <v-btn icon class="hidden-xs-only">
                        <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>

                        <v-toolbar-title>Title</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon class="hidden-xs-only">
                        <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                    </div>

                    <div style="flex-basis: 20%">
                    <v-toolbar dark>
                        <v-spacer></v-spacer>

                        <v-btn icon>
                        <v-icon>mdi-reply</v-icon>
                        </v-btn>

                        <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-toolbar>
                    </div>
                </v-row>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "ToolbarLightDark",

  data: () => ({
  })
};
</script>