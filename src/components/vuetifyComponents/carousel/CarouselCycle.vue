<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Cycle -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        With the <span class="grey--text text--darken-4 font-weight-bold">cycle</span> prop you can have your slides automatically transition to the next available every 6s (default).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
            >
                <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
                >
                <v-sheet
                    :color="colors[i]"
                    height="100%"
                >
                    <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                    >
                    <div class="display-3">{{ slide }} Slide</div>
                    </v-row>
                </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </div>
    </div>
</template>

<script>
export default {
  name: "CarouselCycle",

  data: () => ({
      colors: [
          'info',
          'warning',
          'error',
          'success',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
  })
};
</script>