<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsAutosizeColumns -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Columns will automatically take up an equal amount of space within their parent container. This can be modified using the cols prop. You can also utilize the sm, md, lg, and xl props to further define how the column will be sized in different viewport sizes.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                v-for="n in 2"
                :key="n"
                :class="n === 1 ? 'mb-6' : ''"
                no-gutters
                >
                <v-col
                    v-for="k in n + 1"
                    :key="k"
                >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    {{ k }} of {{ n + 1 }}
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsAutosizeColumns",

  data: () => ({
  })
};
</script>