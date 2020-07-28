<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Grow -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        If <code>v-bottom-navigation</code> has <code>grow</code> property, buttons within it grow to fill available space.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-bottom-navigation
                :value="activeBtn"
                grow
                color="info"
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
  name: "BottomNavigationGrow",

  data: () => ({
    activeBtn: 1,
  })
};
</script>