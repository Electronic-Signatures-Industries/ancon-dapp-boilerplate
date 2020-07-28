<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- OverlayOpacity -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>opacity</code> allows you to customize the transparency of <code>v-overlay</code> components.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row align="center" justify="center">
                <v-card height="300" width="250">
                <v-row justify="center">
                    <v-btn
                    color="success"
                    class="mt-12"
                    @click="overlay = !overlay"
                    >
                    Show Overlay
                    </v-btn>

                    <v-overlay
                    :absolute="absolute"
                    :opacity="opacity"
                    :value="overlay"
                    >
                    <v-btn
                        color="success"
                        @click="overlay = false"
                    >
                        Hide Overlay
                    </v-btn>
                    </v-overlay>
                </v-row>
                </v-card>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverlayOpacity",

  data: () => ({
      absolute: true,
      opacity: 1,
      overlay: false,
  })
};
</script>