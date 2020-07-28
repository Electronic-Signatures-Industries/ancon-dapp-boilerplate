<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Advanced -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using <code>v-list-item</code> and <code>v-img</code> allows us to create unique card layouts in an advanced setting
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                max-width="344"
                class="mx-auto"
            >
                <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                    <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>

                <v-img
                src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                height="194"
                ></v-img>

                <v-card-text>
                Visit ten places on our planet that are undergoing the biggest changes today.
                </v-card-text>

                <v-card-actions>
                <v-btn
                    text
                    color="info"
                >
                    Read
                </v-btn>
                <v-btn
                    text
                    color="info"
                >
                    Bookmark
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "CardAdvanced",

  data: () => ({
  })
};
</script>