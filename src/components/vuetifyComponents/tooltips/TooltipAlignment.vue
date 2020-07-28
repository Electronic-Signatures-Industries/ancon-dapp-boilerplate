<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TooltipAlignment -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        A tooltip can be aligned to any of the four sides of the activator element
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-tooltip left>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on" class="mr-3">Left</v-btn>
            </template>
            <span>Left tooltip</span>
            </v-tooltip>

            <v-tooltip top>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on" class="mr-3">Top</v-btn>
            </template>
            <span>Top tooltip</span>
            </v-tooltip>

            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on" class="mr-3">Bottom</v-btn>
            </template>
            <span>Bottom tooltip</span>
            </v-tooltip>

            <v-tooltip right>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Right</v-btn>
            </template>
            <span>Right tooltip</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script>
export default {
  name: "TooltipAlignment",

  data: () => ({
  }),
};
</script>