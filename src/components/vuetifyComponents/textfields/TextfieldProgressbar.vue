<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldProgressbar -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           You can display a progress bar instead of the bottom line. You can use the default indeterminate progress having same color as the text field or designate a custom one using the <code>progress</code> slot
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-checkbox v-model="custom" label="Custom progress bar"></v-checkbox>
            <v-text-field
            v-model="value"
            color="cyan darken"
            label="Text field"
            placeholder="Start typing..."
            loading
            >
            <template v-slot:progress>
                <v-progress-linear
                v-if="custom"
                :value="progress"
                :color="color"
                absolute
                height="7"
                ></v-progress-linear>
            </template>
            </v-text-field>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldProgressbar",

  data: () => ({
      value: '',
      custom: true,
  }),
  computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
    },
};
</script>