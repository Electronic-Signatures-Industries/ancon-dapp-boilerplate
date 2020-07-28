<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Horizontal -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>horizontal</code> prop, places nav text next to the icon as appose to beneath it.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-bottom-navigation
                :value="activeBtn"
                color="primary"
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
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomNavigationHorizontal",

  data: () => ({
      activeBtn: 1,
  })
};
</script>