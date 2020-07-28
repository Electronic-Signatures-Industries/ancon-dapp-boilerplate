<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Size -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The displayed size of the selected file(s) can be configured with the <span class="grey--text text--darken-4 font-weight-bold">show-size</span> property. Display sizes can be either 1024 (the default used when providing true) or 1000.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input show-size label="File input"></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsSize",

  data: () => ({
  })
};
</script>