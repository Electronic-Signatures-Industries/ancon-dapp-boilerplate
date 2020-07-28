<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Sizes -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        <code>v-chip</code> component can have various sizes from <code>x-small</code> to <code>x-large</code>.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center">
                <v-chip
                class="ma-2"
                x-small
                >
                x-small chip
                </v-chip>

                <v-chip
                class="ma-2"
                small
                >
                small chip
                </v-chip>

                <v-chip
                class="ma-2"
                >
                Default
                </v-chip>

                <v-chip
                class="ma-2"
                large
                >
                large chip
                </v-chip>

                <v-chip
                class="ma-2"
                x-large
                >
                x-large chip
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsSizes",

  data: () => ({
  })
};
</script>