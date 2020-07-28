<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SheetelEvation -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Sheets can accept a custom elevation between 0 and 24 (0 is default).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-col
                    v-for="elevation in elevations"
                    :key="elevation"
                    cols="12"
                    md="4"
                >
                    <v-sheet
                    class="pa-12"
                    color="grey lighten-3"
                    >
                    <v-sheet
                        :elevation="elevation"
                        class="mx-auto"
                        height="100"
                        width="100"
                    ></v-sheet>
                    </v-sheet>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SheetelEvation",

  data: () => ({
      elevations: [6, 12, 18],
  })
};
</script>