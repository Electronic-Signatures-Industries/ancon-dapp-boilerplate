<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsColumnWrapping -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           When more than 12 columns are placed within a given row (that is not using the <code>.flex-nowrap</code> utility class), each group of extra columns will wrap onto a new line.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row no-gutters>
                <v-col cols="9">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-9
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    .col-6<br>Subsequent columns continue along the new line.
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsColumnWrapping",

  data: () => ({
  })
};
</script>