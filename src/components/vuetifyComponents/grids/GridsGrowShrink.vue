<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GridsGrowShrink -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           By default, flex components will automatically fill the available space in a row or column. They will also shrink relative to the rest of the flex items in the flex container when a specific size is not designated. You can define the column width of the <code>v-col</code> by using the cols prop and providing a value from 1 to 12.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container class="grey lighten-5">
                <v-row
                class="mb-6"
                no-gutters
                >
                <v-col
                    v-for="n in 4"
                    :key="n"
                >
                    <v-card
                    class="pa-2"
                    tile
                    outlined
                    >
                    col
                    </v-card>
                </v-col>
                </v-row>

                <v-row no-gutters>
                <v-col
                    v-for="n in 2"
                    :key="n"
                    :cols="n === 1 ? 8 : 4"
                >
                    <v-card
                    class="pa-2"
                    tile
                    outlined
                    >
                    col-{{ n === 1 ? 8 : 4 }}
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "GridsGrowShrink",

  data: () => ({
  })
};
</script>