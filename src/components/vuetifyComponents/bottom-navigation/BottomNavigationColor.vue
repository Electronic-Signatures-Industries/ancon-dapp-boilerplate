<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Navigation color -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>color</code> prop applies a color to the background the bottom navigation. It is recommended to use the <code>light</code> and <code>dark</code> props to properly contrast text color.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-bottom-navigation
                :value="activeBtn"
                color="success"
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
  name: "BottomNavigationColor",

  data: () => ({
      activeBtn: 1,
  })
};
</script>