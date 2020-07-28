<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SteppersMultilineErrorState -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        An error state can be displayed to notify the user of some action that must be taken.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-stepper>
                <v-stepper-header>
                <v-stepper-step step="1">Ad unit details</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :rules="[() => false]" step="2">
                    Ad templates
                    <small>Alert message</small>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Ad sizes</v-stepper-step>
                </v-stepper-header>
            </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
  name: "SteppersMultilineErrorState",

  data: () => ({
  })
};
</script>