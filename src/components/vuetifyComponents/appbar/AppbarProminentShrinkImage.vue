<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Prominent w/ scroll shrink and image -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-app-bar</code> can contain background images. You can set source via the <code>src</code> prop. If you need to customize the <code>v-img</code> properties, the app-bar provides you with an <span class="grey--text text--darken-4 font-weight-bold">img</span> slot.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                absolute
                color="info"
                dark
                shrink-on-scroll
                src="https://picsum.photos/1920/1080?random"
                scroll-target="#scrolling-techniques-2"
                >
                <template v-slot:img="{ props }">
                    <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                    ></v-img>
                </template>

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
                id="scrolling-techniques-2"
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
  name: "AppbarProminentShrinkImage",

  data: () => ({
  })
};
</script>