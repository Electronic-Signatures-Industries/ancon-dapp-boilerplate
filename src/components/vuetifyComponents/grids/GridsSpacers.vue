<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsSpacers -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>v-spacer</code> component is useful when you want to fill available space or make space between two components.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row>
                <v-col>
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col
                    </v-card>
                </v-col>

                <v-spacer></v-spacer>

                <v-col>
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col
                    </v-card>
                </v-col>
                </v-row>

                <v-row>
                <v-col
                    cols="auto"
                    lg="3"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-auto
                    </v-card>
                </v-col>

                <v-spacer></v-spacer>

                <v-col>
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col
                    </v-card>
                </v-col>

                <v-spacer></v-spacer>

                <v-col md="5">
                    <v-card
                    class="pa-2"
                    cols="auto"
                    outlined
                    tile
                    >
                    .col-md-5
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsSpacers",

  data: () => ({
  })
};
</script>