<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Small variant -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
       <v-list-item-subtitle class="text-wrap">
        Expansion panels can be controlled externally by modifying the <code>v-model</code>. Its value corresponds to a zero-based index of the currently opened expansion panel content. If <code>multiple</code> prop is used then it is an array containing the indices of the open items.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center d-flex pb-4">
                <v-btn @click="all">all</v-btn>
                <div>{{ panel }}</div>
                <v-btn @click="none">none</v-btn>
                </div>

                <v-expansion-panels
                v-model="panel"
                multiple
                >
                <v-expansion-panel
                    v-for="(item,i) in items"
                    :key="i"
                >
                    <v-expansion-panel-header>Header {{ item }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
  name: "ExpansionExternalControl",

  data: () => ({
      panel: [],
        items: 5,
  }),
  methods: {
      // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [...Array(this.items).keys()].map((k, i) => i)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
    },
};
</script>