<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- RatingSizeVarient -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Utilize the same sizing classes available in <code>v-icon</code> or provide your own with the size prop.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-rating
            v-model="rating"
            background-color="info lighten-3"
            color="info"
            small
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="error lighten-3"
            color="error"
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="warning lighten-3"
            color="warning"
            medium
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="success lighten-3"
            color="success"
            large
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="info lighten-3"
            color="info"
            x-large
            ></v-rating>
            <v-rating
            v-model="rating"
            background-color="indigo lighten-3"
            color="indigo"
            size="64"
            ></v-rating>
        </div>
    </div>
</template>

<script>
export default {
  name: "RatingSizeVarient",

  data: () => ({
      rating: 4,
  })
};
</script>