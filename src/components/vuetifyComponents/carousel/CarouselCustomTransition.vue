<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Custom Transition -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-carousel-item</code> component can have its <span class="grey--text text--darken-4 font-weight-bold">transition/reverse-transition</span> changed.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-carousel>
                <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
        </div>
    </div>
</template>

<script>
export default {
  name: "CarouselCustomTransition",

  data: () => ({
    items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
  })
};
</script>