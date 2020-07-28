<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Multiple Errors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can add multiple errors to <code>v-input</code> using <code>error-count</code> property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-input error-count="2" :error-messages="['Fatal error', 'Another error']" error disabled>Input</v-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "InputMultipleErrors",

  data: () => ({
  })
};
</script>