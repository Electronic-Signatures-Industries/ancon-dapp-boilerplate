<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsCustomIcons -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        prev-icon and next-icon can be used for applying custom pagination icons.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-sheet>
                <v-tabs
                background-color="cyan"
                dark
                next-icon="mdi-arrow-right-bold-box-outline"
                prev-icon="mdi-arrow-left-bold-box-outline"
                show-arrows
                >
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab
                    v-for="i in 30"
                    :key="i"
                    :href="'#tab-' + i"
                >
                    Item {{ i }}
                </v-tab>
                </v-tabs>
            </v-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsCustomIcons",

  data: () => ({
  })
};
</script>