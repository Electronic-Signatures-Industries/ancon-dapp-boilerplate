<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Hiding on scroll -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-app-bar</code> can be hidden on scroll. Use the <code>hide-on-scroll</code> property for this.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                absolute
                color="success"
                dark
                hide-on-scroll
                prominent
                scroll-target="#scrolling-techniques-4"
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Title</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-app-bar>
                <v-sheet
                id="scrolling-techniques-4"
                class="overflow-y-auto"
                max-height="300"
                >
                <v-container style="height: 1000px;"></v-container>
                </v-sheet>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "AppbarHidingScroll",

  data: () => ({
  })
};
</script>