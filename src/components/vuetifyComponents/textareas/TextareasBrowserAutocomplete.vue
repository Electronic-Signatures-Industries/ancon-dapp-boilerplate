<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextareasBrowserAutocomplete -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>autocomplete</code> prop gives you the option to enable the browser to predict user inpu
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-textarea
            autocomplete="email"
            label="Email"
            ></v-textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextareasBrowserAutocomplete",

  data: () => ({
  })
};
</script>