<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ColorPickersInputs -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The number inputs can be hidden with the <code>hide-inputs</code> prop. You can also hide the mode switch icon with the <code>hide-mode-switch</code> prop. The mode can also be controlled externally through the <code>mode</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around">
                <v-color-picker class="ma-2" hide-inputs></v-color-picker>
                <v-color-picker class="ma-2" hide-mode-switch></v-color-picker>
                <v-row class="ma-2" style="flex: 0 0 auto">
                <v-color-picker :mode.sync="mode"></v-color-picker>
                <v-select v-model="mode" :items="modes" style="max-width: 300px"></v-select>
                </v-row>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ColorPickersInputs",

  data: () => ({
      mode: 'hsla',
      modes: ['hsla', 'rgba', 'hexa'],
  })
};
</script>