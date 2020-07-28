<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Show-on-hover -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can do many things with visibility control, for example, show badge on hover.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
        <v-badge
        :value="hover"
        color="deep-purple accent-4"
        content="9999+"
        left
        transition="slide-x-transition"
        >
        <v-hover v-model="hover">
            <v-icon
            color="grey lighten-1"
            large
            >
            mdi-account-circle
            </v-icon>
        </v-hover>
        </v-badge>
        </div>
    </div>
</template>

<script>
export default {
  name: "BadgeShowonHover",

  data: () => ({
      hover: false,
  })
};
</script>