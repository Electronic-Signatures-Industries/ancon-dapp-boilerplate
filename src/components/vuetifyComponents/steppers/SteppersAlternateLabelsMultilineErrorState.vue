<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersAlternateLabels -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The error state can also be applied to the alternative label style.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper alt-labels>
            <v-stepper-header>
            <v-stepper-step step="3" complete>Ad type</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4" complete>Ad style</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :rules="[() => false]" step="5">
                Custom channels
                <small>Alert message</small>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="6">Get code</v-stepper-step>
            </v-stepper-header>
        </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
  name: "SteppersAlternateLabels",

  data: () => ({
  })
};
</script>