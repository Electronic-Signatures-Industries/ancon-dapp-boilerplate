<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- OverlayZindex -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>z-index</code> gives you the ability to easily change the stack order of the <code>v-overlay</code> component.
        </v-list-item-subtitle>
        <div class="mt-4">  
            <v-row justify="center">
                <v-btn
                class="white--text"
                color="info"
                @click="overlay = !overlay"
                >
                Show Overlay
                </v-btn>

                <v-overlay
                :z-index="zIndex"
                :value="overlay"
                >
                <v-btn
                    class="white--text"
                    color="info"
                    @click="overlay = false"
                >
                    Hide Overlay
                </v-btn>
                </v-overlay>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "OverlayZindex",

  data: () => ({
      overlay: false,
      zIndex: 0,
  })
};
</script>