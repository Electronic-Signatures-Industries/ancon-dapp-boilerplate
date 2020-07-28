<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersNonLinear -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Non-linear steppers allow the user to move through your process in whatever way they choose.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper non-linear>
                <v-stepper-header>
                    <v-stepper-step
                    editable
                    step="1"
                    >
                    Select campaign settings
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    editable
                    step="2"
                    >
                    Create an ad group
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    step="3"
                    editable
                    >
                    Create an ad
                    </v-stepper-step>
                </v-stepper-header>
                </v-stepper>

                <v-stepper
                class="mt-12"
                non-linear
                >
                <v-stepper-header>
                    <v-stepper-step
                    complete
                    editable
                    step="1"
                    >
                    Select campaign settings
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    editable
                    step="2"
                    >
                    Create an ad group
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    complete
                    editable
                    step="3"
                    >
                    Create an ad
                    </v-stepper-step>
                </v-stepper-header>
                </v-stepper>

                <v-stepper
                class="mt-12"
                non-linear
                value="3"
                >
                <v-stepper-header>
                    <v-stepper-step
                    complete
                    editable
                    step="1"
                    >
                    Select campaign settings
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    complete
                    editable
                    step="2"
                    >
                    Create an ad group
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    complete
                    editable
                    step="3"
                    >
                    Create an ad
                    </v-stepper-step>
                </v-stepper-header>
                </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
  name: "SteppersNonLinear",

  data: () => ({
  })
};
</script>