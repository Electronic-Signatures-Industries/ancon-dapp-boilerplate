<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersEditable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        An editable step can be selected by a user at any point and will navigate them to that step.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper>
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
                    step="2"
                >Create an ad group</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    step="3"
                    editable
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
  name: "SteppersEditable",

  data: () => ({
  })
};
</script>