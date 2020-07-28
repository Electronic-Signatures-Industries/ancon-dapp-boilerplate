<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           A standard single select has a multitude of configuration options.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row
                align="center"
            >
                <v-col cols="12" sm="6">
                <v-select
                    v-model="value"
                    :items="items"
                    attach
                    chips
                    label="Chips"
                    multiple
                ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                <v-select
                    v-model="value"
                    :items="items"
                    filled
                    chips
                    label="Chips"
                    multiple
                ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                <v-select
                    v-model="value"
                    :items="items"
                    chips
                    label="Chips"
                    multiple
                    outlined
                ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                <v-select
                    v-model="value"
                    :items="items"
                    chips
                    label="Chips"
                    multiple
                    solo
                ></v-select>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsLightTheme",

  data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
  })
};
</script>