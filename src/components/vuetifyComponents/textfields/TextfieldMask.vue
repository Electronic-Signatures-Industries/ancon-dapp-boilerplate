<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldMask -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can add masking functionality using a 3rd party library such as vue-the-mask.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card-text>
            <v-text-field v-model="mask" label="Mask"></v-text-field>
            </v-card-text>
            <v-card-text>
            <v-text-field v-model="value" v-mask="mask" label="Value"></v-text-field>
            </v-card-text>
        </div>
    </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: "TextfieldMask",

  directives: {
      mask,
    },
    data: () => ({
      mask: '####-####-####-####',
      value: '4444444444444444',
    }),
};
</script>