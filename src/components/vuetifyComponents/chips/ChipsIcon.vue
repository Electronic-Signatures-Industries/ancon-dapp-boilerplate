<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Icons -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Chips can use text or any icon available in the Material Icons font library.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div class="text-center">
                <v-chip
                class="ma-2"
                color="info"
                text-color="white"
                >
                <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                Ranee
                </v-chip>

                <v-chip
                class="ma-2"
                color="warning"
                text-color="white"
                >
                Premium
                <v-icon right>mdi-star</v-icon>
                </v-chip>

                <v-chip
                class="ma-2"
                color="success"
                text-color="white"
                >
                1 Year
                <v-icon right>mdi-cake-variant</v-icon>
                </v-chip>

                <v-chip
                class="ma-2"
                color="error"
                text-color="white"
                >
                <v-avatar
                    left
                    class="error darken-1"
                >
                    1
                </v-avatar>
                Years
                </v-chip>

                <v-chip
                class="ma-2"
                close
                color="indigo"
                text-color="white"
                @click:close="close"
                >
                <v-avatar left>
                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                Confirmed
                </v-chip>

                <v-chip
                class="ma-2"
                close
                color="secondary"
                text-color="white"
                close-icon="mdi-delete"
                @click:close="close"
                >
                <v-avatar left>
                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                Confirmed
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsIcon",

  data: () => ({
  }),
  methods: {
      close () {
        alert('Chip close clicked')
      },
    },
};
</script>