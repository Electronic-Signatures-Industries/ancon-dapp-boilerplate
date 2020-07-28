<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Dense -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can make <span class="grey--text text--darken-4 font-weight-bold">app-bar</span> dense. A dense app bar has lower height than regular one
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-app-bar
            color="success"
            dense
            dark
            >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Page title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu
                left
                bottom
            >
                <template>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                <v-list-item
                    v-for="n in 5"
                    :key="n"
                    @click="() => {}"
                >
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>
            </v-app-bar>
        </div>
    </div>
</template>

<script>
export default {
  name: "AppbarDence",

  data: () => ({
  })
};
</script>