<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Display animation -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When displaying for the first time, a floating action button should animate onto the screen. Here we use the v-fab-transition with v-show. You can also use any custom transition provided by Vuetify or your own.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-col>
                    <v-card>
                    <v-toolbar extended>
                        <v-app-bar-nav-icon></v-app-bar-nav-icon>
                        <template v-slot:extension>
                        <v-fab-transition>
                            <v-btn
                            v-show="!hidden"
                            color="error"
                            fab
                            dark
                            small
                            absolute
                            bottom
                            left
                            >
                            <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-fab-transition>
                        </template>
                    </v-toolbar>
                    <v-card-text style="height: 260px;" class="grey lighten-5 text-center">
                        <v-btn color="primary" @click="hidden = !hidden">
                        {{ hidden ? 'Show' : 'Hide' }}
                        </v-btn>
                    </v-card-text>
                    <v-card-text style="height: 100px; position: relative">
                        <v-fab-transition>
                        <v-btn
                            v-show="!hidden"
                            color="error"
                            dark
                            absolute
                            top
                            right
                            fab
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        </v-fab-transition>
                    </v-card-text>
                    </v-card>
                </v-col>
                </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "FabDisplayAnimation",

  data: () => ({
    hidden: false,
  })
};
</script>