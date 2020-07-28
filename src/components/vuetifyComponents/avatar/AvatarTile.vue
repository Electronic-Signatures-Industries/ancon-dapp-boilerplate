<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Tile -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>tile</code> prop removes the border radius from v-avatar leaving you with a simple square avatar.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
        <v-avatar tile color="blue">
        <v-icon dark>mdi-alarm</v-icon>
        </v-avatar>
        </div>
    </div>
</template>

<script>
export default {
  name: "AvatarTile",

  data: () => ({
  })
};
</script>