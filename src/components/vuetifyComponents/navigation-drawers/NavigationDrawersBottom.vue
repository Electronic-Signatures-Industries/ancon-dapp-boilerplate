<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersBottom -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <span class="grey--text text--darken-4 font-weight-bold">bottom</span> prop, we are able to relocate our drawer on mobile devices to come from the bottom of the screen. This is an alternative style and only activates once the <span class="grey--text text--darken-4 font-weight-bold">mobile-break-point</span> is met.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto overflow-hidden"
                height="400"
                width="344"
            >
                <v-system-bar color="info darken-1"></v-system-bar>

                <v-app-bar
                color="info accent-4"
                dark
                prominent
                >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>My files</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-filter</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-app-bar>

                <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
                >
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group
                    v-model="group"
                    active-class="info--text text--accent-4"
                    >
                    <v-list-item>
                        <v-list-item-title>Foo</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>Bar</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>Fizz</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>Buzz</v-list-item-title>
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
                </v-navigation-drawer>

                <v-card-text>
                The navigation drawer will appear from the bottom on smaller size screens.
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersBottom",

  data: () => ({
      drawer: false,
      group: null,
  }),
  watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>