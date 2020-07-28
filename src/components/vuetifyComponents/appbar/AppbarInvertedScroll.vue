<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Inverted scrolling -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When using the <span class="grey--text text--darken-4 font-weight-bold">inverted-scroll</span> property, the bar will hide until the user scrolls past the designated threshold. Once past the threshold, the <code>v-app-bar</code> will continue to display until the users scrolls up past the threshold. If no <span class="grey--text text--darken-4 font-weight-bold">scroll-threshold</span> value is supplied a default value of 0 will be used.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                absolute
                color="primary"
                dark
                inverted-scroll
                scroll-target="#scrolling-techniques-8"
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
                id="scrolling-techniques-8"
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
  name: "AppbarInvertedScroll",

  data: () => ({
  })
};
</script>