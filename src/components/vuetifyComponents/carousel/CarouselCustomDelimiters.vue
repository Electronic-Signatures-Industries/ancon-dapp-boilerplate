<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Custom delimiters -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Use any available icon as your carousel's slide delimiter.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                elevation="24"
                max-width="444"
                class="mx-auto"
            >
                <v-system-bar lights-out></v-system-bar>
                <v-carousel
                :continuous="false"
                :cycle="cycle"
                :show-arrows="false"
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                height="300"
                >
                <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                >
                    <v-sheet
                    :color="colors[i]"
                    height="100%"
                    tile
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
                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                    <v-switch
                        v-model="cycle"
                        label="Cycle Slides"
                        inset
                    ></v-switch>
                    </v-list-item-action>
                </v-list-item>
                </v-list>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "CarouselCustomDelimiters",

  data: () => ({
      colors: [
          'info',
          'warning',
          'error',
          'success',
          'deep-purple accent-4',
        ],
        cycle: false,
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