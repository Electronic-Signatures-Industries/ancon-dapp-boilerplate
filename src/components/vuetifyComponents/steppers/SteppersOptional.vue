<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersOptional -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        An optional step can be called out with sub-text.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper value="1">
                <v-stepper-header>
                    <v-stepper-step step="1">Select campaign settings</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2">
                    Create an ad group
                    <small>Optional</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Create an ad</v-stepper-step>
                </v-stepper-header>
                </v-stepper>

                <v-stepper value="2" class="mt-12">
                <v-stepper-header>
                    <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2">
                    Create an ad group
                    <small>Optional</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Create an ad</v-stepper-step>
                </v-stepper-header>
                </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
  name: "SteppersOptional",

  data: () => ({
  })
};
</script>