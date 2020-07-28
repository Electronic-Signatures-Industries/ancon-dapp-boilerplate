<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersRightPositioned -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Navigation drawers can also be positioned on the right side of your application (or an element). This is also useful for creating a side-sheet with auxillary information that may not have any navigation links. When using <span class="grey--text text--darken-4 font-weight-bold">RTL</span> you must explicitly define <span class="grey--text text--darken-4 font-weight-bold">right</span> for your drawer.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card height="350px">
                <v-navigation-drawer
                absolute
                permanent
                right
                >
                <template v-slot:prepend>
                    <v-list-item two-line>
                    <v-list-item-avatar>
                        <img src="https://randomuser.me/api/portraits/women/81.jpg">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Jane Smith</v-list-item-title>
                        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    @click.prevent
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
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersRightPositioned",

  data: () => ({
      items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
  })
};
</script>