<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Floating -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Floating buttons are rounded and usually contain an icon.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn class="mx-2" fab dark small color="primary">
            <v-icon dark>mdi-minus</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark small color="error">
            <v-icon dark>mdi-heart</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark color="success">
            <v-icon dark>mdi-plus</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark color="warning">
            <v-icon dark>mdi-format-list-bulleted-square</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark large color="primary">
            <v-icon dark>mdi-pencil</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark large color="dark">
            <v-icon dark>mdi-android</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "ButtonFloating",

  data: () => ({
  })
};
</script>