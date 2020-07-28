<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearFileLoader -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-progress-linear</code> component is good for translating to the user that they are waiting for a response.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                max-width="344"
            >
                <v-toolbar
                color="info accent-4"
                dark
                prominent
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>My Files</v-toolbar-title>

                <v-btn
                    absolute
                    bottom
                    color="white"
                    fab
                    left
                    light
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-toolbar>

                <v-container style="height: 400px;">
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                    <v-col
                    class="subtitle-1 text-center"
                    cols="12"
                    >
                    Getting your files
                    </v-col>
                    <v-col cols="6">
                    <v-progress-linear
                        color="info accent-4"
                        indeterminate
                        rounded
                        height="6"
                    ></v-progress-linear>
                    </v-col>
                </v-row>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearFileLoader",

  data: () => ({
  })
};
</script>