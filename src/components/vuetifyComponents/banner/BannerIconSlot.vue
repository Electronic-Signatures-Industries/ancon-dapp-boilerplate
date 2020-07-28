<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Icon slot -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The icon slot allows you to to explicitly control the content and functionality within it.
        </v-list-item-subtitle>
        <div class="mt-4">
        <v-banner two-line>
            <v-avatar
            slot="icon"
            color="info"
            size="40"
            >
            <v-icon
                icon="mdi-lock"
                color="white"
            >
                mdi-lock
            </v-icon>
            </v-avatar>

            Three line text string example two actions.

            <template v-slot:actions>
            <v-btn text color="info">Action</v-btn>
            <v-btn text color="info">Action</v-btn>
            </template>
        </v-banner>
        </div>
    </div>
</template>

<script>
export default {
  name: "BannerIconSlot",

  data: () => ({
  })
};
</script>