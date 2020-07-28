<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Window bar -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        A window bar with window controls and status info.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-system-bar window dark>
            <v-icon>mdi-message</v-icon>
            <span>10 unread messages</span>
            <v-spacer></v-spacer>
            <v-icon>mdi-minus</v-icon>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <v-icon>mdi-close</v-icon>
            </v-system-bar>
        </div>
    </div>
</template>

<script>
export default {
  name: "SystembarWindowBar",

  data: () => ({
  })
};
</script>