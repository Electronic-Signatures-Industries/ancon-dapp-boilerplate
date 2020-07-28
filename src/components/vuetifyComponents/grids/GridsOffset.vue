<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsOffset -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Offsets are useful for compensating for elements that may not be visible yet, or to control the position of content. Just as with breakpoints, you can set an offset for any available sizes. This allows you to fine tune your application layout precisely to your needs.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                class="mb-6"
                no-gutters
                >
                <v-col md="4">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-md-4
                    </v-card>
                </v-col>
                <v-col
                    md="4"
                    offset-md="4"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-md-4 .offset-md-4
                    </v-card>
                </v-col>
                </v-row>
                <v-row
                class="mb-6"
                no-gutters
                >
                <v-col
                    md="3"
                    offset-md="3"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-md-3 .offset-md-3
                    </v-card>
                </v-col>
                <v-col
                    md="3"
                    offset-md="3"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-md-3 .offset-md-3
                    </v-card>
                </v-col>
                </v-row>
                <v-row no-gutters>
                <v-col
                    md="6"
                    offset-md="3"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-md-6 .offset-md-3
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsOffset",

  data: () => ({
  })
};
</script>