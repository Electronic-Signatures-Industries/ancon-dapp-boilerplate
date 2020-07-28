<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsChkBoolean -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <v-checkbox v-model="checkbox1" :label="`Checkbox 1: ${checkbox1.toString()}`"></v-checkbox>
            <v-checkbox v-model="checkbox2" :label="`Checkbox 2: ${checkbox2.toString()}`"></v-checkbox>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsChkBoolean",

  data: () => ({
      checkbox1: true,
        checkbox2: false,
  })
};
</script>