<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SparklineFill -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can create a <code>v-sparkline</code> with fill using the <code>fill</code> property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-sparkline
                :fill="fill"
                :gradient="gradient"
                :line-width="width"
                :padding="padding"
                :smooth="radius || false"
                :value="value"
                auto-draw
                ></v-sparkline>

                <v-divider></v-divider>

                <v-row class="pa-6">
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-row class="fill-height" align="center">
                    <v-item-group v-model="gradient" mandatory>
                        <v-row>
                        <v-item
                            v-for="(gradient, i) in gradients"
                            :key="i"
                            v-slot:default="{ active, toggle }"
                            :value="gradient"
                        >
                            <v-card
                            :style="{
                                background: gradient.length > 1
                                ? `linear-gradient(0deg, ${gradient})`
                                : gradient[0],
                                border: '2px solid',
                                borderColor: active ? '#222' : 'white'
                            }"
                            width="30"
                            height="30"
                            class="mr-2"
                            @click.native="toggle"
                            ></v-card>
                        </v-item>
                        </v-row>
                    </v-item-group>
                    </v-row>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                    <v-slider
                    v-model="width"
                    label="Width"
                    min="0.1"
                    max="10"
                    step="0.1"
                    thumb-label
                    ></v-slider>
                </v-col>

                <v-col cols="6">
                    <v-row class="fill-height" align="center">
                    <v-switch v-model="fill" label="Filled"></v-switch>
                    </v-row>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                    <v-slider
                    v-model="radius"
                    label="Radius"
                    min="0"
                    max="25"
                    thumb-label
                    ></v-slider>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    offset-md="6"
                >
                    <v-slider
                    v-model="padding"
                    label="Padding"
                    min="0"
                    max="25"
                    thumb-label
                    ></v-slider>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>

const gradients = [
    ['#222'],
    ['#6c757d'],
    ['#fc4b6c', '#21c1d6', '#ffb22b'],
    ['#7460ee', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#1e88e5', '#ffd200', '#1feaea'],
  ]

export default {
  name: "SparklineFill",

  data: () => ({
      fill: true,
      gradient: gradients[4],
      gradients,
      padding: 8,
      radius: 10,
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      width: 2,
  })
};
</script>