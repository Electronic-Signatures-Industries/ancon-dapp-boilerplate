<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersCustomcolors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can set the colors of the slider using the props <code>color</code>, <code>track-color</code> and <code>thumb-color</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-slider
            v-model="ex1.val"
            :color="ex1.color"
            :label="ex1.label"
            ></v-slider>

            <v-slider
            v-model="ex2.val"
            :label="ex2.label"
            :track-color="ex2.color"
            ></v-slider>

            <v-slider
            v-model="ex3.val"
            :label="ex3.label"
            :thumb-color="ex3.color"
            thumb-label="always"
            ></v-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersCustomcolors",

  data: () => ({
      ex1: { label: 'color', val: 25, color: 'orange darken-3' },
        ex2: { label: 'track-color', val: 75, color: 'green lighten-1' },
        ex3: { label: 'thumb-color', val: 50, color: 'red' },
  })
};
</script>