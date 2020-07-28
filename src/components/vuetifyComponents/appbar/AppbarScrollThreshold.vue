<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Scroll threshold -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-app-bar</code> can have scroll threshold. It will start reacting to scroll only after defined via <code>scroll-threshold</code> property amount of pixels.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card class="overflow-hidden">
                <v-app-bar
                absolute
                color="success"
                dark
                shrink-on-scroll
                prominent
                src="https://picsum.photos/1920/1080?random"
                fade-img-on-scroll
                scroll-target="#scrolling-techniques-5"
                scroll-threshold="500"
                >
                <template v-slot:img="{ props }">
                    <v-img
                    v-bind="props"
                    gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
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
                id="scrolling-techniques-5"
                class="overflow-y-auto"
                max-height="300"
                >
                <v-container style="height: 1500px;"></v-container>
                </v-sheet>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "AppbarScrollThreshold",

  data: () => ({
  })
};
</script>