<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpButtonRounded -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can make <code>VBtnToggle</code> rounded using the <code>rounded</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-btn-toggle
                v-model="toggle_exclusive"
                rounded
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
  name: "GrpButtonRounded",

  data: () => ({
      toggle_exclusive: undefined,
  })
};
</script>