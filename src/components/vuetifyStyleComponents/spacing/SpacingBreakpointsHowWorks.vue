<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SpacingBreakpointsHowWorks -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap mt-4">
        The helper classes apply margin or padding at a given breakpoint. These classes can be applied using the following format: <code>{property}{direction}-{breakpoint}-{size}</code>. This does not apply to xs as it is inferred; e.g. <code>ma-xs-2</code> equals <code>ma-2</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <h4>With breakpoint</h4>
            <p>Spacing with <code>md</code> and <code>lg</code> breakpoints</p>
            <v-card
                class="pa-md-4 mx-lg-auto"
                color="white"
                width="250px"
                flat
            >
                <v-card-text>
                Adjust screen size to see spacing changes
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "SpacingBreakpointsHowWorks",

  data: () => ({
  })
};
</script>