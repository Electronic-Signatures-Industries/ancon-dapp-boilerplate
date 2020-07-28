<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Tile -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Badges help convey information to the user in a variety of ways.
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-toolbar>
            <v-tabs
            dark
            background-color="primary"
            grow
            >
            <v-tab>
                <v-badge
                color="error"
                dot
                >
                Item One
                </v-badge>
            </v-tab>

            <v-tab>
                <v-badge
                color="success"
                content="6"
                >
                Item Two
                </v-badge>
            </v-tab>

            <v-tab>
                <v-badge
                color="warning"
                icon="mdi-vuetify"
                >
                Item Three
                </v-badge>
            </v-tab>
            </v-tabs>
        </v-toolbar>
        <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
export default {
  name: "BadgeTabs",

  data: () => ({
  })
};
</script>