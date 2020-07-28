<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TimelineCard -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        If you place a <code>v-card</code> inside of a <code>v-timeline-item</code>, a caret will appear on the side of the card.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-timeline>
                <v-timeline-item
                v-for="n in 3"
                :key="n"
                color="red lighten-2"
                large
                >
                <template v-slot:opposite>
                    <span>Tus eu perfecto</span>
                </template>
                <v-card class="elevation-2">
                    <v-card-title class="headline">Lorem ipsum</v-card-title>
                    <v-card-text>
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                    </v-card-text>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </div>
    </div>
</template>

<script>
export default {
  name: "TimelineCard",

  data: () => ({
     
  })
};
</script>