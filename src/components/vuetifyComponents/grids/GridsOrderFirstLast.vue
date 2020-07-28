<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsOrderFirstLast -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can also designate explicitly <span class="grey--text text--darken-4 font-weight-bold">first</span> or <span class="grey--text text--darken-4 font-weight-bold">last</span> which will assign <span class="grey--text text--darken-4 font-weight-bold">-1</span> or <span class="grey--text text--darken-4 font-weight-bold">13</span> values respectively to the <code>order</code> CSS property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row no-gutters>
                <v-col order="last">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    First, but last
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    Second, but unordered
                    </v-card>
                </v-col>
                <v-col order="first">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    Third, but first
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsOrderFirstLast",

  data: () => ({
  })
};
</script>