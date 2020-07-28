<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextareasClearable -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can clear the text from a <code>v-textarea</code> by using the <code>clearable</code> prop, and customize the icon used with the <code>clearable-icon</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Text"
            value="This is clearable text."
            ></v-textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextareasClearable",

  data: () => ({
  })
};
</script>