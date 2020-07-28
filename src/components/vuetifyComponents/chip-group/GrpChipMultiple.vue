<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpChipMultiple -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Chip groups with <code>multiple</code> prop can have many values selected.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-sheet class="py-4 px-1">
                <v-chip-group
                multiple
                active-class="primary--text"
                >
                <v-chip v-for="tag in tags" :key="tag">
                    {{ tag }}
                </v-chip>
                </v-chip-group>
            </v-sheet>
        </div>
    </div>
</template>

<script>
export default {
  name: "GrpChipMultiple",

  data: () => ({
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],
  })
};
</script>