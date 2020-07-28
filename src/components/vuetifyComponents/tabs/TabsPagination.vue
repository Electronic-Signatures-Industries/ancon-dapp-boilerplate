<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsPagination -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        If the tab items overflow their container, pagination controls will appear on desktop. For mobile devices, arrows will only display with the show-arrows prop.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-tabs
            dark
            background-color="info"
            show-arrows
            >
            <v-tabs-slider color="info lighten-3"></v-tabs-slider>

            <v-tab
                v-for="i in 30"
                :key="i"
                :href="'#tab-' + i"
            >
                Item {{ i }}
            </v-tab>
            </v-tabs>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsPagination",

  data: () => ({
  })
};
</script>