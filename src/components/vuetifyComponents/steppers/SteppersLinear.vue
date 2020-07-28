<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersLinear -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Linear steppers will always move a user through your defined path.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper>
                <v-stepper-header>
                    <v-stepper-step step="1">Select campaign settings</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2">Create an ad group</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Create an ad</v-stepper-step>
                </v-stepper-header>
                </v-stepper>

                <v-stepper value="2" class="mt-12">
                <v-stepper-header>
                    <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2">Create an ad group</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Create an ad</v-stepper-step>
                </v-stepper-header>
                </v-stepper>

                <v-stepper value="3" class="mt-12">
                <v-stepper-header>
                    <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2" complete>Create an ad group</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Create an ad</v-stepper-step>
                </v-stepper-header>
                </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
  name: "SteppersLinear",

  data: () => ({
  })
};
</script>