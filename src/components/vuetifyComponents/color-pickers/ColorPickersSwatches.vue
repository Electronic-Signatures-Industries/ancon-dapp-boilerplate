<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ColorPickersSwatches -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <code>show-swatches</code> prop you can display an array of color swatches that users can pick from. It is also possible to customize what colors are shown using the <code>swatches</code> prop. This prop accepts a two-dimensional array, where the first dimension defines a column, and second dimension defines the swatches from top to bottom by providing rgba hex strings. You can also set the max height of the swatches section with the <code>swatches-max-height</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-color-picker class="ma-2" show-swatches></v-color-picker>
                <v-color-picker class="ma-2" :swatches="swatches" show-swatches></v-color-picker>
                <v-color-picker class="ma-2" show-swatches swatches-max-height="300px"></v-color-picker>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ColorPickersSwatches",

  data: () => ({
    swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],
  })
};
</script>