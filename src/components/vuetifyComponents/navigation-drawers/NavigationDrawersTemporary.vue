<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersTemporary -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        A temporary drawer sits above its application and uses a scrim (overlay) to darken the background. This drawer behavior is mimicked by default when on mobile. Clicking outside of the drawer will cause it to close.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-sheet
                height="400"
                class="overflow-hidden"
                style="position: relative;"
            >
                <v-container class="fill-height">
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-btn
                    color="info"
                    dark
                    @click.stop="drawer = !drawer"
                    >
                    Toggle
                    </v-btn>
                </v-row>
                </v-container>

                <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                >
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense>

                    <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
                </v-navigation-drawer>
            </v-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersTemporary",

  data: () => ({
      drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-account-network' },
        ],
  })
};
</script>