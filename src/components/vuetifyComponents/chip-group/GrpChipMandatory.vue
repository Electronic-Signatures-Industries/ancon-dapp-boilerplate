<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- GrpChipMandatory -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Chip groups with <code>mandatory</code> prop must always have a value selected.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-chip-group
            mandatory
            active-class="primary--text"
            >
            <v-chip v-for="tag in tags" :key="tag">
                {{ tag }}
            </v-chip>
            </v-chip-group>
        </div>
    </div>
</template>

<script>
export default {
  name: "GrpChipMandatory",

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