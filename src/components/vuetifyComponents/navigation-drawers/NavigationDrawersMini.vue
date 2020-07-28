<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersMini -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When using the <span class="grey--text text--darken-4 font-weight-bold">mini-variant</span> prop, the drawer will shrink (default 80px) and hide everything inside of <code>v-list</code> except the first element. In this example we use the <span class="grey--text text--darken-4 font-weight-bold">.sync</span> modifier that allows us to tie the expanding/contracting of the drawer programmatically.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card>
                <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                permanent
                >
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-title>John Leider</v-list-item-title>

                    <v-btn
                    icon
                    @click.stop="mini = !mini"
                    >
                    <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
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
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersMini",

  data: () => ({
      drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
  })
};
</script>