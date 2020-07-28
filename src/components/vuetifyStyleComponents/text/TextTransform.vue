<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextTransform -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Text can be transformed with text capitalization classes.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="pa-4 grey lighten-2">
                <p class="text-lowercase">Lowercased text.</p>
                <p class="text-uppercase">Uppercased text.</p>
                <p class="text-capitalize">CapiTaliZed text.</p>
            </div>
        </div>
        <div class="mt-4">
            <p>Text breaking and the removal of <code>text-transform</code> is also possible. In the first example, the <code>text-transform: uppercase</code> custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.`</p>
            <div class="mt-4 pa-4 grey lighten-2">
                <p class="custom-transform-class text-none">Random TEXT cApitaLization</p>
                <p
                class="text-break"
                style="max-width: 4rem;"
                >
                SUBDERMATOGLYPHIC
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextTransform",

  data: () => ({
  })
};
</script>