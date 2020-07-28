<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Scroll Threshold -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>scroll-threshold</code> property allows you to customize the threshold you can scroll before <code>v-bottom-navigation</code> disappears.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="overflow-hidden mx-auto"
                height="200"
                max-width="500"
            >
                <v-bottom-navigation
                scroll-target="#scroll-area-2"
                hide-on-scroll
                scroll-threshold="500"
                absolute
                color="white"
                dark
                horizontal
                >
                <v-btn>
                    <span>Recents</span>
                    <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn>
                    <span>Favorites</span>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn>
                    <span>Nearby</span>
                    <v-icon>mdi-map-marker</v-icon>
                </v-btn>
                </v-bottom-navigation>

                <v-sheet
                id="scroll-area-2"
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
  name: "BottomNavigationScrollThreshould",

  data: () => ({
      activeBtn: 1,
  })
};
</script>