<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsHorizontalAlign -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Change the horizontal alignment of flex items and their parents using the <span class="grey--text text--darken-4 font-weight-bold">justify</span> and <span class="grey--text text--darken-4 font-weight-bold">justify-self</span> properties.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                v-for="j in justify"
                :key="j"
                :justify="j"
                >
                <v-col
                    v-for="k in 2"
                    :key="k"
                    md="4"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    One of two columns
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsHorizontalAlign",

  data: () => ({
      justify: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
      ],
  })
};
</script>