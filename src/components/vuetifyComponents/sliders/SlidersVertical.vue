<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersVertical -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can use <code>vertical</code> to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-slider
                v-model="value"
                vertical
                label="Regular"
            ></v-slider>
            <v-range-slider
                v-model="value2"
                vertical
                label="Range"
            ></v-range-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersVertical",

  data: () => ({
        value: 10,
        value2: [20, 40],
  })
};
</script>