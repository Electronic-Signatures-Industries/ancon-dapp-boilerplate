<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Shift -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>shift</code> prop will hide the button text until active. For this to work, <code>v-btn</code> text is required to be wrapped in a <code>span</code> tag.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-bottom-navigation
                v-model="bottomNav"
                color="info"
                dark
                shift
            >
                <v-btn>
                <span>Video</span>
                <v-icon>mdi-television-play</v-icon>
                </v-btn>

                <v-btn>
                <span>Music</span>
                <v-icon>mdi-music-box</v-icon>
                </v-btn>

                <v-btn>
                <span>Book</span>
                <v-icon>mdi-book</v-icon>
                </v-btn>

                <v-btn>
                <span>Image</span>
                <v-icon>mdi-image</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </div>
    </div>
</template>

<script>
export default {
  name: "BottomNavigationShift",

  data: () => ({
      bottomNav: 3,
  })
};
</script>