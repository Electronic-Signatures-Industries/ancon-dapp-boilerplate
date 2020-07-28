<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Counter -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        When using the <span class="grey--text text--darken-4 font-weight-bold">show-size</span> property along with <span class="grey--text text--darken-4 font-weight-bold">counter</span>, the total number of files and size will be displayed under the input.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input show-size counter multiple label="File input"></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsCounter",

  data: () => ({
  })
};
</script>