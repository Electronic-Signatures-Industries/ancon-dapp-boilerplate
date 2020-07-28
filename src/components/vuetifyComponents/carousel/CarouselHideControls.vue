<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Hide controls -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can hide the carousel navigation controls with <code>:show-arrows="false"</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-carousel :show-arrows="false">
                <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                ></v-carousel-item>
            </v-carousel>
        </div>
    </div>
</template>

<script>
export default {
  name: "CarouselHideControls",

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