<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SlidersValidation -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Vuetify includes simple validation through the <code>rules</code> prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either <code>true</code> or a <code>String</code>, the error message.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-subheader>Rules</v-subheader>

            <v-card-text class="pt-0">
            <v-slider
                v-model="value"
                :rules="rules"
                label="How many?"
                step="10"
                thumb-label="always"
                ticks
            ></v-slider>
            </v-card-text>

            <v-subheader>Persistent hint</v-subheader>

            <v-card-text class="pt-0">
            <v-slider
                v-model="value"
                :rules="rules"
                hint="40 in stock"
                label="How many?"
                persistent-hint
                step="10"
                thumb-label="always"
                ticks
            ></v-slider>
            </v-card-text>
        </div>
    </div>
</template>

<script>
export default {
  name: "SlidersValidation",

  data: () => ({
      value: 30,
        rules: [
          v => v <= 40 || 'Only 40 in stock',
        ],
  })
};
</script>