<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Custom Icon -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>v-file-input</code> has a default prepended icon that can be set on the component or adjusted globally. More information on changing global components can be found on the customizing icons page.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input
                label="File input"
                filled
                prepend-icon="mdi-camera"
            ></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsCustomIcon",

  data: () => ({
  })
};
</script>