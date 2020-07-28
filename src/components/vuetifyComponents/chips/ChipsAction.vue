<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Action -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Chips can be used as actionable items. Provided with a click event, the chip becomes interactive and can invoke methods.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                max-width="450"
            >
                <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                :aspect-ratio="16/9"
                >

                </v-img>
                <v-card-title>
                <div class="display-1 mb-2">Welcome Home...</div>
                <div class="title font-weight-regular grey--text">Monday, 12:30 PM, Mostly Sunny</div>
                </v-card-title>
                <v-row
                class="px-4 grey--text"
                align="center"
                >
                <v-avatar
                    size="24"
                    class="mr-4"
                >
                    <v-img src="https://cdn.vuetifyjs.com/images/weather/part-cloud-48px.png" contain></v-img>
                </v-avatar>

                <span>81° / 62°</span>
                </v-row>

                <v-divider class="mt-6 mx-4"></v-divider>

                <v-card-text>
                <v-chip
                    class="mr-2"
                    @click="lights"
                >
                    <v-icon left>mdi-brightness-5</v-icon>
                    Turn on Lights
                </v-chip>
                <v-chip
                    class="mr-2"
                    @click="alarm"
                >
                    <v-icon left>mdi-alarm-check</v-icon>
                    Set alarm
                </v-chip>
                <v-chip @click="blinds">
                    <v-icon left>mdi-blinds</v-icon>
                    Close blinds
                </v-chip>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "ChipsAction",

  data: () => ({
  }),
  methods: {
      alarm () {
        alert('Turning on alarm...')
      },
      blinds () {
        alert('Toggling Blinds...')
      },
      lights () {
        alert('Toggling lights...')
      },
    },
};
</script>