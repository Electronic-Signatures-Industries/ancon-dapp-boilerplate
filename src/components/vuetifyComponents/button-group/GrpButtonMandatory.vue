<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpButtonMandatory -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           <code>mandatory</code> <code>VBtnToggle</code> always has value.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-btn-toggle
            v-model="toggle_exclusive"
            mandatory
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
        </div>
    </div>
</template>

<script>
export default {
  name: "GrpButtonMandatory",

  data: () => ({
      toggle_exclusive: undefined,
  })
};
</script>