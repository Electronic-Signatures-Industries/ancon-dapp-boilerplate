<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- RatingColors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-rating</code> component can be colored as you want, you can set both selected and not selected colors.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-rating
            v-model="rating"
            background-color="info lighten-3"
            color="info"
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="success lighten-3"
            color="success"
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="warning lighten-3"
            color="warning"
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="error lighten-3"
            color="error"
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="indigo lighten-3"
            color="indigo"
            ></v-rating>
        </div>
    </div>
</template>

<script>
export default {
  name: "RatingColors",

  data: () => ({
      rating: 4,
  })
};
</script>