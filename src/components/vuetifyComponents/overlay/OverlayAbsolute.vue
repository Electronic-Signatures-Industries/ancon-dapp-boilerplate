<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- OverlayAbsolute -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>absolute</code> overlays are positioned absolutely and contained inside of their parent element.
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
  name: "OverlayAbsolute",

  data: () => ({
      absolute: true,
      overlay: false,
  })
};
</script>