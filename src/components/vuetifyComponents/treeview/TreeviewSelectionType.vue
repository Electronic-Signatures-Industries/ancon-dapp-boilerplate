<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TreeviewSelectionType -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Treeview now supports two different selection types. The default type is 'leaf', which will only include leaf nodes in the v-model array, but will render parent nodes as either partially or fully selected. The alternative mode is 'independent', which allows one to select parent nodes, but each node is independent of its parent and children.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-select v-model="selectionType" :items="['leaf', 'independent']" label="Selection type"></v-select>
            <v-row>
            <v-col>
                <v-treeview
                v-model="selection"
                :items="items"
                :selection-type="selectionType"
                selectable
                return-object
                open-all
                ></v-treeview>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-6" cols="6">
                <template v-if="!selection.length">
                No nodes selected.
                </template>
                <template v-else>
                <div v-for="node in selection" :key="node.id">
                    {{ node.name }}
                </div>
                </template>
            </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "TreeviewSelectionType",

  data: () => ({
      selectionType: 'leaf',
      selection: [],
      items: [
        {
          id: 1,
          name: 'Root',
          children: [
            { id: 2, name: 'Child #1' },
            { id: 3, name: 'Child #2' },
            {
              id: 4,
              name: 'Child #3',
              children: [
                { id: 5, name: 'Grandchild #1' },
                { id: 6, name: 'Grandchild #2' },
              ],
            },
          ],
        },
      ],
  }),
};
</script>