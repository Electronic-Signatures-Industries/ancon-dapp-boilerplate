<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- RatingSlots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Slots are provided to give you even more freedom in how you display the rating.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-rating v-model="rating">
                <template v-slot:item="props">
                    <v-icon
                    :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"
                    large
                    @click="props.click"
                    >
                    {{ props.isFilled ? 'mdi-star-circle' : 'mdi-circle-outline' }}
                    </v-icon>
                </template>
            </v-rating>
        </div>
    </div>
</template>

<script>
export default {
  name: "RatingSlots",

  data: () => ({
      colors: ['info', 'success', 'warning', 'indigo', 'error'],
      rating: 4.5,
  }),
  methods: {
      genColor (i) {
        return this.colors[i]
      },
    },
};
</script>