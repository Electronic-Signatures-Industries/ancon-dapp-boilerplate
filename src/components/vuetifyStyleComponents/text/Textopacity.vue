<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Textopacity -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Opacity helper classes allow you to easily adjust the emphasis of text. <code>text--primary</code> has the same opacity as default text. <code>text--secondary</code> is used for hints and helper text. De-emphasise text with <code>text--disabled</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="pa-4 grey lighten-2">
                <p class="text--primary">High-emphasis has an opacity of 87%.</p>
                <p class="text--secondary">Medium-emphasis text and hint text have opacities of 60%.</p>
                <p class="text--disabled">Disabled text has an opacity of 37%.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Textopacity",

  data: () => ({
  })
};
</script>