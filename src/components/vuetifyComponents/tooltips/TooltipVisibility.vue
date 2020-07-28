<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TooltipVisibility -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Tooltip visibility can be programmatically changed using <code>v-model</code>.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
            <v-row
            class="flex"
            justify="space-between"
            >
            <v-col cols="12">
                <v-btn @click="show = !show">toggle</v-btn>
            </v-col>

            <v-col cols="12" class="mt-12">
                <v-tooltip v-model="show" top>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                    <v-icon color="grey lighten-1">mdi-cart</v-icon>
                    </v-btn>
                </template>
                <span>Programmatic tooltip</span>
                </v-tooltip>
            </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "TooltipVisibility",

  data: () => ({
      show: false,
  }),
};
</script>