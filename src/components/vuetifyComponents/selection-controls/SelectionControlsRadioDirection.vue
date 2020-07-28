<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsRadioDirection -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Radio-groups can be presented either as a row or a column, using their respective props. The default is as a column.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-radio-group v-model="column" column>
            <v-radio label="Option 1" value="radio-1"></v-radio>
            <v-radio label="Option 2" value="radio-2"></v-radio>
            </v-radio-group>
            <hr>
            <v-radio-group v-model="row" row>
            <v-radio label="Option 1" value="radio-1"></v-radio>
            <v-radio label="Option 2" value="radio-2"></v-radio>
            </v-radio-group>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsRadioDirection",

  data: () => ({
      column: null,
        row: null,
  })
};
</script>