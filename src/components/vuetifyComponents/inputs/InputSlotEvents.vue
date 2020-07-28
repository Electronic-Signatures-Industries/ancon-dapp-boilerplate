<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Slot Events -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-input</code> can have <code>click:append</code> and click:prepend events for its slots. Note: <code>v-text-field</code> is used just for example.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-container
                id="input-usage"
                fluid
            >
                <v-row>
                <v-col cols="12">
                    <v-input
                    :messages="['Messages']"
                    append-icon="mdi-window-close"
                    prepend-icon="mdi-phone"
                    @click:append="appendIconCallback"
                    @click:prepend="prependIconCallback"
                    >
                    Default Slot
                    </v-input>
                </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<style>
  #input-usage .v-input__prepend-outer,
  #input-usage .v-input__append-outer,
  #input-usage .v-input__slot,
  #input-usage .v-messages {
    border: 1px dashed rgba(0,0,0, .4);
  }
</style>

<script>
export default {
  name: "InputSlotEvents",

  data: () => ({
      text: '',
  }),
  methods: {
      appendIconCallback () {
        alert('click:append')
      },
      prependIconCallback () {
        alert('click:prepend')
      },
    },
};
</script>