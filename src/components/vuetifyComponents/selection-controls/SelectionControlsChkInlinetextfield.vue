<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <v-row align="center">
                <v-checkbox
                v-model="includeFiles"
                hide-details
                class="shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field label="Include files"></v-text-field>
            </v-row>
            <v-row align="center">
                <v-checkbox
                v-model="enabled"
                hide-details
                class="shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field
                :disabled="!enabled"
                label="I only work if you check the box"
                ></v-text-field>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsChkInlinetextfield",

  data: () => ({
      includeFiles: true,
      enabled: false,
  })
};
</script>