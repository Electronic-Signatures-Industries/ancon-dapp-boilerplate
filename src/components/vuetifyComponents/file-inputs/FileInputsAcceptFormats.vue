<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Accept Formats -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-file-input</code> component can accept only specific media formats/file types if you want. For more information, checkout the documentation on the accept attribute.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input accept="image/*" label="File input"></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsAcceptFormats",

  data: () => ({
  })
};
</script>