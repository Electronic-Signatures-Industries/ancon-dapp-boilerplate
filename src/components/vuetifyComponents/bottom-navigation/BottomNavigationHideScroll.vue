<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Hide on scroll -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Hide-on-scroll hides <code>v-bottom-navigation</code> when target element is scrolled.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="overflow-hidden mx-auto"
                height="200"
                max-width="500"
            >
                <v-bottom-navigation
                scroll-target="#scroll-area-1"
                hide-on-scroll
                absolute
                horizontal
                >
                <v-btn text color="success">
                    <span>Recents</span>
                    <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn text color="success">
                    <span>Favorites</span>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn text color="success">
                    <span>Nearby</span>
                    <v-icon>mdi-map-marker</v-icon>
                </v-btn>
                </v-bottom-navigation>

                <v-sheet
                id="scroll-area-1"
                class="overflow-y-auto"
                max-height="300"
                >
                <v-container style="height: 1500px;">

                </v-container>
                </v-sheet>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomNavigationHideScroll",

  data: () => ({
     
  })
};
</script>