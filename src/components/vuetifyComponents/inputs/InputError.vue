<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           As any validatable Vuetify component, <code>v-input</code> can be set to error state using <code>error</code> prop, messages can be added using <code>error-messages</code> prop. You can determine error messages count to show using <code>error-count</code> property.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-input :error-messages="['Fatal error']" error disabled>Input</v-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "InputError",

  data: () => ({
  })
};
</script>