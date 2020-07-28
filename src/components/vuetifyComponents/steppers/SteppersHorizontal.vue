<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersHorizontal -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Horizontal steppers move users along the x-axis through the defined steps.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper value="1">
                <v-stepper-header>
                <v-stepper-step step="1">Select campaign settings</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2">Create an ad group</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Create an ad</v-stepper-step>
                </v-stepper-header>
            </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
  name: "SteppersHorizontal",

  data: () => ({
  })
};
</script>