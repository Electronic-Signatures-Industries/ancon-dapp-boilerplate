<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldValidation -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Vuetify includes simple validation through the <code>rules</code> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either true or a String, the error message.
        </v-list-item-subtitle>
        <div class="mt-4">
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldValidation",

  data: () => ({
  })
};
</script>