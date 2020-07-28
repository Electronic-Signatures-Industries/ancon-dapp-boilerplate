<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Loading -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-input</code> has <code>loading</code> state which can be used, e.g. for data loading indication. Note: <code>v-text-field</code> is used just for example.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-text-field color="success" loading disabled></v-text-field>
        </div>
    </div>
</template>

<script>
export default {
  name: "InputLoading",

  data: () => ({
  })
};
</script>