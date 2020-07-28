<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Hint -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-input</code> can have <code>hint</code> which can tell user how to use the input. <code>persistent-hint</code> prop makes the hint visible always if no messages are displayed.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row>
                <v-switch v-model="showMessages" label="Show messages"></v-switch>
                <v-input hint="I am hint" persistent-hint :messages="messages">Input</v-input>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "InputHint",

  data: () => ({
      showMessages: false,
  }),
  computed: {
      messages () {
        return this.showMessages ? ['Message'] : undefined
      },
    },
};
</script>