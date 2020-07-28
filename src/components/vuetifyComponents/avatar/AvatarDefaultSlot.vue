<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Default Slot -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-avatar</code> default slot will accept the <code>v-icon</code> component, an image, or text. Mix and match these with other props to create something unique.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-row justify="space-around">
                <v-avatar color="indigo">
                <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>

                <v-avatar>
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                >
                </v-avatar>

                <v-avatar color="red">
                <span class="white--text headline">CJ</span>
                </v-avatar>

            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "AvatarDefaultSlot",

  data: () => ({
  })
};
</script>