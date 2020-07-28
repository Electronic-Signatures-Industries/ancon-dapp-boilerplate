<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersCombined -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        In this example we define a custom width to accommodate our nested drawer. Using <code>v-row</code> we ensure that the drawer and list stack horizontally next to each other.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                height="300"
                width="330"
            >
                <v-navigation-drawer
                permanent
                width="100%"
                >
                <v-row class="fill-height" no-gutters>
                    <v-navigation-drawer
                    dark
                    mini-variant
                    mini-variant-width="56"
                    permanent
                    >
                    <v-list-item class="px-2">
                        <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list
                        dense
                        nav
                    >

                        <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        @click.prevent
                        >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    </v-navigation-drawer>

                    <v-list class="grow">
                    <v-list-item
                        v-for="link in links"
                        :key="link"
                        link
                    >
                        <v-list-item-title v-text="link"></v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-row>
                </v-navigation-drawer>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersCombined",

  data: () => ({
      items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-account-network' },
        ],
        links: ['Home', 'Contacts', 'Settings'],
        mini: true,
  })
};
</script>