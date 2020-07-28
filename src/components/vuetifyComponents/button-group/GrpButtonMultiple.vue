<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpButtonMultiple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>multiple</code> <code>VBtnToggle</code> allows user to select multiple variants and returns value as an array.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-btn-toggle
            v-model="toggle_exclusive"
            multiple
            >
            <v-btn>
                <v-icon>mdi-format-align-left</v-icon>
            </v-btn>
            <v-btn>
                <v-icon>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn>
                <v-icon>mdi-format-align-right</v-icon>
            </v-btn>
            <v-btn>
                <v-icon>mdi-format-align-justify</v-icon>
            </v-btn>
            </v-btn-toggle>
            <p>Model: {{ toggle_exclusive }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "GrpButtonMultiple",

  data: () => ({
      toggle_exclusive: [],
  })
};
</script>