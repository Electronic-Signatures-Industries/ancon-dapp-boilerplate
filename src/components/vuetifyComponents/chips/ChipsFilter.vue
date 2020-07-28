<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Filters -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-chip</code> component has <code>filter</code> option which shows an additional icon to you if chip is active. It can be customized using <code>filter-icon</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-row justify="space-around" align="center">
                <v-chip
                class="ma-2"
                :input-value="active"
                filter
                >
                I'm v-chip
                </v-chip>

                <v-chip
                class="ma-2"
                :input-value="active"
                filter
                filter-icon="mdi-plus"
                >
                I'm v-chip
                </v-chip>

                <v-chip
                class="ma-2"
                :input-value="active"
                filter
                filter-icon="mdi-minus"
                >
                I'm v-chip
                </v-chip>

                <v-switch v-model="active" label="Active"></v-switch>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsFilter",

  data: () => ({
      active: false,
  })
};
</script>