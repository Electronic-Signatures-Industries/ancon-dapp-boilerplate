<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Actions slot -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        the <code>actions</code> slot has <code>dismiss</code> function in its scope, you can use it to easily dismiss banner.
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-checkbox v-model="v0" label="Visible"></v-checkbox>
        <v-banner v-model="v0" single-line transition="slide-y-transition">
        No Internet connection
        <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
        </template>
        </v-banner>
        </div>
    </div>
</template>

<script>
export default {
  name: "BannerActionSlot",

  data: () => ({
      v0: true,
  })
};
</script>