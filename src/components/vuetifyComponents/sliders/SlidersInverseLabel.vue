<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersInverseLabel -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>v-slider</code> with <code>inverse-label</code> property displays label at the end of it.    
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-slider
            inverse-label
            label="Inverse label"
            value="30"
            ></v-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersInverseLabel",

  data: () => ({
  })
};
</script>