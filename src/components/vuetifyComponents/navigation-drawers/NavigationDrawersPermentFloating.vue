<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersPermentFloating -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        By default, a navigation drawer has a 1px right border that separates it from content. In this example we want to detach the drawer from the left side and let it float on its own. The <span class="grey--text text--darken-4 font-weight-bold">floating</span> property removes the right border (or left if using <span class="grey--text text--darken-4 font-weight-bold">right</span>).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="pa-12"
                color="indigo darken-2"
                flat
            >
                <v-card
                elevation="12"
                width="256"
                >
                <v-navigation-drawer
                    floating
                    permanent
                >
                    <v-list
                    dense
                    rounded
                    >
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
            </v-card>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersPermentFloating",

  data: () => ({
      items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-account-network' },
        ],
  })
};
</script>