<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Validation -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Similar to other inputs, you can use the <span class="grey--text text--darken-4 font-weight-bold">rules</span> prop to can create your own custom validation parameters.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
            ></v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsValidation",

  data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
  })
};
</script>