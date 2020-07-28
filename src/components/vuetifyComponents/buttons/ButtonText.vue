<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Text -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Text buttons have no box shadow and no background. Only on hover is the container for the button shown.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row align="center">
                <v-col class="text-center" cols="12" sm="4">
                <div class="my-2">
                    <v-btn text small>Normal</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text small color="primary">Primary</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text small color="error">Error</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text small disabled>Disabled</v-btn>
                </div>
                </v-col>

                <v-col class="text-center" cols="12" sm="4">
                <div class="my-2">
                    <v-btn text>Normal</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text color="primary">Primary</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text color="error">Error</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text disabled>Disabled</v-btn>
                </div>
                </v-col>

                <v-col class="text-center" cols="12" sm="4">
                <div class="my-2">
                    <v-btn text large>Normal</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text large color="primary">Primary</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text large color="error">Error</v-btn>
                </div>
                <div class="my-2">
                    <v-btn text large disabled>Disabled</v-btn>
                </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ButtonText",

  data: () => ({
  })
};
</script>