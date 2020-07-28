<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersColoured -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Navigation drawers can be customized to fit any application's design. Here we apply a custom background color and an appended content area using the <span class="grey--text text--darken-4 font-weight-bold">append</span> slot.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                height="400"
                width="256"
            >
                <v-navigation-drawer
                class="info"
                dark
                permanent
                >
                <v-list>
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

                <template v-slot:append>
                    <div class="pa-2">
                    <v-btn block>Logout</v-btn>
                    </div>
                </template>
                </v-navigation-drawer>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersColoured",

  data: () => ({
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Account', icon: 'mdi-account-circle' },
          { title: 'Admin', icon: 'mdi-account-edit' },
        ],
  })
};
</script>