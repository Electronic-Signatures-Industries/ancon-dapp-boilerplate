<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- RatingCustomLength -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Sometimes an application will call for a customized implementation. Easily change length or displayed icons.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-slider
            v-model="length"
            color="error"
            min="1"
            max="15"
            label="Custom length"
            ></v-slider>
            <v-rating
            v-model="rating"
            :length="length"
            color="error lighten-2"
            background-color="grey lighten-1"
            ></v-rating>
            <div>
            <span class="caption text-uppercase">model:</span>
            <span class="font-weight-bold">
                {{ rating }}
            </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "RatingCustomLength",

  data: () => ({
      length: 5,
      rating: 2,
  })
};
</script>