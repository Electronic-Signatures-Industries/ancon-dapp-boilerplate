<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ParallaxCustomHeight -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-parallax
                height="300"
                src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
            ></v-parallax>
        </div>
    </div>
</template>

<script>
export default {
  name: "ParallexCustomHeight",

  data: () => ({
  })
};
</script>