<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Multiple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-file-input</code> can contain multiple files at the same time when using the multiple prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input multiple label="File input"></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsMultiple",

  data: () => ({
  })
};
</script>