<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsOffsetBreakpoint -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Offset can also be applied on a per breakpoint basis.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                class="mb-6"
                no-gutters
                >
                <v-col
                    sm="5"
                    md="6"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-sm-5 .col-md-6
                    </v-card>
                </v-col>
                <v-col
                    sm="5"
                    offset-sm="2"
                    md="6"
                    offset-md="0"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0
                    </v-card>
                </v-col>
                </v-row>
                <v-row no-gutters>
                <v-col
                    sm="6"
                    md="5"
                    lg="6"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-sm-6 .col-md-5 .col-lg-6
                    </v-card>
                </v-col>
                <v-col
                    sm="6"
                    md="5"
                    offset-md="2"
                    lg="6"
                    offset-lg="0"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsOffsetBreakpoint",

  data: () => ({
  })
};
</script>