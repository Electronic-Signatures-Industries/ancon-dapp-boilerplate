<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Prominent w/ scroll shrink -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        An <code>v-app-bar</code> with the <code>prominent</code> prop can opt to have its height shrunk as the user scrolls down. This provides a smooth transition to taking up less visual space when the user is scrolling through content. Shrink height has 2 possible options, <span class="grey--text text--darken-4 font-weight-bold">dense</span> (48px) and <span class="grey--text text--darken-4 font-weight-bold">short</span> (56px) sizes.
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-card class="overflow-hidden">
            <v-app-bar
            absolute
            color="indigo darken-2"
            dark
            shrink-on-scroll
            prominent
            scroll-target="#scrolling-techniques"
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
            id="scrolling-techniques"
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
  name: "AppbarProminentShrink",

  data: () => ({
  })
};
</script>