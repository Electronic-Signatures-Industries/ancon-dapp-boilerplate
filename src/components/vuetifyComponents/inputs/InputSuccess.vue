<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Success -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        As any validatable Vuetify component, <code>v-input</code> can be set to success state using <code>success</code> prop, you can add message to it using <code>success-messages</code> prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-input :success-messages="['Success']" success disabled>Input</v-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "InputSuccess",

  data: () => ({
      
  })
};
</script>