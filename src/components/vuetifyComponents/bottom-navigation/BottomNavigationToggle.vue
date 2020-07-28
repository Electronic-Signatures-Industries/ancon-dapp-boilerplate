<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Toggle -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The display state of <code>v-bottom-navigation</code> can be toggled using the <code>input-value</code> prop. You can also control the currently active button using <code>v-model</code>.
        </v-list-item-subtitle>
        <div class="mt-4 overflow-hidden">
            <div class="text-center mb-2">
                <v-btn
                    text
                    color="info"
                    @click="showNav = !showNav"
                >
                    Toggle Nav
                </v-btn>
                </div>

                <v-bottom-navigation
                v-model="activeBtn"
                :input-value="showNav"
                color="indigo"
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
  name: "BottomNavigationToggle",

  data: () => ({
        activeBtn: 1,
        showNav: true,
  })
};
</script>