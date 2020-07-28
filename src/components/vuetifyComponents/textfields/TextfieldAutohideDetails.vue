<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldAutohideDetails -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           When <code>hide-details</code> is set to <code>auto</code> messages will be rendered only if there's a message (hint, error message, counter value etc) to display.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div>
                <v-text-field label="Main input" :rules="rules" hide-details="auto"></v-text-field>
                <v-text-field label="Another input"></v-text-field>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldAutohideDetails",

  data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
  })
};
</script>