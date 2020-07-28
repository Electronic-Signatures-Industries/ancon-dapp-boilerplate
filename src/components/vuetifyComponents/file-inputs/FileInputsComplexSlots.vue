<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Complex Slots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The flexibility of the selection slot allows you accomodate complex use-cases. In this example we show the first 2 selections as chips while adding a number indicator for the remaining amount.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input
                v-model="files"
                color="deep-purple accent-4"
                counter
                label="File input"
                multiple
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
            >
                <template v-slot:selection="{ index, text }">
                <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                >
                    {{ text }}
                </v-chip>

                <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                >
                    +{{ files.length - 2 }} File(s)
                </span>
                </template>
            </v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsComplexSlots",

  data: () => ({
    files: [],
  })
};
</script>