<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsNoGutters -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can remove the negative margins from <code>v-row</code> and the padding from its direct <code>v-col</code> children using the no-gutters property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row no-gutters>
                <v-col
                    cols="12"
                    sm="6"
                    md="8"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-12 .col-sm-6 .col-md-8
                    </v-card>
                </v-col>
                <v-col
                    cols="6"
                    md="4"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-6 .col-md-4
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsNoGutters",

  data: () => ({
  })
};
</script>