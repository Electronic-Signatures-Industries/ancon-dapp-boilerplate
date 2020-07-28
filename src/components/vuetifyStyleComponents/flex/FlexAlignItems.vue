<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FlexAlignItems -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Mixing <code>flex-direction: column</code> and <code>align-items</code>, you can utilize <code>.mt-auto</code> and <code>.mb-auto</code> helper classes to adjust flex item positioning.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
            class="d-flex align-start flex-column mb-6"
            color="grey lighten-2"
            flat
            tile
            height="200"
            >
            <v-card
                v-for="n in 3"
                :key="n"
                :class="n === 1 && 'mb-auto'"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
            <v-card
            class="d-flex align-end flex-column"
            color="grey lighten-2"
            flat
            tile
            height="200"
            >
            <v-card
                v-for="n in 3"
                :key="n"
                :class="n === 3 && 'mt-auto'"
                class="pa-2"
                outlined
                tile
            >
                Flex item
            </v-card>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "FlexAlignItems",

  data: () => ({
  })
};
</script>