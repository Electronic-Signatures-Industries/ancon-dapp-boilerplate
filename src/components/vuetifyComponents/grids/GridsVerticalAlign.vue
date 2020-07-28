<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsVerticalAlign -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Change the vertical alignment of flex items and their parents using the <span class="grey--text text--darken-4 font-weight-bold">align</span> and <span class="grey--text text--darken-4 font-weight-bold">align-self</span> properties.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container
                v-for="align in alignments"
                :key="align"
                class="grey lighten-5 mb-6"
                >
                <v-row
                    :align="align"
                    no-gutters
                    style="height: 150px;"
                >
                    <v-col
                    v-for="n in 3"
                    :key="n"
                    >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        One of three columns
                    </v-card>
                    </v-col>
                </v-row>
                </v-container>

                <v-container class="grey lighten-5">
                <v-row
                    no-gutters
                    style="height: 150px;"
                >
                    <v-col
                    v-for="align in alignments"
                    :key="align"
                    :align-self="align"
                    >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        One of three columns
                    </v-card>
                    </v-col>
                </v-row>
                </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsVerticalAlign",

  data: () => ({
      alignments: [
        'start',
        'center',
        'end',
      ],
  })
};
</script>