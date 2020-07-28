<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SparklineCustomLabels -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        By providing a label slot, we are able to modify the displayed content adding a dollar sign ($). This slot is exclusively for text content. For more information on the svg <code>text</code> element, navigate here.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto text-center"
                color="success"
                dark
                max-width="600"
            >
                <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                    :value="value"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    >
                    <template v-slot:label="item">
                        ${{ item.value }}
                    </template>
                    </v-sparkline>
                </v-sheet>
                </v-card-text>

                <v-card-text>
                <div class="display-1 font-weight-thin">Sales Last 24h</div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="justify-center">
                <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "SparklineCustomLabels",

  data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
  })
};
</script>