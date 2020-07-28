<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Rules -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can add custom validation rules to <code>v-input</code>, add them as functions returning <code>true</code>/error message. Note: <code>v-text-field</code> is used just for example.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-text-field :rules="rules"></v-text-field>
        </div>
        <v-list-item-subtitle class="text-wrap">
        When <code>hide-details</code> is set to <code>auto</code> messages will be rendered only if there's a message (hint, error message etc) to display.
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
  name: "InputRules",

  data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
  })
};
</script>