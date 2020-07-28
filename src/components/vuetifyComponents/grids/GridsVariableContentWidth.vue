<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsVariableContentWidth -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Assigning breakpoint width for columns can be configured to resize based upon the nature width of their content.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                class="mb-6"
                justify="center"
                no-gutters
                >
                <v-col lg="2">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    1 of 3
                    </v-card>
                </v-col>
                <v-col md="auto">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    Variable width content
                    </v-card>
                </v-col>
                <v-col lg="2">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    3 of 3
                    </v-card>
                </v-col>
                </v-row>
                <v-row no-gutters>
                <v-col>
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    1 of 3
                    </v-card>
                </v-col>
                <v-col md="auto">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    Variable width content
                    </v-card>
                </v-col>
                <v-col lg="2">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    3 of 3
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsVariableContentWidth",

  data: () => ({
  })
};
</script>