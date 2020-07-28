<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldLabelSlots -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Text field label can be defined in <code>label</code> slot - that will allow to use HTML content
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
                <v-container>
                <v-text-field>
                    <template v-slot:label>
                    What about <strong>icon</strong> here? <v-icon style="vertical-align: middle">mdi-file-find</v-icon>
                    </template>
                </v-text-field>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldLabelSlots",

  data: () => ({
  })
};
</script>