<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Outlined -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Outlined buttons inherit their borders from the current color applied.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-btn class="ma-2" outlined color="info">Outlined Button</v-btn>
            <v-btn class="ma-2" outlined fab color="success">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
            <v-btn class="ma-2" outlined large fab color="info">
            <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
  name: "ButtonOutlined",

  data: () => ({
  })
};
</script>