<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersNonEditable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Non-editable steps force a user to process linearly through your process.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper value="2">
                <v-stepper-header>
                <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>

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
  name: "SteppersNonEditable",

  data: () => ({
  })
};
</script>