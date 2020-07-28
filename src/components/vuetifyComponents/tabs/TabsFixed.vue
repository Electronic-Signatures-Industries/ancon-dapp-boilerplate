<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsFixed -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The fixed-tabs prop forces <code>v-tab</code> to take up all available space up to the maximum width (300px).
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-tabs
                fixed-tabs
                background-color="info"
                dark
            >
                <v-tab>
                Option
                </v-tab>
                <v-tab>
                Another Selection
                </v-tab>
                <v-tab>
                Items
                </v-tab>
                <v-tab>
                Another Screen
                </v-tab>
            </v-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsFixed",

  data: () => ({
  })
};
</script>