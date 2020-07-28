<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Collapse -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Toolbars can be collapsed to save screen space.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                color="grey lighten-4"
                flat
                height="200px"
                tile
            >
                <v-toolbar collapse>
                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-toolbar>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "ToolbarCollapse",

  data: () => ({
  })
};
</script>