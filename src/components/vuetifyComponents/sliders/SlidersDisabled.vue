<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersDisabled -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You cannot interact with <code>disabled</code> sliders.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-slider
            disabled
            label="Disabled"
            value="30"
            ></v-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersDisabled",

  data: () => ({
      
  })
};
</script>