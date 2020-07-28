<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SparklineDashboardCard -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-sparkline</code> component pairs nicely with <code>v-card</code> and <code>v-sheet</code> to create customized information cards, perfect for admin dashboards. Here we use custom labels to provide additional context for the sparkline.
        </v-list-item-subtitle>
        <div class="mt-8">
            <v-card
                class="mt-4 mx-auto"
                max-width="400"
            >
                <v-sheet
                class="v-sheet--offset mx-auto"
                color="info"
                elevation="12"
                max-width="calc(100% - 32px)"
                >
                <v-sparkline
                    :labels="labels"
                    :value="value"
                    color="white"
                    line-width="2"
                    padding="16"
                ></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">User Registrations</div>
                <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
                <v-divider class="my-2"></v-divider>
                <v-icon
                    class="mr-2"
                    small
                >
                    mdi-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>

<script>
export default {
  name: "SparklineDashboardCard",

  data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
  })
};
</script>