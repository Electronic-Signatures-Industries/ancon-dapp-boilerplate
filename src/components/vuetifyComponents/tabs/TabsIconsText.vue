<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsIconsText -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-tab</code>'s can contain icons as well as text. This increases the <code>v-tab</code>s height to 72px.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-tabs
            v-model="tab"
            background-color="success"
            centered
            dark
            icons-and-text
            >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                Recents
                <v-icon>mdi-phone</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                Favorites
                <v-icon>mdi-heart</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
                Nearby
                <v-icon>mdi-account-box</v-icon>
            </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="i in 3"
                :key="i"
                :value="'tab-' + i"
            >
                <v-card flat>
                <v-card-text>{{ text }}</v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsIconsText",

  data: () => ({
      tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
};
</script>