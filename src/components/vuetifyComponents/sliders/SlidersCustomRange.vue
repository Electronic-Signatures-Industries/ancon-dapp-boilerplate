<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersCustomRange -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Using the <code>tick-labels</code> prop along with slots, you can create a very customized solution.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-range-slider
                :tick-labels="seasons"
                :value="[0, 1]"
                min="0"
                max="3"
                ticks="always"
                tick-size="4"
            >
                <template v-slot:thumb-label="props">
                <v-icon dark>
                    {{ season(props.value) }}
                </v-icon>
                </template>
            </v-range-slider>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersCustomRange",

  data: () => ({
      seasons: [
        'Winter',
        'Spring',
        'Summer',
        'Fall',
      ],
      icons: [
        'mdi-snowflake',
        'mdi-leaf',
        'mdi-fire',
        'mdi-water',
      ],
  }),
  methods: {
      season (val) {
        return this.icons[val]
      },
    },
};
</script>