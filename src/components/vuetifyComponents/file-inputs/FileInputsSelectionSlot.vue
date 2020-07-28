<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- FileInputs Selection Slot -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Using the <code>selection</code> slot, you can customize the appearance of your input selections. This is typically done with chips, however any component or markup can be used.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-file-input
                v-model="files"
                placeholder="Upload your documents"
                label="File input"
                multiple
                prepend-icon="mdi-paperclip"
            >
                <template v-slot:selection="{ text }">
                <v-chip
                    small
                    label
                    color="primary"
                >
                    {{ text }}
                </v-chip>
                </template>
            </v-file-input>
        </div>
    </div>
</template>

<script>
export default {
  name: "FileInputsSelectionSlot",

  data: () => ({
    files: [],
  })
};
</script>