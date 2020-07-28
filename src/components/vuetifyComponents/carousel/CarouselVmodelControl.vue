<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Vmodel Controls -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can control carousel with model.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-icon @click="model--">mdi-minus</v-icon>
                {{ model }}
                <v-icon @click="model++">mdi-plus</v-icon>
                </v-row>
                <v-carousel v-model="model">
                <v-carousel-item
                    v-for="(color, i) in colors"
                    :key="color"
                >
                    <v-sheet
                    :color="color"
                    height="100%"
                    tile
                    >
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <div class="display-3">Slide {{ i + 1 }}</div>
                    </v-row>
                    </v-sheet>
                </v-carousel-item>
                </v-carousel>
        </div>
    </div>
</template>

<script>
export default {
  name: "CarouselVmodelControl",

  data: () => ({
      colors: [
          'info',
          'warning',
          'error',
          'success',
          'deep-purple accent-4',
        ],
        model: 0,
  })
};
</script>