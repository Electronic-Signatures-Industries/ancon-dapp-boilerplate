<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- OverlayLoader -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <code>v-overlay</code> as a background, add a progress component to easily create a custom loader.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn
            color="info"
            class="white--text"
            @click="overlay = !overlay"
            >
            Launch Application
            <v-icon right>mdi-open-in-new</v-icon>
            </v-btn>

            <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverlayLoader",

  data: () => ({
      overlay: false,
  }),
    watch: {
        overlay (val) {
        val && setTimeout(() => {
            this.overlay = false
        }, 3000)
        },
    },
};
</script>