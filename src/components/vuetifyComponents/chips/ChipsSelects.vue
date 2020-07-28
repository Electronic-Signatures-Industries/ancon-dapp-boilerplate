<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Selects -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Selects can use chips to display the selected data. Try adding your own tags below.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-combobox
                v-model="chips"
                :items="items"
                chips
                clearable
                label="Your favorite hobbies"
                multiple
                prepend-icon="mdi-filter-variant"
                solo
            >
                <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="remove(item)"
                >
                    <strong>{{ item }}</strong>&nbsp;
                    <span>(interest)</span>
                </v-chip>
                </template>
            </v-combobox>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsSelects",

  data: () => ({
        chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
        items: ['Streaming', 'Eating'],
  }),
  methods: {
      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
    },
};
</script>