<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Floating with search -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        A floating toolbar is turned into an inline element that only takes up as much space as needed. This is particularly useful when placing toolbars over content.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="pa-4"
                flat
                height="300px"
                img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
            >
                <v-toolbar
                dense
                floating
                >
                <v-text-field
                    hide-details
                    prepend-icon="mdi-magnify"
                    single-line
                ></v-text-field>

                <v-btn icon>
                    <v-icon>mdi-crosshairs-gps</v-icon>
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
  name: "ToolbarFloatingSearch",

  data: () => ({
  })
};
</script>