<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Dense -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can reduces the file input height with <code>dense</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input label="File input" outlined dense></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsDense",

  data: () => ({
  })
};
</script>