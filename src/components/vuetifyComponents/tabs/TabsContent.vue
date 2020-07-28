<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsContent -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        It is common to put <code>v-tabs</code> inside the extension slot of <code>v-toolbar</code>. Using <code>v-toolbar</code>'s tabs prop auto adjusts its height to 48px to match <code>v-tabs</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-toolbar
            color="cyan"
            dark
            flat
            >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Page title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs
                v-model="model"
                centered
                slider-color="white"
                >
                <v-tab
                    v-for="i in 3"
                    :key="i"
                    :href="`#tab-${i}`"
                >
                    Item {{ i }}
                </v-tab>
                </v-tabs>
            </template>
            </v-toolbar>

            <v-tabs-items v-model="model">
            <v-tab-item
                v-for="i in 3"
                :key="i"
                :value="`tab-${i}`"
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
  name: "TabsContent",

  data: () => ({
      model: 'tab-2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
};
</script>