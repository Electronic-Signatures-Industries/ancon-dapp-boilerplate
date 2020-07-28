<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Tile -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Tile buttons behave the same as regular buttons but have no border radius.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn class="ma-2" tile color="primary" dark>Tile Button</v-btn>
            <v-btn class="ma-2" tile outlined color="success">
            <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn class="ma-2" tile large color="error" icon>
            <v-icon>mdi-vuetify</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "ButtonTile",

  data: () => ({
  })
};
</script>