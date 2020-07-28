<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpChipColumn -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Chip groups with <code>column</code> prop can wrap their chips.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-sheet class="pa-4">
                <v-chip-group
                column
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
  name: "GrpChipColumn",

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