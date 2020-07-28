<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsRadioDefault -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Radio-groups are by default mandatory. This can be changed with the <code>mandatory</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <p>{{ radios || 'null' }}</p>
            <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Radio 1" value="radio-1"></v-radio>
            <v-radio label="Radio 2" value="radio-2"></v-radio>
            </v-radio-group>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionControlsRadioDefault",

  data: () => ({
      radios: 'radio-1',
  })
};
</script>