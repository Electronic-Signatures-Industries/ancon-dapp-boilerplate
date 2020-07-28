<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Vertical -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Vertical dividers give you more tools for unique layouts.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-toolbar
                color="info"
                dark
            >
                <v-toolbar-title>Title</v-toolbar-title>

                <v-divider
                class="mx-4"
                vertical
                ></v-divider>

                <span class="subheading">My Home</span>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text>
                    News
                </v-btn>

                <v-divider vertical></v-divider>

                <v-btn text>
                    Blog
                </v-btn>

                <v-divider vertical></v-divider>

                <v-btn text>
                    Music
                </v-btn>

                <v-divider vertical></v-divider>
                </v-toolbar-items>

                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-toolbar>
        </div>
    </div>
</template>

<script>
export default {
  name: "DividerVertical",

  data: () => ({
  })
};
</script>