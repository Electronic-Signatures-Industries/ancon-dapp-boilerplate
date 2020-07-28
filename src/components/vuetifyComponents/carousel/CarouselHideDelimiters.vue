<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Hide delimiters -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can hide the bottom controls with <code>hide-delimiters</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-carousel hide-delimiters>
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
  name: "CarouselHideDelimiters",

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