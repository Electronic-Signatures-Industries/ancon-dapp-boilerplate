<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Elevate bar on scroll -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When using the <span class="grey--text text--darken-4 font-weight-bold">elevate-on-scroll</span> prop, the <code>v-app-bar</code> will rest at an elevation of 0dp until the user begins to scroll down. Once scrolling, the bar raises to 4dp.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                absolute
                color="white"
                elevate-on-scroll
                scroll-target="#scrolling-techniques-7"
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
                id="scrolling-techniques-7"
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
  name: "AppbarElevateBar",

  data: () => ({
  })
};
</script>