<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersReadonly -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You cannot interact with readonly sliders, but they look as ordinary ones.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-slider
            readonly
            label="Readonly"
            value="30"
            ></v-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersReadonly",

  data: () => ({
  })
};
</script>