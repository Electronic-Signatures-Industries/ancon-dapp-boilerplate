<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Coloured -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Any color from the Material Design palette can be used to change a chips color.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center">
                <v-chip
                class="ma-2"
                >
                Default
                </v-chip>

                <v-chip
                class="ma-2"
                color="primary"
                >
                Primary
                </v-chip>

                <v-chip
                class="ma-2"
                color="secondary"
                >
                Secondary
                </v-chip>

                <v-chip
                class="ma-2"
                color="error"
                text-color="white"
                >
                Error Chip
                </v-chip>

                <v-chip
                class="ma-2"
                color="success"
                text-color="white"
                >
                Success Chip
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsColoured",

  data: () => ({
  })
};
</script>