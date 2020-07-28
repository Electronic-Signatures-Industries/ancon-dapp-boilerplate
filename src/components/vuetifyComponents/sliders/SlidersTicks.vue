<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersTicks -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Tick marks represent predetermined values to which the user can move the slider.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-subheader>Show ticks when using slider</v-subheader>

            <v-card-text>
            <v-slider
                v-model="value"
                step="10"
                ticks
            ></v-slider>
            </v-card-text>

            <v-subheader>Always show ticks</v-subheader>

            <v-card-text>
            <v-slider
                v-model="value"
                step="10"
                ticks="always"
            ></v-slider>
            </v-card-text>

            <v-subheader>Tick size</v-subheader>

            <v-card-text>
            <v-slider
                v-model="value"
                step="10"
                ticks="always"
                tick-size="4"
            ></v-slider>
            </v-card-text>

            <v-subheader>Tick labels</v-subheader>

            <v-card-text>
            <v-slider
                v-model="fruits"
                :tick-labels="ticksLabels"
                :max="3"
                step="1"
                ticks="always"
                tick-size="4"
            ></v-slider>
            </v-card-text>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersTicks",

  data: () => ({
      value: 0,
        fruits: 0,
        ticksLabels: [
          'Figs',
          'Lemon',
          'Pear',
          'Apple',
        ],
  })
};
</script>