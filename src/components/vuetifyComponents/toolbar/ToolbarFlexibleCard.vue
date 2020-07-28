<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Flexible toolbar and card toolbar -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        In this example we offset our card onto the extended content area of a toolbar using the <span class="grey--text text--darken-4 font-weight-bold">extended</span> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card flat>
                <v-toolbar
                color="primary"
                dark
                extended
                flat
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                </v-toolbar>

                <v-card
                class="mx-auto"
                max-width="700"
                style="margin-top: -64px;"
                >
                <v-toolbar flat>
                    <v-toolbar-title class="grey--text">Title</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon>
                    <v-icon>mdi-apps</v-icon>
                    </v-btn>

                    <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-divider></v-divider>

                <v-card-text style="height: 200px;"></v-card-text>
                </v-card>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "ToolbarFlexibleCard",

  data: () => ({
  })
};
</script>