<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TabsDynamic -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Tabs can be dynamically added and removed. This allows you to update to any number and the <code>v-tabs</code> component will react. In this example when we add a new tab, we automatically change our model to match. As we add more tabs and overflow the container, the selected item will be automatically scrolled into view. Remove all <code>v-tab</code>s and the slider will disappear.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-tabs
            v-model="tab"
            background-color="success"
            dark
            >
            <v-tab
                v-for="n in length"
                :key="n"
            >
                Item {{ n }}
            </v-tab>
            </v-tabs>
            <v-card-text class="text-center">
            <v-btn text @click="length--">Remove Tab</v-btn>
            <v-divider class="mx-4" vertical></v-divider>
            <v-btn text @click="length++">Add Tab</v-btn>
            </v-card-text>
        </div>
    </div>
</template>

<script>
export default {
  name: "TabsDynamic",

  data: () => ({
      length: 15,
      tab: null,
  }),
  watch: {
      length (val) {
        this.tab = val - 1
      },
    },
};
</script>