<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsAlignwithToolbarTitle -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Make <code>v-tabs</code> lined up with the <code>v-toolbar-title</code> component (<code>v-app-bar-nav-icon</code> or <code>v-btn</code> must be used in <code>v-toolbar</code>).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-toolbar
            color="info"
            dark
            flat
            >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Your Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs
                v-model="tab"
                align-with-title
                >
                <v-tabs-slider color="white"></v-tabs-slider>

                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
                </v-tabs>
            </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item"
            >
                <v-card flat>
                <v-card-text v-text="text"></v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsAlignwithToolbarTitle",

  data: () => ({
      tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
};
</script>