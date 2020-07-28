<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SpacingNegativeMargin -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        Margin can also be applied negatively at the same 1 to 12 intervals.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
            class="mx-auto"
            height="100"
            max-width="200"
            outlined
            ></v-card>
            <v-card
            class="mt-n12 mx-auto"
            elevation="12"
            height="200"
            max-width="300"
            ></v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "SpacingNegativeMargin",

  data: () => ({
  })
};
</script>