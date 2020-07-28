<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- NavigationDrawersExpandonHover -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Places the component in <span class="grey--text text--darken-4 font-weight-bold">mini-variant</span> mode and expands once hovered. Does not alter the content area. Width can be controlled with the <span class="grey--text text--darken-4 font-weight-bold">mini-variant-width</span> property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <template>
                <v-card>
                    <v-navigation-drawer
                    permanent
                    expand-on-hover
                    >
                    <v-list>
                        <v-list-item class="px-2">
                        <v-list-item-avatar>
                            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                        </v-list-item-avatar>
                        </v-list-item>

                        <v-list-item link>
                        <v-list-item-content>
                            <v-list-item-title class="title">Sandra Adams</v-list-item-title>
                            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list
                        nav
                        dense
                    >
                        <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>My Files</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-account-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Shared with me</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-star</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Starred</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-navigation-drawer>
                </v-card>
                </template>
        </div>
    </div>
</template>

<script>
export default {
  name: "NavigationDrawersExpandonHover",

  data: () => ({
  })
};
</script>