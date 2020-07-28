<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersMinMax -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can set <code>min</code> and <code>max</code> values of sliders.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-subheader>Min and max default slider</v-subheader>
            <v-card-text>
            <v-row>
                <v-col class="pr-4">
                <v-slider
                    v-model="slider"
                    class="align-center"
                    :max="max"
                    :min="min"
                    hide-details
                >
                    <template v-slot:append>
                    <v-text-field
                        v-model="slider"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                    ></v-text-field>
                    </template>
                </v-slider>
                </v-col>
            </v-row>
            </v-card-text>

            <v-subheader>Min and max range slider</v-subheader>

            <v-card-text>
            <v-row>
                <v-col class="px-4">
                <v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    hide-details
                    class="align-center"
                >
                    <template v-slot:prepend>
                    <v-text-field
                        :value="range[0]"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                        @change="$set(range, 0, $event)"
                    ></v-text-field>
                    </template>
                    <template v-slot:append>
                    <v-text-field
                        :value="range[1]"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                        @change="$set(range, 1, $event)"
                    ></v-text-field>
                    </template>
                </v-range-slider>
                </v-col>
            </v-row>
            </v-card-text>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersMinMax",

  data: () => ({
      min: -50,
        max: 90,
        slider: 40,
        range: [-20, 70],
  })
};
</script>