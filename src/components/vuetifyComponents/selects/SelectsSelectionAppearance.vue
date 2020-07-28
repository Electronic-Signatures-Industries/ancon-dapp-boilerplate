<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- error -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           The <code>selection</code> slot can be used to customize the way selected values are shown in the input. This is great when you want something like <code>foo (+20 others)</code> or don't want the selection to occupy multiple lines.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-select
                v-model="value"
                :items="items"
                label="Select Item"
                multiple
                >
                <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                    </v-chip>
                    <span
                    v-if="index === 1"
                    class="grey--text caption"
                    >(+{{ value.length - 1 }} others)</span>
                </template>
                </v-select>
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectsSelectionAppearance",

  data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
      value: ['foo', 'bar', 'fizz'],
  })
};
</script>