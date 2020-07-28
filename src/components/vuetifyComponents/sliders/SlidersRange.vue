<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersRange -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Range sliders.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-subheader>Default range slider</v-subheader>
            <v-card-text>
            <v-range-slider
                v-model="value1"
            ></v-range-slider>
            </v-card-text>

            <v-subheader>Disabled range slider</v-subheader>
            <v-card-text>
            <v-range-slider
                v-model="value2"
                disabled
            ></v-range-slider>
            </v-card-text>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersRange",

  data: () => ({
      value1: [30, 60],
        value2: [30, 60],
  })
};
</script>